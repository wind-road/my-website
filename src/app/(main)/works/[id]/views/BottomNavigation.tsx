"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
const BottomNavigation: FC<{
  id: string;
}> = ({ id }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between my-4">
      <Button
        variant="animationLink"
        className="w-12"
        onClick={() => router.back()}
      >
        上一篇
      </Button>
      <Button
        variant="animationLink"
        className="w-12"
        onClick={() =>  router.push("/works/" + (Number(id) + 1), { scroll: false })}
      >
        下一篇
      </Button>
    </div>
  );
};
export default BottomNavigation;
