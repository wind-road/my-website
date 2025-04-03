"use client";
import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import TransitionContext, {
  type TransitionContextType,
} from "@/context/TransitionContext";
import Image from "next/image";
import Teleport from "@/components/animation/teleport";

interface ListType {
  month: string;
  title: string;
  keyword: string;
  image: string;
  description: string;
  link: string;
}
/**
 * 启用悬停横向滚轮滚动
 * @param {HTMLElement} element - 需要添加效果的容器元素
 * @param {Object} [options] - 配置选项
 * @param {number} [options.speed=0.8] - 滚动速度系数
 * @param {number} [options.duration=0.5] - 动画持续时间(秒)
 * @param {string} [options.ease='power2.out'] - GSAP缓动函数
 */
function enableHoverWheelScroll(element: HTMLElement, options = {}) {
  const config = {
    speed: 0.8,
    duration: 0.5,
    ease: "power2.out",
    ...options,
  };

  let scrollPos = 0;
  let isAnimating = false;

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * config.speed;
    const newPos = scrollPos + delta;
    const maxScroll = element.scrollWidth - element.clientWidth;

    scrollPos = Math.max(0, Math.min(newPos, maxScroll));

    if (!isAnimating) {
      isAnimating = true;
      gsap.to(element, {
        scrollLeft: scrollPos,
        duration: config.duration,
        ease: config.ease,
        onUpdate: () => {
          scrollPos = element.scrollLeft;
        },
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  };

  // 鼠标进入时启用
  element.addEventListener("mouseenter", () => {
    element.style.overflowX = "hidden"; // 隐藏原生滚动条
    element.addEventListener("wheel", handleWheel);
  });

  // 鼠标离开时禁用
  element.addEventListener("mouseleave", () => {
    element.removeEventListener("wheel", handleWheel);
    isAnimating = false;
  });
}
const Items: FC<{ list: ListType[] }> = ({ list }) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const { teleport, setTeleport, toggleAnimationType } = useContext(
    TransitionContext
  ) as TransitionContextType;

  // 悬停动画
  const liMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    gsap.to(e.currentTarget, {
      width: "21%",
      duration: 0.1,
    });
  };
  // 离开动画
  const liMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    gsap.to(e.currentTarget, {
      width: "16.666667%",
      duration: 0.1,
    });
  };
  // 点击按钮时使所有itme left值为0，使用gasp来动画过渡
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (scrollRef.current) {
      const ItemHeads = scrollRef.current.getElementsByClassName("item-head");
      const ItemImages = scrollRef.current.getElementsByClassName("item-img");
      const lis = scrollRef.current.getElementsByTagName("li");
      gsap
        .timeline()
        .to(ItemHeads, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          ItemImages,
          {
            transform: (idx, item) => {
              return `translateX(${-item.offsetLeft - 10}px)`;
            },
            duration: 0.5,
          },
          ">-0.3"
        );
    }
  };

  useEffect(() => {
    // 启用悬停横向滚轮滚动
    enableHoverWheelScroll(scrollRef.current as HTMLElement, {
      speed: 2, // 更快的滚动速度
      duration: 0.3, // 更短的动画时间
    });
  }, []);

  return (
    <>
      <ul ref={scrollRef} className="flex h-[440px] z-10 relative">
        {list.map((item, id) => (
          <li
            key={item.month}
            className="gsap-li shrink-0 w-1/6 min-w-[200px] mt-4 transition-all cursor-pointer "
            onMouseEnter={liMouseEnter}
            onMouseLeave={liMouseLeave}
            onClick={() => {
              toggleAnimationType("transition");
              router.push(`/works/${(id + 1).toString()}`);
            }}
          >
            <div className="item-head">
              <h3 className="my-3">{item.month}</h3>
              <div className="truncate">{item.title}</div>
              <div className="truncate">{item.keyword}</div>
            </div>
            <Teleport
              teleportId={id.toString()}
              teleport={teleport}
              setTeleport={setTeleport}
              className="w-full aspect-[1/1] item-img"
              style={{
                backgroundSize: "cover",
              }}
            >
              <Image
                width={200}
                height={200}
                className="w-full contain-layout"
                src={item.image}
                alt="项目图片"
              />
            </Teleport>
          </li>
        ))}
      </ul>
      {/* <button onClick={handleClick}>测试动画</button> */}
    </>
  );
};

export default Items;
