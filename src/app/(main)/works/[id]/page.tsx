import Image from "next/image";
import type { FC } from "react";
import Starport from "@/components/animation/starport";

import MarkdownViewer from "@/components/MarkdownViewer";
import { loadLocalMarkdown } from "@/lib/loadLocalMarkdown";
import { marked } from "marked";
import worksList from "@/lib/data";
import { randomNumber } from "@/lib/utils";
import { Eye } from "lucide-react";
import "@/styles/github-markdown.css";
const Page: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const id = (await params).id;
  const currentWork = worksList.find((item) => item.id.toString() === id);
  const markdownContent = loadLocalMarkdown(currentWork?.link || ""); // 相对于项目根目录的路径
  // console.log('id')
  return (
    <div className="size-full overflow-auto p-4">
      <article className="max-w-[800px] m-auto">
        <h1 className="text-3xl font-bold my-4">
          {currentWork?.title}
        </h1>
        <div className="flex justify-start gap-3 items-center text-gray-500 my-2">
          <span>weiping</span>
          <span>2021/9/1</span>
          <span className="flex gap-1">
            <Eye />
            {randomNumber(1, 10000)}
          </span>
        </div>
        <p>{currentWork?.description}</p>
        <MarkdownViewer markdownContent={marked.parse(markdownContent)} />
        <Starport className="m-auto my-2 w-full">
          <Image
            // className="min-h-[500px] w-auto aspect-[1/1]"
            className="w-full"
            width={200}
            height={200}
            src={`/images/${id}.jpg`}
            alt="项目图片"
          />
        </Starport>
        
      </article>
    </div>
  );
};
export default Page;
