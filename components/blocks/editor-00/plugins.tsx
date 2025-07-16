import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { CodeActionMenuPlugin } from "@/components/editor/plugins/code-action-menu-plugin";
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin";
import { FormatCodeBlock } from "@/components/editor/plugins/toolbar/block-format/format-code-block";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin";
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { CodeLanguageToolbarPlugin } from "@/components/editor/plugins/toolbar/code-language-toolbar-plugin";
import { BlockInsertPlugin } from "@/components/editor/plugins/toolbar/block-insert-plugin";
import { InsertImage } from "@/components/editor/plugins/toolbar/block-insert/insert-image";
import { ImagesPlugin } from "@/components/editor/plugins/images-plugin";

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className='relative'>
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className='vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1'>
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatQuote />
              <FormatCodeBlock />
            </BlockFormatDropDown>
            {blockType === "code" ? <CodeLanguageToolbarPlugin /> : <></>}
            <FontFamilyToolbarPlugin />
            <FontFormatToolbarPlugin format='bold' />
            <FontFormatToolbarPlugin format='italic' />
            <FontFormatToolbarPlugin format='underline' />
            <FontFormatToolbarPlugin format='strikethrough' />
            <LinkToolbarPlugin />
            <BlockInsertPlugin>
              <InsertImage />
            </BlockInsertPlugin>
          </div>
        )}
      </ToolbarPlugin>
      <div className='relative'>
        <RichTextPlugin
          contentEditable={
            <div className=''>
              <div className='' ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
        <CodeHighlightPlugin />
        <ClickableLinkPlugin />
        <AutoLinkPlugin />
        <LinkPlugin />
        <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
        <ImagesPlugin />
      </div>
      {/* actions plugins */}
    </div>
  );
}
