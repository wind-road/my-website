"use client";
import React, { createContext } from "react";
import { useState, type FC } from "react";
// 切换动画 | 过渡动画
export type AnimationType = "toggle" | "transition";

export interface ElementInfo {
  id: string;
  end: () => void;
  left: number;
  top: number;
  width: number;
  height: number;
  position: string;
}

export interface TransitionContextType {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
  animationType: AnimationType;
  toggleAnimationType: (value: AnimationType) => void;
  starport: ElementInfo | undefined;
  setStarport: (value: ElementInfo | undefined) => void;
  teleport: ElementInfo | undefined;
  setTeleport: (value: ElementInfo | undefined) => void;
}

const TransitionContext = createContext<TransitionContextType | object>({});

export const TransitionProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [completed, setCompleted] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>("toggle");
  const [starport, setStarport] = useState<ElementInfo>();
  const [teleport, setTeleport] = useState<ElementInfo>();

  return (
    <TransitionContext.Provider
      value={{
        completed,
        toggleCompleted: (value: boolean) => {
          setCompleted(value);
        },

        animationType,
        toggleAnimationType: (value: AnimationType) => {
          setAnimationType(value);
        },

        starport,
        setStarport,

        teleport,
        setTeleport
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
