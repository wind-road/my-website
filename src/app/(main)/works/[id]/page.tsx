import Image from "next/image";
import type { FC } from "react";
const page: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const id = (await params).id;
  return (
    <div className="size-full overflow-auto">
      <h1 className="text-center text-4xl p-4 font-bold">
        item-detail 未完待续
      </h1>
      <Image
        className="w-1/2 m-auto contain-layout"
        style={{ viewTransitionName: "pic" }}
        width={200}
        height={200}
        src={`/images/${id}.jpg`}
        alt="项目图片"
      />
    </div>
  );
};
export default page;
