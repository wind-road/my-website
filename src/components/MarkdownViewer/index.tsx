// components/MarkdownViewer.js
import React from "react";

const MarkdownViewer = React.forwardRef<
  HTMLDivElement,
  { markdownContent: Promise<string> | string }
>(({ markdownContent }, ref) => {
  return (
    <div
      ref={ref}
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownContent }}
    />
  );
});

MarkdownViewer.displayName = "MarkdownViewer";

export default MarkdownViewer;
