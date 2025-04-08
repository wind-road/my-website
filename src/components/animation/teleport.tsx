import { useRef, FC, ReactNode, useEffect, useState } from "react";
import { ElementInfo } from "@/context/TransitionContext";
const Teleport: FC<{
  children: ReactNode;
  isAnimating: boolean;
  teleportId: string;
  teleport: ElementInfo | undefined;
  setTeleport: (value: ElementInfo) => void;
  className: string;
  style: object;
}> = ({
  children,
  isAnimating,
  teleportId = new Date().getTime().toString(),
  teleport,
  setTeleport,
  ...props
}) => {

  const [size, setSize] = useState({ width: 0, height: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isAnimating) return;
    const currentTarget = e.currentTarget;
    const rect = e.currentTarget.getBoundingClientRect();
    setTeleport({
      id: teleportId,
      end: () => {},
      left: rect.x,
      top: rect.y,
      width: size.width,
      height: size.height,
      position: currentTarget.style.position,
    });

    currentTarget.style.position = "fixed";
    currentTarget.style.top = `${rect.y}px`;
    currentTarget.style.left = `${rect.x}px`;
    currentTarget.style.width = `${rect.width}px`;
    currentTarget.style.height = `${rect.height}px`;

    const coord = document.body.querySelector("#coord");
    coord!.innerHTML = "";
    coord?.appendChild(currentTarget);
  };

  useEffect(() => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      // 初始化的宽高存储起来
      setSize({ width: rect.width, height: rect.height });
    }
    return () => {};
  }, [teleport, teleportId]);

  return (
    <div
      ref={childRef}
      {...props}
      onClick={onClick}
      style={{ opacity: 1 }}
      id={"teleport-id-" + teleportId}
    >
      {children}
    </div>
  );
};
export default Teleport;
