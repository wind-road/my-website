"use client";
// import gsap from "gsap";
import { useRef, FC, useEffect, ReactNode, useContext } from "react";
import TransitionContext, {
  TransitionContextType,
} from "@/context/TransitionContext";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// let opacityValue = 0;

const Teleport: FC<{
  children: ReactNode;
  className?: string;
  style?: object;
}> = ({ children, className, ...props }) => {

  const { teleport, setStarport } = useContext(
    TransitionContext
  ) as TransitionContextType;

  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childRef.current && teleport) {
      const rect = childRef.current.getBoundingClientRect();
      // coord.style.display = coord.style.display === "none" ? "block" : "none";
      setStarport({
        id: teleport?.id,
        end: function (): void {
          throw new Error("Function not implemented.");
        },
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        position: "",
      });
    }
  }, [teleport, setStarport]);

  return (
    <div
      ref={childRef}
      {...props}
      className={cn(cva("starport-box w-fit")({ className }))}
    >
      {children}
    </div>
  );
};
export default Teleport;
