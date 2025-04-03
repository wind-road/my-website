"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import Starport from "@/components/animation/starport";
import MarkdownViewer from "@/components/MarkdownViewer";
import { marked } from "marked";
import { debounce } from "lodash";
import gsap from "gsap";
import "@/styles/github-markdown.css";
const TextContent: FC<{
  id: string;
  markdownContent: string;
}> = ({ id, markdownContent }) => {
  const markdownRef = useRef<HTMLDivElement>(null);
  // 防抖处理滚动事件
  const throttledScroll = debounce(() => {
    const current = markdownRef.current;
    const scrollElement = document.documentElement || document.body;
    if (current && scrollElement) {
      gsap.to(scrollElement, {
        scrollTop: current.offsetTop - 72, // 减去 header 高度
        duration: 0.3,
      });
    }
  }, 300);

  return (
    <>
      <Starport className="m-auto my-2 w-full" callBack={throttledScroll}>
        <Image
          // className="min-h-[500px] w-auto aspect-[1/1]"
          className="w-full"
          width={200}
          height={200}
          src={`/images/${id}.jpg`}
          alt="项目图片"
        />
      </Starport>
      <MarkdownViewer
        ref={markdownRef}
        markdownContent={marked.parse(markdownContent)}
      />
    </>
  );
};
export default TextContent;
