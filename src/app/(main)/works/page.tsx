import Image from "next/image";
const Page = () => {
  const RendererImage = () => {
    return (
      <div className="border p-1 rounded-sm">
        <Image
          className="w-full lg:w-[300px] g-animation"
          width={300}
          height={300}
          src={"/images/354.webp"}
          alt="项目图片"
        />
      </div>
    );
  };
  const RendererDescription = () => {
    return (
      <div>
        <h3 className="font-bold g-animation">
          淘宝网换肤大赛之《摸鱼神器代码编辑器版淘宝》
        </h3>
        <p className="max-w-[650px] mt-2">
          《摸鱼神器代码编辑器版淘宝》提供细腻的css样式将淘宝网化身为“摸鱼神器”，即保留了用户的交互体验，也使得淘宝网可以更进一步，拓宽购物场景。
        </p>
      </div>
    );
  };
  return (
    <div className="size-full relative flex justify-center items-start flex-wrap overflow-auto">
      <h2 className="text-2xl font-bold w-full text-center my-2">
        个人作品展示
      </h2>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 flex-wrap justify-center mt-4"
          style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
        >
          <RendererImage />
          <RendererDescription />
        </div>
      ))}
    </div>
  );
};
export default Page;
