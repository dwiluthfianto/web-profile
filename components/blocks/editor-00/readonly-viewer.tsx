import { useState } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { ParagraphNode, SerializedEditorState, TextNode } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin";
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { ImagesPlugin } from "@/components/editor/plugins/images-plugin";
import { ImageNode } from "@/components/editor/nodes/image-node";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingLinkContext } from "@/components/editor/context/floating-link-context";
import { CodeActionMenuPlugin } from "@/components/editor/plugins/code-action-menu-plugin";

const readOnlyConfig: InitialConfigType = {
  namespace: "ReadOnlyViewer",
  theme: editorTheme,
  editable: false, // Explicitly set to false
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

interface ReadOnlyViewerProps {
  editorSerializedState: SerializedEditorState;
  className?: string;
}

export function ReadOnlyViewer({
  editorSerializedState,
  className = "",
}: ReadOnlyViewerProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className={`overflow-hidden cursor-default ${className}`}>
      <LexicalComposer
        initialConfig={{
          ...readOnlyConfig,
          editorState: JSON.stringify(editorSerializedState),
        }}
      >
        <TooltipProvider>
          <FloatingLinkContext>
            <div className='relative'>
              <div className='relative'>
                <RichTextPlugin
                  contentEditable={
                    <div>
                      <div ref={onRef}>
                        <ContentEditable
                          className='outline-none cursor-default select-text'
                          placeholder=''
                        />
                      </div>
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />

                {/* Plugin minimal untuk read-only */}
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <CodeHighlightPlugin />
                <ClickableLinkPlugin />
                <AutoLinkPlugin />
                <LinkPlugin />
                <ImagesPlugin />
              </div>
            </div>
          </FloatingLinkContext>
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
