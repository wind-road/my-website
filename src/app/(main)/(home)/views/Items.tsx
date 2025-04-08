"use client";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import TransitionContext, {
  type TransitionContextType,
} from "@/context/TransitionContext";
import Image from "next/image";
import Teleport from "@/components/animation/teleport";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { debounce } from "lodash";
interface ListType {
  month: string;
  title: string;
  keyword: string;
  image: string;
  description: string;
  link: string;
}
// 是否禁止动画
let allIsAnimating = false;
// 记录滚动位置
let scrollPos = 0;
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

  let isAnimating = false;

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * config.speed;
    const newPos = scrollPos + delta;
    const maxScroll = element.scrollWidth - element.clientWidth;

    scrollPos = Math.max(0, Math.min(newPos, maxScroll));

    if (!isAnimating && !allIsAnimating) {
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
    if (allIsAnimating) return;
    element.style.overflowX = "hidden"; // 隐藏原生滚动条
    element.addEventListener("wheel", handleWheel);
  });

  // 鼠标离开时禁用
  element.addEventListener("mouseleave", () => {
    if (allIsAnimating) return;
    element.removeEventListener("wheel", handleWheel);
    isAnimating = false;
  });
}
// 悬停动画
const liMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  if (allIsAnimating) return;
  gsap.to(e.currentTarget, {
    width: "21%",
    duration: 0.1,
  });
};
// 离开动画
const liMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
  if (allIsAnimating) return;
  gsap.to(e.currentTarget, {
    width: "16.666667%",
    duration: 0.1,
  });
};
// 创建展示动画
const createDisplayAnimation = (element: HTMLElement, paused = true) => {
  const ItemHeads = element.getElementsByClassName("item-head");
  const lis = element.getElementsByClassName("gsap-li");
  const itemDescription = document.querySelector(".item-description");
  return gsap
    .timeline({
      paused,
    })
    .to(ItemHeads, {
      opacity: 0,
      duration: 0.3,
      height: 0,
      ease: "power2.out",
    })
    .to(lis, {
      transform: (idx, item) => {
        return `translate(${-item.offsetLeft + idx * 6}px, ${idx * 3}px)`;
      },
      duration: 0.5,
    })
    .to(element, {
      width: "100%",
      paddingLeft: 20,
      scrollLeft: 0,
      duration: 0.3,
    })
    .to(itemDescription, {
      height: 300,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
};
// 初始化动画，在500ms后执行
const initAnimation = debounce((cb: () => void) => {
  cb && cb();
}, 500);
const Items: FC<{ list: ListType[] }> = ({ list }) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const { teleport, setTeleport, toggleAnimationType } = useContext(
    TransitionContext
  ) as TransitionContextType;
  const [isRouteAnimating, setIsRouteAnimating] = useState(allIsAnimating);

  const [displayAnimation, setDisplayAnimation] =
    useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (scrollRef.current) {
        // 启用悬停横向滚轮滚动
        enableHoverWheelScroll(scrollRef.current as HTMLElement, {
          speed: 2, // 更快的滚动速度
          duration: 0.3, // 更短的动画时间
        });
        // 初始化
        scrollRef.current.scrollLeft = scrollPos;
        allIsAnimating = false;
        setIsRouteAnimating((allIsAnimating = window.innerWidth < 640));
        // 创建动画
        initAnimation(() => {
          setDisplayAnimation(
            createDisplayAnimation(
              scrollRef.current as HTMLElement,
              window.innerWidth > 640 // 如果屏幕宽度小于640，则开始动画
            )
          );
        });
      }
    });
  }, []);

  return (
    <>
      <div className="relative">
        <ul
          ref={scrollRef}
          className="flex h-[27rem] z-10 relative mt-4 overflow-hidden"
        >
          {list.map((item, id) => (
            <li
              key={item.month}
              className="gsap-li shrink-0 w-1/6 min-w-[200px] cursor-pointer z-10"
              onMouseEnter={liMouseEnter}
              onMouseLeave={liMouseLeave}
              onClick={() => {
                if (allIsAnimating) return;
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
                isAnimating={isRouteAnimating}
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
        {/* item-description absolute text-2xl opacity-0 z-0 left-[50%] translate-x-[-50%] top-[60%] sm:top-16 w-full sm:w-[50rem] h-full */}
        <div className="item-description text-2xl opacity-0 z-0 w-full break-all sm:break-words sm:absolute sm:top-16 sm:w-[50rem] sm:left-[50%] sm:translate-x-[-50%] translate-y-[-30%] sm:translate-y-0 h-0 sm:h-full">
          <span className="opacity-35">
            beforeEach、addRoute、shallow copy、deep copy、flex、
          </span>
          <b>Event loop</b>
          <span className="opacity-35">
            、beforeEach、addRoute、shallow copy、deep
            copy、flex、grid、position 、beforeEach、addRoute、shallow
            copy、deep copy、flex、grid、position
          </span>
          <hr className="mt-5"></hr>
        </div>
      </div>

      <Button
        className="fixed bottom-20 right-5 z-20 size-[3rem] bg-gray-600 rounded-full sm:block hidden"
        style={{ boxShadow: "0px 0px 8px black" }}
        onClick={() => {
          window.requestAnimationFrame(() => {
            if (scrollRef.current && displayAnimation) {
              if (isRouteAnimating) {
                setIsRouteAnimating((allIsAnimating = false));
                displayAnimation.reverse();
              } else {
                setIsRouteAnimating((allIsAnimating = true));
                displayAnimation.play();
              }
            }
          });
        }}
      >
        <RotateCw />
      </Button>
    </>
  );
};

export default Items;
