import type { FC } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionComponent from "@/components/animation/layoutTransition";
import Image from "next/image";
import Link from "next/link";
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative bg-background dark:bg-dark-background">
      {/* 顶部固定的Header */}
      <div className="sticky top-0 z-30 bg-background">
        <Header />
      </div>
      <TransitionProvider>
        <TransitionComponent>
          <main className="p-2 box-content">{children}</main>
        </TransitionComponent>
      </TransitionProvider>
      <footer className="w-full flex justify-center my-4">
        <div className="w-10/12 flex flex-wrap justify-center gap-10">
          <ul className="flex flex-wrap gap-5">
            <li className="text-gray-500">
              ©{new Date().getFullYear()} winping
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li><Link href={"/about"}>About</Link></li>
            <li><Link href={"/contact"}>联系我</Link></li>
          </ul>
          <div className="flex items-center gap-2 text-gray-500">
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
