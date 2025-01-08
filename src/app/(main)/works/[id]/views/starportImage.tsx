"use client";
import Image from "next/image";
import { FC, useState } from "react";
import Starport from "@/components/animation/starport";
const StarportImage: FC<{ id: string }> = ({ id }) => {
  return (
    <Starport
      className="m-auto w-1/2"
    >
      <Image
        className="contain-layout w-full"
        style={{ viewTransitionName: "pic" }}
        width={200}
        height={200}
        src={`/images/${id}.jpg`}
        alt="项目图片"
      />
    </Starport>
  );
};
export default StarportImage;
