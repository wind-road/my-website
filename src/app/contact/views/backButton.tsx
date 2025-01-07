"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="animationLink"
      className="w-12"
      onClick={() => router.back()}
    >
      关闭
    </Button>
  );
};
export default BackButton;
