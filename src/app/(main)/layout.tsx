import type { FC } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionComponent from "@/components/animation/layoutTransition";
import Image from "next/image";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative bg-background dark:bg-dark-background">
      {/* 顶部固定的Header */}
      <div className="sticky top-0 z-30 bg-background">
        <Header />
      </div>
      <TransitionProvider>
        <TransitionComponent>
          <main className="size-full p-2">{children}</main>
        </TransitionComponent>
      </TransitionProvider>
      <footer className="w-full flex justify-center my-4">
        <div className="w-10/12 flex justify-center gap-10">
          <ul className="flex gap-5">
            <li className="text-gray-500">
              ©{new Date().getFullYear()} winping
            </li>
            <li>Blog</li>
            <li>About</li>
            <li>About</li>
          </ul>
          <div className="flex items-center gap-2">
            <div>
              <Image
                src="https://qcloudimg.tencent-cloud.cn/raw/eed02831a0e201b8d794c8282c40cf2e.png"
                alt="logo"
                width={14}
                height={15}
              />
            </div>
            <span>粤公网安备xxxxxxxxxxxxxxx号</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
