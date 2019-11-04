import React from 'react';
import { RichUtils } from 'draft-js';
import { makeStyles } from '@material-ui/core';
import StyledButton from './StyledButton';
import TextButton from './TextButton';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import Crop54Icon from '@material-ui/icons/Crop54';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Toolbar = ({ editorState, setEditorState }) => {
  const classes = useStyles();

  const onInlineClick = style => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onBlockTypeClick = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const inlineStyles = [
    { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
    { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
    { label: 'Monospace', style: 'CODE', icon: <CodeIcon /> }
  ];

  const headerTypes = [
    { label: 'Heading1', style: 'header-one' },
    { label: 'Heading2', style: 'header-two' },
    { label: 'Heading3', style: 'header-three' }
  ];

  const blockTypes = [
    { label: 'Blockquote', style: 'blockquote', icon: <FormatQuoteIcon /> },
    {
      label: 'UL',
      style: 'unordered-list-item',
      icon: <FormatListBulletedIcon />
    },
    {
      label: 'OL',
      style: 'ordered-list-item',
      icon: <FormatListNumberedIcon />
    },
    { label: 'Code Block', style: 'code-block', icon: <Crop54Icon /> }
  ];

  const selection = editorState.getSelection();

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={classes.body}>
      <div>
        {headerTypes.map(type => (
          <TextButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={onBlockTypeClick}
            style={type.style}
          />
        ))}
        {blockTypes.map(type => (
          <StyledButton
            key={type.label}
            active={type.style === blockType}
            onToggle={onBlockTypeClick}
            style={type.style}
            icon={type.icon}
          />
        ))}
      </div>
      <div>
        {inlineStyles.map(type => (
          <StyledButton
            key={type.label}
            active={currentStyle.has(type.style)}
            onToggle={onInlineClick}
            style={type.style}
            icon={type.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
