import { useRef, FC, ReactNode, useEffect, useState, SetStateAction } from "react";
import { ElementInfo } from "@/context/TransitionContext";
const Teleport: FC<{
  children: ReactNode;
  teleportId: string;
  teleport: ElementInfo;
  setTeleport: (value: ElementInfo) => void;
  // teleportOpacity: number;
  // setTeleportOpacity: (value: SetStateAction<number>) => void;
  className: string;
  style: object;
}> = ({
  children,
  teleportId = new Date().getTime().toString(),
  teleport,
  setTeleport,
  // teleportOpacity,
  // setTeleportOpacity,
  ...props
}) => {
  const [opacity, setOpacity] = useState(1);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const childRef = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    console.log("teleportId", opacity)
    if (childRef.current) {
      if (teleport?.id === teleportId) {
        setOpacity(0);
        // setTeleportOpacity(0)
      }
      const rect = childRef.current.getBoundingClientRect();
      // 初始化的宽高存储起来
      setSize({ width: rect.width, height: rect.height });
    }
    return () => {};
  }, []);

  return (
    <div
      ref={childRef}
      {...props}
      onClick={onClick}
      style={{ opacity: opacity }}
      id={"teleport-id-" + teleportId}
    >
      {children}
    </div>
  );
};
export default Teleport;
