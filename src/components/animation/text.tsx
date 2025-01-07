"use client";
import gsap, { Back } from "gsap";
import { useRef, useEffect, useState, type FC } from "react";

import { cn } from "@/lib/utils";

const TextAnimation: FC<{
  text: string;
  className?: string;
  enterLoop?: boolean;
}> = ({ text, className, enterLoop }) => {
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const [initTime, setInitTime] = useState(new Date().getTime());

  const tl = gsap.timeline();
  const textDuration = 0.2;

  // 重新执行动画
  const restart = () => {
    const currentTime = new Date().getTime();
    if (
      currentTime - initTime >
      textDuration * spanRefs.current.length * 1000
    ) {
      setInitTime(currentTime);
      tl.restart();
    }
  };

  useEffect(() => {
    const initTextAnimation = () => {
      spanRefs.current.forEach((el) => {
        tl.fromTo(
          el,
          {
            ease: Back.easeOut.config(0.5),
            opacity: 0,
            rotation: 0,
            // x: 2000,
            y: -100,
          },
          {
            ease: Back.easeOut.config(0.5),
            opacity: 1,
            rotation: 360,
            y: 0,
            duration: textDuration,
          },
          "<.1"
        );
      });
    };

    initTextAnimation();
  }, [tl]);

  return (
    <div
      className={cn(
        "flex justify-center overflow-hidden text-9xl font-serif",
        className
      )}
      onMouseEnter={enterLoop && restart || undefined}
    >
      {text.split("").map((item, index) => (
        <span
          key={index}
          ref={(el) => {
            spanRefs.current[index as number] = el as HTMLSpanElement;
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};
export default TextAnimation;
