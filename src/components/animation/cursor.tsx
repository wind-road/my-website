"use client";
import { useRef, useEffect, type FC } from "react";
let isHovering = false;
const Cursor: FC = () => {
  const cursorRef1 = useRef<HTMLDivElement>(null);
  const cursorRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 设置父级光标为none
    const offsetParent = cursorRef1.current!.offsetParent as HTMLDivElement
    offsetParent.style.cursor = 'none'
    const setPosition = (x: number, y: number) => {
      window.requestAnimationFrame(function () {
        cursorRef1.current!.style.transform = `translate(${x - 6}px, ${
          y - 6
        }px)`;

        if (!isHovering) {
          cursorRef2.current!.style.transform = `translate(${x - 20}px, ${
            y - 20
          }px)`;
        }
      });
    };
    const bodyMousemove = (e: MouseEvent) => {
      window.requestAnimationFrame(function () {
        setPosition(e.clientX, e.clientY);
      });
    };
    const mouseover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains("g-animation")) {
        isHovering = true;
        const rect = target.getBoundingClientRect();
        const style = window.getComputedStyle(target);

        cursorRef2.current!.style.width = `${rect.width + 20}px`;
        cursorRef2.current!.style.height = `${rect.height + 20}px`;
        cursorRef2.current!.style.borderRadius = `${style.borderRadius}`;
        cursorRef2.current!.style.transform = `translate(${rect.left - 10}px, ${
          rect.top - 10
        }px)`;
      }
    };
    const mousemove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("g-animation")) {
        isHovering = false;

        cursorRef2.current!.style.width = `42px`;
        cursorRef2.current!.style.height = `42px`;
        cursorRef2.current!.style.borderRadius = `50%`;
      }
    };

    document.body.addEventListener("mousemove", bodyMousemove);
    window.addEventListener("mouseover", mouseover);
    window.addEventListener("mouseout", mousemove);
    return () => {
      // 卸载事件
      document.body.removeEventListener("mousemove", bodyMousemove);
      window.removeEventListener("mouseover", mouseover);
      window.removeEventListener("mouseout", mousemove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef1}
        className="absolute top-0 left-0 translate-x-[-200px] size-3 bg-[#4caf50] rounded-full z-50 mix-blend-exclusion pointer-events-none"
      ></div>
      <div
        ref={cursorRef2}
        className="absolute top-0 left-0 translate-x-[-200px] size-10 bg-[#fff] rounded-full mix-blend-exclusion pointer-events-none transition-[.15s_ease-out]"
      ></div>
    </>
  );
};
export default Cursor;
