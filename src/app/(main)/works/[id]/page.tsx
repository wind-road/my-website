import Image from "next/image";
import type { FC } from "react";
import Starport from "@/components/animation/starport";
// import StarportImage from "./views/starportImage";
const Page: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const id = (await params).id;
  return (
    <div className="size-full overflow-auto">
      <h1 className="text-center text-4xl p-4 font-bold">
        item-detail 未完待续
      </h1>
      <Starport className="m-auto w-1/2">
        <Image
          className="contain-layout w-full"
          width={200}
          height={200}
          src={`/images/${id}.jpg`}
          alt="项目图片"
        />
      </Starport>
    </div>
  );
};
export default Page;
