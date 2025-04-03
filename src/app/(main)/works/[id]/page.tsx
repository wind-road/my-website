// import Image from "next/image";
import type { FC } from "react";

import { loadLocalMarkdown } from "@/lib/loadLocalMarkdown";
import worksList from "@/lib/data";
import { randomNumber } from "@/lib/utils";
import { Eye } from "lucide-react";
import TextContent from "./views/TextContent";
import BottomNavigation from "./views/BottomNavigation";
const Page: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const id = (await params).id;
  const currentWork = worksList.find((item) => item.id.toString() === id);
  const markdownContent = loadLocalMarkdown(currentWork?.link || ""); // 相对于项目根目录的路径st router = useRouter();

  return (
    <div className="size-full overflow-auto p-4">
      <article className="max-w-[800px] m-auto">
        <h1 className="text-3xl font-bold my-4">{currentWork?.title}</h1>
        <div className="flex justify-start gap-3 items-center text-gray-500 my-2">
          <span className="font-bold">weiping</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span className="flex gap-1">
            <Eye />
            {randomNumber(1, 10000)}
          </span>
        </div>
        <p>{currentWork?.description}</p>
        <TextContent id={id} markdownContent={markdownContent} />
        <BottomNavigation id={id} />
      </article>
    </div>
  );
};
export default Page;
