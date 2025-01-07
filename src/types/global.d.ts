interface Document {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
}
interface CSSStyleDeclaration {
  viewTransitionName?: string;
}