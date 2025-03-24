import TransitionContext, {
  TransitionContextType,
  ElementInfo,
} from "@/context/TransitionContext";
import { FC, useContext, useEffect } from "react";
import gsap from "gsap";
const anmation = () => {
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
    enterTransition,
    exitTransition,
  };
};
let transitionPath = "none";
const StarportAndTeleport: FC<{ pathname: string }> = ({ pathname }) => {
  const { toggleCompleted, starport, setStarport, teleport, setTeleport } =
    useContext(TransitionContext) as TransitionContextType;
  const { enterTransition, exitTransition } = anmation();
  if (["/"].includes(pathname)) {
    transitionPath = "out";
  } else if (pathname.startsWith("/works/")) {
    transitionPath = "in";
  } else {
    transitionPath = "none";
  }
  useEffect(() => {
    if (transitionPath === "in" && starport) {
      toggleCompleted(false);
      enterTransition(starport, () => {
        toggleCompleted(true);
      });
    }
  }, [starport, enterTransition, toggleCompleted]);

  useEffect(() => {
    if (transitionPath === "out" && starport && teleport) {
      toggleCompleted(false);
      exitTransition(teleport, () => {
        setStarport(undefined);
        setTeleport(undefined);
        toggleCompleted(true);
      });
    }
  }, [
    teleport,
    exitTransition,
    starport,
    setStarport,
    setTeleport,
    toggleCompleted,
  ]);
  return <></>;
};
export default StarportAndTeleport;
