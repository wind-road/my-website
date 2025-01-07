'use client'
import React, { createContext } from "react";
import { useState, type FC } from "react";
// 切换动画 | 过渡动画
export type AnimationType = 'toggle' | 'transition';

export interface TransitionContextType {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
  animationType: AnimationType;
  toggleAnimationType: (value: AnimationType) => void;
}

const TransitionContext = createContext<TransitionContextType | object>({});

export const TransitionProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [completed, setCompleted] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>('toggle');

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };
  const toggleAnimationType = (value: AnimationType) => {
    setAnimationType(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        completed,
        animationType,
        toggleAnimationType
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
