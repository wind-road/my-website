import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const preventDefaultHandler =
  (handler: (event: React.SyntheticEvent) => void) =>
  (event: React.SyntheticEvent) => {
    event.preventDefault();
    handler(event);
  };
// 判断浏览器环境
export const isBrowser = <T>(callback: () => T) => {
  if (typeof window !== "undefined") {
    return callback();
  }
  return () => {};
};

// 高阶函数，用于创建带有缓存判断结果的 copyText 函数
const createCopyTextFunction = () => {
  // 判断是否支持 clipboard API
  if (
    typeof window !== "undefined" &&
    typeof navigator.clipboard === "object" &&
    navigator.clipboard !== null
  ) {
    return (text: string, success?: () => void, error?: () => void) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          success?.();
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          error?.();
        });
    };
  }
  // 对于不支持 clipboard API 的浏览器，使用文本域方法
  return (text: string, success?: () => void, error?: () => void) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.execCommand("copy") ? success?.() : error?.();
    document.body.removeChild(textArea);
  };
};

// export const copyText = isBrowser<ReturnType<typeof createCopyTextFunction>>(
//   createCopyTextFunction
// );
export const copyText = createCopyTextFunction();

// 随机数
export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
