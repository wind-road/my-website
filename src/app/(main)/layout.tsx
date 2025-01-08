import type { FC } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionComponent from "@/components/animation/layoutTransition";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col bg-background dark:bg-dark-background overflow-hidden h-[100vh]">
      {/* 顶部固定的Header */}
      <div className="sticky top-0 z-30 bg-background">
        <Header />
      </div>
      <TransitionProvider>
        <TransitionComponent>
          <main className="size-full h-[calc(100vh-4rem)]">{children}</main>
        </TransitionComponent>
      </TransitionProvider>
    </div>
  );
};

export default Layout;
