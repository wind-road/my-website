import type { FC, ReactNode } from "react";

const Teleport: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
export default Teleport;
