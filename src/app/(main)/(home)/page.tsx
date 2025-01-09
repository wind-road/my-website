import TextAnimation from "@/components/animation/text";
import Items from "./views/Items";
const list = Array.from({ length: 8 }, (_, i) => ({
  month: `${i < 9 ? "0" : ""}${i + 1}.`,
  title: "SONA",
  image: `/images/${i + 1}.jpg`,
  description: "(CLIENT WORK)",
  link: "/",
}));

const Page = () => {
  return (
    <>
      <div className="size-full flex flex-col justify-between p-4 py-6">
        <Items list={list} />
        <TextAnimation text={"WEIPING"} />
        {/* <TextAnimation text={"岂不闻天无绝人之路"} /> */}
      </div>
    </>
  );
};

export default Page;
