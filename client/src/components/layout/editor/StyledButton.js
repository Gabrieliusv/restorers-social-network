import React from 'react';
import { IconButton, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles({
  activeButton: {
    backgroundColor: '#BBCBE2'
  }
});

const CustomButton = withStyles({
  root: {
    margin: '3px',
    padding: '7px',
    borderRadius: '20%'
  }
})(IconButton);

const StyledButton = ({ style, onToggle, active, icon }) => {
  const classes = useStyles();

  return (
    <CustomButton
      className={active ? classes.activeButton : null}
      onMouseDown={() => onToggle(style)}
    >
      {icon}
    </CustomButton>
  );
};

export default StyledButton;
