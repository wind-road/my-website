"use client";
import { useContext, useRef, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import TransitionContext, {
  TransitionContextType,
  AnimationType,
  ElementInfo,
} from "@/context/TransitionContext";
type Node = HTMLElement | null;
type TransitionPath = "in" | "out" | "none";
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
  const enterTransition = (starport: ElementInfo) => {
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
  const exitTransition = (teleport: ElementInfo) => {
    console.log("out", teleport);
    const coord = document.body.querySelector("#coord") as HTMLDivElement;
    const coordChildren = coord?.children[0];
    coord.style.display = "block";
    starportBoxOpacity("0");
    teleportBoxOpacity(teleport.id, "0");
    gsap
      .timeline({
        paused: true,
        onComplete: () => {
          // 设置Teleport会自动更新Teleport组件
          // setTeleportOpacity(1)
          // setTeleport({
          //   id: "",
          //   end: function (): void {
          //     throw new Error("Function not implemented.");
          //   },
          //   left: 0,
          //   top: 0,
          //   width: 0,
          //   height: 0,
          //   position: "",
          // });
          coord.style.display = "none";
          teleportBoxOpacity(teleport.id, "1");
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
    // const coord = document.body.querySelector("#coord") as HTMLDivElement;
    // coord.style.display = "none";
  };

  return {
    enterToggle,
    exitToggle,
    enterTransition,
    exitTransition,
  };
};
let animationType: AnimationType = "toggle";
let transitionPath: TransitionPath = "in";
const TransitionComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const nodeRef = useRef(null);
  const pathname = usePathname();

  const { starport, teleport } = useContext(
    TransitionContext
  ) as TransitionContextType;

  const { enterToggle, exitToggle, enterTransition, exitTransition } =
    anmation();

  useEffect(() => {
    if (transitionPath === "in" && starport) {
      enterTransition(starport);
      transitionPath = "none";
    }
  }, [starport, enterTransition]);

  useEffect(() => {
    if (transitionPath === "out" && starport && teleport) {
      exitTransition(teleport);
      transitionPath = "none";
    }
  }, [teleport, exitTransition, starport]);

  useEffect(() => {
    const navigate = (navigateEvent: any) => {
      const toUrl = new URL(navigateEvent.destination.url);
      const toPath = toUrl.pathname;
      const fromPath = location.pathname;
      if (location.origin !== toUrl.origin) return;
      if (toPath.startsWith("/works/") || ["/"].includes(toPath)) {
        animationType = "transition";
      } else {
        animationType = "toggle";
      }
      if (fromPath === "/" && toPath.startsWith("/works/")) {
        transitionPath = "in";
      }
      if (fromPath.startsWith("/works/") && toPath === "/") {
        transitionPath = "out";
      }
    };
    window.navigation.addEventListener("navigate", navigate);
    return () => {
      window.navigation.removeEventListener("navigate", navigate);
    };
  }, []);

  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        nodeRef={nodeRef}
        timeout={500}
        onEnter={() => {
          if (animationType === "toggle") {
            enterToggle(nodeRef.current);
          }
        }}
        onExit={() => {
          if (animationType === "toggle") {
            exitToggle(nodeRef.current);
          }
        }}
      >
        <div ref={nodeRef} className="size-full">
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
