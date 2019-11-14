import React, { useRef } from "react";
import Toolbar from "./Toolbar";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import "./editor.css";

const CustomEditor = ({ editorState, setEditorState }) => {
  const editor = useRef();

  //custom block styles
  const getBlockStyle = block => {
    switch (block.getType()) {
      case "blockquote":
        return "BlockQuote";
      case "code-block":
        return "CodeBlock";
      default:
        return null;
    }
  };

  //custom inline styles
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    }
  };

  let editorContainer = "EditorContainer";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      editorContainer += " Editor--hide-placeholder";
    }
  }

  return (
    <div className='EditorWrapper'>
      <div className='ToolbarContainer'>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
      </div>
      <div className={editorContainer}>
        <Editor
          placeholder='Write something...'
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          ref={editor}
        />
      </div>
    </div>
  );
};

export default CustomEditor;
