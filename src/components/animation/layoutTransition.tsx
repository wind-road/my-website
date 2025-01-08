"use client";
import { useContext, useRef, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import TransitionContext, {
  TransitionContextType,
  AnimationType,
} from "@/context/TransitionContext";
type Node = HTMLElement | null;
const anmation = () => {
  // 页面切换
  const enterToggle = (node: Node) => {
    gsap.set(node, {
      autoAlpha: 0,
      scale: 0.8,
      xPercent: -100,
    });
    gsap
      .timeline({
        paused: true,
      })
      .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
      .to(node, { scale: 1, duration: 0.25 })
      .play();
  };
  const exitToggle = (node: Node) => {
    gsap
      .timeline({ paused: true })
      .to(node, { scale: 0.8, duration: 0.2 })
      .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
      .play();
  };
  // 页面过渡
  const enterTransition = (node: Node) => {};
  const exitTransition = (node: Node) => {
    const coord = document.body.querySelector("#coord") as HTMLDivElement;
    coord.style.display = "none";
    // gsap
    //   .timeline({ paused: true })
    //   .to(node, { autoAlpha: 1, duration: 0.2 })
    //   .play();
  };
  // 全部进入动画
  const enter = (node: Node, type: AnimationType) => {
    if (type === "transition") {
      return enterTransition(node);
    }
    return enterToggle(node);
  };
  // 全部退出动画
  const exit = (node: Node, type: AnimationType) => {
    if (type === "transition") {
      return exitTransition(node);
    }
    return exitToggle(node);
  };

  return {
    enterToggle,
    exitToggle,
    enterTransition,
    exitTransition,
    enter,
    exit,
  };
};
let animationType: AnimationType = "toggle";
const TransitionComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();

  // const { animationType, toggleAnimationType } = useContext(
  //   TransitionContext
  // ) as TransitionContextType;

  const { enter, exit } = anmation();
  useEffect(() => {
    const navigate = (navigateEvent: any) => {
      const toUrl = new URL(navigateEvent.destination.url);
      const toPath = toUrl.pathname;
      const fromPath = location.pathname;
      if (location.origin !== toUrl.origin) return;
      console.log(toPath, fromPath);
      // ["/works/"].includes(toPath)
      if (toPath.startsWith('/works/') || ["/"].includes(toPath)) {
        animationType = "transition";
      } else {
        animationType = "toggle";
      }
    };
    window.navigation.addEventListener("navigate", navigate);
    return () => {
      window.navigation.removeEventListener("navigate", navigate);
    };
  }, []);

  // useEffect(() => {
  //   // 监听动画类型
  //   if (pathname !== "/" && pathname.startsWith("/works/")) {
  //     console.log(pathname)
  //     toggleAnimationType("toggle");
  //   }
  // }, [pathname, toggleAnimationType]);
  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        nodeRef={nodeRef}
        // timeout={0}
        timeout={500}
        onEnter={() => {
          console.log();
          enter(nodeRef.current, animationType);
        }}
        // onEntered={() => {
        //   if (pathname !== "/" && pathname.startsWith("/works/")) {
        //     toggleAnimationType("toggle");
        //   }
        // }}
        onExit={() => exit(nodeRef.current, animationType)}
      >
        <div ref={nodeRef} className="size-full">
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
