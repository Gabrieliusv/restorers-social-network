import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './editor.css';

const ViewOnlyEditor = ({ editorState }) => {
  //custom block styles
  const getBlockStyle = block => {
    switch (block.getType()) {
      case 'blockquote':
        return 'BlockQuote';
      case 'code-block':
        return 'CodeBlock';
      default:
        return null;
    }
  };

  //custom inline styles
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    }
  };

  return (
    <div className='ViewEditorWrapper'>
      <Editor
        editorState={editorState}
        readOnly={true}
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
      />
    </div>
  );
};

ViewOnlyEditor.propTypes = {
  editorState: PropTypes.object.isRequired
};

export default ViewOnlyEditor;
