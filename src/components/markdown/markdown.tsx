import { cn } from "~/lib/utils";
import { type BasicProps } from "~/types/basic";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

type MarkdownProps = BasicProps & {
  children: string;
};

export default function Markdown({
  className,
  style,
  children,
}: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-h1:text-primary prose-h2:text-primary prose-p:text-primary text-primary",
        className,
      )}
      style={style}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
