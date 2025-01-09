"use client";
import gsap from "gsap";
import { useContext } from "react";
import type { FC } from "react";
import { useRouter } from "next/navigation";
import TransitionContext, {
  type TransitionContextType,
} from "@/context/TransitionContext";
import Image from "next/image";
import Teleport from "@/components/animation/teleport";

interface ListType {
  month: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

const Items: FC<{ list: ListType[] }> = ({ list }) => {
  const router = useRouter();
  const { teleport, setTeleport } = useContext(
    TransitionContext
  ) as TransitionContextType;

  // 悬停动画
  const liMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    gsap.to(e.currentTarget, {
      width: "21%",
      duration: 0.1,
    });
  };
  // 离开动画
  const liMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    gsap.to(e.currentTarget, {
      width: "16.666667%",
      duration: 0.1,
    });
  };

  return (
    <ul className="flex h-1/2 max-h-[250px] z-10">
      {list.map((item, id) => (
        <li
          key={item.month}
          className="gsap-li shrink-0 w-1/6 min-w-[200px] mt-4 transition-all cursor-pointer "
          onMouseEnter={liMouseEnter}
          onMouseLeave={liMouseLeave}
          onClick={() => router.push(`/works/${(id + 1).toString()}`)}
        >
          <h3 className="my-3">{item.month}</h3>
          <div className="truncate">{item.title}</div>
          <div className="truncate">{item.description}</div>
          <Teleport
            teleportId={id.toString()}
            teleport={teleport}
            setTeleport={setTeleport}
            className="w-full aspect-[1/1]"
            style={{
              backgroundSize: "cover",
            }}
          >
            <Image
              width={200}
              height={200}
              className="w-full contain-layout"
              src={item.image}
              alt="项目图片"
            />
          </Teleport>
        </li>
      ))}
    </ul>
  );
};

export default Items;
