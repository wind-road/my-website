"use client";
import { useContext, useRef } from "react";
import type { FC, ReactNode } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import TransitionContext, {
  type TransitionContextType,
  type AnimationType,
} from "@/context/TransitionContext";
type Node = HTMLElement | null;
const anmation = (toggleAnimationType: (value: AnimationType) => void) => {
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
  const enterTransition = (node: Node) => {
    // (node as HTMLElement).querySelector('.box-transition') as HTMLElement
    console.log()
    // gsap
    //   .timeline({
    //     paused: true,
    //     onComplete: () => toggleAnimationType("toggle"),
    //   })
    //   .to(node, { autoAlpha: 0, duration: 0.2 })
    //   .play();
  };
  const exitTransition = (node: Node) => {
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
const TransitionComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();

  const { animationType, toggleAnimationType } = useContext(
    TransitionContext
  ) as TransitionContextType;

  const { enter, exit } = anmation(toggleAnimationType);

  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        nodeRef={nodeRef}
        timeout={500}
        onEnter={() => enter(nodeRef.current, animationType)}
        onEntered={() => toggleAnimationType("toggle")}
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
