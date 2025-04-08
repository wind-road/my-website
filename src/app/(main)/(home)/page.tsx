import TextAnimation from "@/components/animation/text";
import Items from "./views/Items";
import worksList from "@/lib/data";

const Page = () => {
  return (
    <>
      <div className="w-full pt-4">
        <Items list={worksList} />
        {/* <div className="h-6"></div> */}
        <TextAnimation text={"WEIPING"} stop />
        {/* <TextAnimation text={"岂不闻天无绝人之路"} /> */}
      </div>
    </>
  );
};

export default Page;
