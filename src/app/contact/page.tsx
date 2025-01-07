import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactForm from "@/app/contact/views/form";
import BackButton from "@/app/contact/views/backButton";
const Page = () => {
  return (
    <>
      <header className="flex justify-between items-center h-[4rem] p-4 border-b">
        <h2 className="font-serif w-12 text-center">PING</h2>
        <BackButton />
      </header>
      <div className="flex w-full lg:h-[calc(100vh-4rem)] h-auto overflow-auto flex-wrap">
        <div className="p-4 flex-1 flex flex-col justify-between lg:border-r">
          <div className="text-6xl font-serif my-4 break-all">
            和我联系，或者一起工作？
            <blockquote>Get in touch with me, or work together?</blockquote>
          </div>
          <div className="flex justify-between">
            <p className="max-w-[300px]">
              请随时使用这个，方便的时候给我发信息，我期待着你的消息！
            </p>
            <div className="flex flex-col">
              <Link href={"/test"} className="text-right">
                <Button variant={"animationLink"} className="h-4">
                  Github
                </Button>
              </Link>
              <Link href={"/"} className="text-right">
                <Button variant={"animationLink"} className="h-4">
                  Twitter
                </Button>
              </Link>
              <Link href={"/"} className="text-right">
                <Button variant={"animationLink"} className="h-4">
                  稀土掘金
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="min-w-[300px] lg:w-1/3 w-full shrink-0">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Page;
