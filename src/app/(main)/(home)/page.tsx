import TextAnimation from "@/components/animation/text";
import Items from "./views/Items";
import worksList from "@/lib/data";

const Page = () => {
  return (
    <>
      <div className="size-full flex flex-col justify-between p-4 py-6">
        <Items list={worksList} />
        <TextAnimation text={"WEIPING"} stop />
        {/* <TextAnimation text={"岂不闻天无绝人之路"} /> */}
      </div>
    </>
  );
};

export default Page;
