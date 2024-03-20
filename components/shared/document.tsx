import { cn } from "@/lib/utils";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystatic/core/renderer";

type DocumentProps = DocumentRendererProps & {
  className?: string;
};

export function Document(props: DocumentProps) {
  return (
    <div className={cn("prose prose-sm md:prose-base", props.className)}>
      <DocumentRenderer {...props} />
    </div>
  );
}
