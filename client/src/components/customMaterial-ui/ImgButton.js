import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const ImgButton = withStyles(theme => ({
  root: {
    width: '110px',
    height: '110px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'white',
      border: '1px solid #ADB0B0'
    }
  }
}))(Button);

export default ImgButton;
