"use client";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo(
      pageRef.current,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 20%, 0 0%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
      }
    );
  }, [tl]);
  return (
    <div ref={pageRef} className="size-full bg-[#A75C42] lg:h-[100vh] h-full">
      {children}
    </div>
  );
};

export default Layout;
