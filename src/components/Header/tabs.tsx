"use client";
import React from "react";
import Link from "next/link";
import { TabsTrigger } from "@/components/ui/tabs";

interface TabType {
  name: string;
  href: string;
  icon: string;
}

const RenderTabs: React.FC<{ tabs: TabType[] }> = ({ tabs }) => {
  return tabs.map((tab) => (
    <TabsTrigger key={tab.name} value={tab.name}>
      <Link href={tab.href}>{tab.name}</Link>
    </TabsTrigger>
  ));
};

export default RenderTabs;
