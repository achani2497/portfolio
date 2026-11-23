import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useDeferredValue } from "react";
import type { ComponentProps } from "react";

const REMARK_PLUGINS = [remarkGfm, remarkBreaks];

const MARKDOWN_COMPONENTS = {
  a: ({ children, href }: ComponentProps<"a">) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

type MarkdownBodyProps = {
  content: string;
};

export default function MarkdownBody({ content }: MarkdownBodyProps) {
  const deferredContent = useDeferredValue(content);

  return (
    <ReactMarkdown
      remarkPlugins={REMARK_PLUGINS}
      components={MARKDOWN_COMPONENTS}
      skipHtml
    >
      {deferredContent}
    </ReactMarkdown>
  );
}
