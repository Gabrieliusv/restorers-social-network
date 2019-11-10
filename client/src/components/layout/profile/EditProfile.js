import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  createProfile,
  getCurrentProfile
} from '../../../redux/actions/profileActions';
import Alert from '../Alert';
import { removeAlert } from '../../../redux/actions/alertActions';

const useStyles = makeStyles(theme => ({
  body: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px 15px 0 15px'
  },
  paper: {
    maxWidth: 700,
    padding: 10
  },
  gridContainer: {
    marginTop: 15
  },
  profile__image__box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profile__image: {
    width: '160px',
    height: '160px',
    borderRadius: '50%'
  },
  profile__image__icon: {
    width: '160px',
    height: '160px',
    color: '#2C3B4E'
  },
  profile__image__text: {
    margin: '5px 20px'
  },
  profile__image__upload: {
    marginTop: 10
  },
  buttonGroup: {
    marginTop: 10,
    float: 'right'
  },
  buttonGroup__button: {
    margin: theme.spacing(1)
  }
}));

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  removeAlert,
  auth: { isAuthenticated },
  profile,
  history
}) => {
  const classes = useStyles();
  const [requiredField, setRequiredField] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    about: '',
    degree: '',
    restorationCategory: '',
    experience: '',
    city: '',
    phoneNum: '',
    email: '',
    img: ''
  });

  useEffect(() => {
    if (!profile && isAuthenticated) {
      getCurrentProfile();
    } else if (profile) {
      setFormData(profile);
      setProfileImg(profile.profileImg.filePath);
    }
    return () => {
      removeAlert();
    };
  }, [profile, isAuthenticated, getCurrentProfile, removeAlert]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUploadImg = e => {
    if (e.target.files[0] === undefined) {
      return;
    }

    const img = URL.createObjectURL(e.target.files[0]);
    setProfileImg(img);
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleCreate = () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    if (isEmpty) {
      setRequiredField(formData);
    } else {
      const form = new FormData();
      for (let item in formData) {
        form.append(item, formData[item]);
      }

      createProfile(form, true);
      setRequiredField(false);
    }
  };

  return (
    <div className={classes.body}>
      {!profile ? (
        <CircularProgress />
      ) : (
        <Paper elevation={2} className={classes.paper}>
          <Typography align='center' variant='h5'>
            Mano Profilis
          </Typography>
          <Grid container className={classes.gridContainer} spacing={1}>
            <Grid item xs={12} sm={6}>
              <div className={classes.profile__image__box}>
                <img
                  src={profileImg}
                  alt='Profile'
                  height='160'
                  width='160'
                  className={classes.profile__image}
                ></img>
                <Button
                  className={classes.profile__image__upload}
                  variant='contained'
                  color='secondary'
                  component='label'
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                  <input
                    hidden
                    type='file'
                    name='img'
                    onChange={handleUploadImg}
                  />
                </Button>
                <Typography
                  variant='body2'
                  align='center'
                  className={classes.profile__image__text}
                  color={requiredField.profileImg === '' ? 'error' : 'initial'}
                >
                  Profilio nuotrauka neturi užimti daugiau kaip 400kb 160x160px
                  bei būti jpeg/jpg/png formato.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    error={requiredField.firstName === ''}
                    label='Vardas'
                    name='firstName'
                    value={formData.firstName}
                    onChange={e => handleChange(e)}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={requiredField.lastName === ''}
                    label='Pavardė'
                    name='lastName'
                    value={formData.lastName}
                    onChange={e => handleChange(e)}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={requiredField.city === ''}
                    label='Miestas'
                    name='city'
                    value={formData.city}
                    onChange={e => handleChange(e)}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={requiredField.about === ''}
                label='Apie mane'
                name='about'
                value={formData.about}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
                multiline
                rows='8'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.specialization === ''}
                label='Specializacijos sritis'
                name='specialization'
                value={formData.specialization}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.restorationCategory === ''}
                label='Restauratoriaus kategorija'
                name='restorationCategory'
                value={formData.restorationCategory}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.degree === ''}
                label='Išsilavinimas'
                name='degree'
                value={formData.degree}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.experience === ''}
                label='Patirtis'
                name='experience'
                value={formData.experience}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Typography align='center' variant='h6'>
                Kontaktiniai duomenys
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.phoneNum === ''}
                label='Telefono numeris'
                name='phoneNum'
                value={formData.phoneNum}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={requiredField.email === ''}
                label='Elektroninis paštas'
                name='email'
                value={formData.email}
                onChange={e => handleChange(e)}
                variant='outlined'
                fullWidth
              />
            </Grid>
          </Grid>
          <Alert />
          <div className={classes.buttonGroup}>
            <Button
              className={classes.buttonGroup__button}
              variant='contained'
              color='primary'
              onClick={() => history.push('/profile')}
            >
              Atgal
            </Button>
            <Button
              className={classes.buttonGroup__button}
              variant='contained'
              color='primary'
              onClick={handleCreate}
            >
              Redaguoti profilį
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

EditProfile.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, removeAlert }
)(EditProfile);
