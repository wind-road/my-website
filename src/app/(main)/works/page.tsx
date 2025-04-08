import Image from "next/image";
const Page = () => {
  const RendererImage = () => {
    return (
      <div className="border p-1 rounded-sm w-full sm:w-auto">
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
        <h3 className="font-bold">某某项目title</h3>
        <p className="max-w-[650px] mt-2">
          某某项目是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务,打造一个激发开发者创作灵感,激励开发者沉淀分享,陪伴开发者成长的综和服务
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
