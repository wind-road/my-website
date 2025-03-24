// components/MarkdownViewer.js
import React from "react";

const MarkdownViewer: React.FC<{ markdownContent: Promise<string> | string }> = ({
  markdownContent,
}) => {
  return <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownContent }} />;
};

export default MarkdownViewer;
