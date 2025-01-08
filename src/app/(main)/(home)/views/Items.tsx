"use client";
import gsap from "gsap";
import { useContext } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import TransitionContext, {
  type TransitionContextType,
} from "@/context/TransitionContext";
import Image from "next/image";
import Teleport from "@/components/animation/teleport";
// import { flushSync } from "react-dom";

interface ListType {
  month: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

const Items: FC<{ list: ListType[] }> = ({ list }) => {
  const router = useRouter();
  const {
    toggleAnimationType,
    teleport,
    setTeleport,
    teleportOpacity,
    setTeleportOpacity,
  } = useContext(TransitionContext) as TransitionContextType;

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
  const handlerClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    // const target = e.currentTarget;

    // toggleAnimationType("transition");

    // const img = target.querySelector("img");

    router.push(`/works/${id}`);
    // if (img) {
    //   img.style.viewTransitionName = "pic";
    // }

    // todo: 可能与我的路由动画有关，最好还是自己实现，不使用startViewTransition

    // if (document.startViewTransition) {
    //   const transition = document.startViewTransition(() => {
    //     if (img) {
    //       img.style.viewTransitionName = "pic";
    //     }
    //     flushSync(() =>
    //       router.push(`/works/${id}`)
    //     );
    //   });
    //   transition.finished.finally(() => {
    //     if (img) {
    //       img.style.viewTransitionName = "";
    //     }
    //     console.log("transition end");
    //   });
    // } else {
    //   router.push(`/works/${id}`)
    // }
  };

  return (
    <ul className="flex h-1/2 max-h-[250px] z-10">
      {list.map((item, id) => (
        <li
          key={item.month}
          className="gsap-li shrink-0 w-1/6 min-w-[200px] mt-4 transition-all cursor-pointer "
          onMouseEnter={liMouseEnter}
          onMouseLeave={liMouseLeave}
          onClick={(e) => handlerClick(e, (id + 1).toString())}
        >
          <h3 className="my-3">{item.month}</h3>
          <div className="truncate">{item.title}</div>
          <div className="truncate">{item.description}</div>
          <Teleport
            teleportId={id.toString()}
            teleport={teleport}
            setTeleport={setTeleport}
            // teleportOpacity={teleport?.id === id.toString() ? teleportOpacity : 1}
            // setTeleportOpacity={setTeleportOpacity}
            // size={{
            //   width: 200,
            //   height: 200,
            // }}
            className="w-full aspect-[1/1]"
            style={{
              // backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
            }}
          >
            <Image
              width={200}
              height={200}
              className="w-full contain-layout"
              // style={{ viewTransitionName: "pic" }}
              src={item.image}
              alt="项目图片"
            />
          </Teleport>
        </li>
      ))}
    </ul>
  );
};

export default Items;
