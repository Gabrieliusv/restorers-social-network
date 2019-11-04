import React from 'react';
import { Button, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles({
  activeButton: {
    backgroundColor: '#BBCBE2'
  }
});

const CustomButton = withStyles({
  root: {
    textTransform: 'none',
    margin: '3px',
    fontSize: 16
  }
})(Button);

const StyledButton = ({ style, onToggle, active, label }) => {
  const classes = useStyles();

  return (
    <CustomButton
      className={active ? classes.activeButton : null}
      onMouseDown={() => onToggle(style)}
    >
      {label}
    </CustomButton>
  );
};

export default StyledButton;
