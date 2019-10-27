import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Box } from '@material-ui/core/';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Box key={alert.id} p={1}>
      <Typography variant='body1' align='center' color={alert.alertType}>
        {alert.msg}
      </Typography>
    </Box>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert.alerts
});

export default connect(mapStateToProps)(Alert);
