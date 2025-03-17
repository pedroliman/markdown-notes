import { useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { ViewUpdate } from "@codemirror/view";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeMirrorEditor({ value, onChange }: CodeMirrorEditorProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const view = new EditorView({
      doc: value,
      extensions: [
        basicSetup,
        markdown(),
        EditorView.updateListener.of((update: ViewUpdate) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          "&": { height: "100%" },
          ".cm-scroller": { overflow: "auto" },
          ".cm-content": { minHeight: "100%" },
        }),
      ],
      parent: element,
    });

    return () => view.destroy();
  }, [element]);

  return (
    <>
      <div className="flex-1 border-r border-border" ref={setElement} />
      <ScrollArea className="flex-1 p-4">
        <div className="prose max-w-none">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      </ScrollArea>
    </>
  );
}
