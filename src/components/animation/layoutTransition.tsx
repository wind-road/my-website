"use client";
import { useContext, useRef, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import TransitionContext, {
  TransitionContextType,
  ElementInfo,
} from "@/context/TransitionContext";
type Node = HTMLElement | null;
type TransitionPath = "in" | "out" | "none";
const anmation = () => {
  // 页面切换
  const enterToggle = (node: Node, toggleCompleted: (v: boolean) => void) => {
    toggleCompleted(false);
    gsap.set(node, {
      autoAlpha: 0,
      scale: 0.8,
      xPercent: -100,
    });
    gsap
      .timeline({
        paused: true,
        onComplete: () => {
          toggleCompleted(true);
        },
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
  const starportBoxOpacity = (opacity?: string) => {
    const starportBox = document.querySelector(
      ".starport-box"
    ) as HTMLDivElement;
    if (starportBox) {
      if (opacity !== undefined) {
        return (starportBox.style.opacity = opacity);
      }
      starportBox.style.opacity = starportBox.style.opacity === "0" ? "1" : "0";
    }
  };
  const teleportBoxOpacity = (id: string, opacity?: string) => {
    const teleportBox = document.body.querySelector(
      "#teleport-id-" + id
    ) as HTMLDivElement;
    if (teleportBox) {
      if (opacity !== undefined) {
        return (teleportBox.style.opacity = opacity);
      }
      teleportBox.style.opacity = teleportBox.style.opacity === "0" ? "1" : "0";
    }
  };
  // 页面过渡
  const enterTransition = (starport: ElementInfo, onComplete?: () => void) => {
    const coord = document.body.querySelector("#coord") as HTMLDivElement;
    const coordChildren = coord?.children[0];
    starportBoxOpacity("0");
    coord.style.display = "block";

    gsap
      .timeline({
        paused: true,
        onComplete: () => {
          coord.style.display = "none";
          starportBoxOpacity("1");
          onComplete && onComplete();
        },
      })
      .to(coordChildren, {
        left: starport.left,
        top: starport.top,
        width: starport.width,
        height: starport.height,
        duration: 0.25,
      })
      .play();
  };
  const exitTransition = (teleport: ElementInfo, onComplete?: () => void) => {
    const coord = document.body.querySelector("#coord") as HTMLDivElement;
    const coordChildren = coord?.children[0];
    coord.style.display = "block";
    starportBoxOpacity("0");
    teleportBoxOpacity(teleport.id, "0");
    gsap
      .timeline({
        paused: true,
        onComplete: () => {
          coord.style.display = "none";
          teleportBoxOpacity(teleport.id, "1");
          onComplete && onComplete();
        },
      })
      .to(coordChildren, {
        left: teleport.left,
        top: teleport.top,
        width: teleport.width,
        height: teleport.height,
        duration: 0.25,
      })
      .play();
  };

  return {
    enterToggle,
    exitToggle,
    enterTransition,
    exitTransition,
  };
};
let transitionPath: TransitionPath = "none";
const TransitionComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();

  const { toggleCompleted, starport, setStarport, teleport, setTeleport } =
    useContext(TransitionContext) as TransitionContextType;

  const { enterToggle, exitToggle, enterTransition, exitTransition } =
    anmation();
  if (["/"].includes(pathname)) {
    transitionPath = "out";
  } else if (pathname.startsWith("/works/")) {
    transitionPath = "in";
  } else {
    transitionPath = "none";
  }
  console.log(pathname, transitionPath, starport, teleport);
  useEffect(() => {
    if (transitionPath === "in" && starport) {
      enterTransition(starport);
    }
  }, [starport, enterTransition]);

  useEffect(() => {
    if (transitionPath === "out" && starport && teleport) {
      exitTransition(teleport, () => {
        setStarport(undefined);
        setTeleport(undefined);
      });
    }
  }, [teleport, exitTransition, starport, setStarport, setTeleport]);

  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        nodeRef={nodeRef}
        timeout={500}
        onEnter={() => {
          if (transitionPath === "none") {
            enterToggle(nodeRef.current, toggleCompleted);
          }
        }}
        onExit={() => {
          if (transitionPath === "none") {
            exitToggle(nodeRef.current);
          }
        }}
        unmountOnExit
      >
        <div ref={nodeRef} className="size-full">
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
