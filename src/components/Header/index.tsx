"use client";
import React from "react";
import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface TabType {
  name: string;
  href: string;
  icon: string;
}

const tabs: TabType[] = [
  {
    name: "首页",
    href: "/",
    icon: "home",
  },
  {
    name: "作品展示",
    href: "/works",
    icon: "works",
  },
  {
    name: "博客",
    href: "/blog",
    icon: "blog",
  },
  {
    name: "关于我",
    href: "/about",
    icon: "about",
  },
];

const RenderTabs: React.FC<{ tabs: TabType[] }> = ({ tabs }) => {
  return tabs.map((tab) => (
    <TabsTrigger key={tab.name} value={tab.name}>
      <Link href={tab.href}>{tab.name}</Link>
    </TabsTrigger>
  ));
};

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4 px-6 border-gray-100">
      <p className="w-24 font-serif">{new Date().toLocaleDateString()}</p>
      <Tabs defaultValue={tabs.find(item => item.href === pathname)?.name} className="m-auto">
        <TabsList>
          <RenderTabs tabs={tabs} />
        </TabsList>
      </Tabs>
      <Link href={"/contact"}>
        <Button
          variant="animationLink"
          className="w-24"
        >
          <Mail /> 联系我
        </Button>
      </Link>
    </header>
  );
};

export default Header;
