"use client";
import gsap from "gsap";
import { useRef, FC, useEffect, ReactNode, useContext, useState } from "react";
import TransitionContext, {
  TransitionContextType,
} from "@/context/TransitionContext";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

let opacityValue = 0;

const Teleport: FC<{
  children: ReactNode;
  className?: string;
  style?: object;
}> = ({ children, className, ...props }) => {
  const { teleport, setTeleport, setTeleportOpacity } = useContext(
    TransitionContext
  ) as TransitionContextType;

  const childRef = useRef<HTMLDivElement>(null);
  const [opacity] = useState(teleport?.id ? opacityValue : 1);
  const coord = document.body.querySelector("#coord") as HTMLDivElement;
  const coordChildren = coord?.children[0];
  opacityValue = 0;

  useEffect(() => {
    if (childRef.current && coordChildren) {
      const rect = childRef.current.getBoundingClientRect();
      coord.style.display = coord.style.display === "none" ? "block" : "none";
      gsap
        .timeline({
          paused: true,
          onComplete: () => {
            opacityValue = 1;
          },
        })
        .to(coordChildren, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          duration: 0.25,
        })
        .play();
    }
    return () => {
      // 卸载时动画
      if (opacity === 1 && coordChildren) {
        coord.style.display = "block";
        gsap
          .timeline({
            paused: true,
            onComplete: () => {
              // 设置Teleport会自动更新Teleport组件
              // setTeleportOpacity(1)
              setTeleport({
                id: "",
                end: function (): void {
                  throw new Error("Function not implemented.");
                },
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                position: "",
              });
              opacityValue = 0;
              const teleportBox = document.body.querySelector(
                "#teleport-id-" + teleport.id
              ) as HTMLDivElement;

              if (teleportBox) {
                teleportBox.style.opacity = "1";
              }
              coord.style.display = "none";
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
      }
    };
  }, [coord, coordChildren, opacity, setTeleport, teleport]);

  return (
    <div
      ref={childRef}
      {...props}
      className={cn(cva("starport-box w-fit opacity-0")({ className }))}
      style={{ opacity }}
    >
      {children}
    </div>
  );
};
export default Teleport;
