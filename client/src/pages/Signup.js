import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core'

import Copyright from '../components/Elements/Copyright';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: '40px 20px',
  },
  signupCard: {
    backgroundColor: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '440px',
  },
  submitBtn: {
    backgroundColor: '#fff !important',
    color: '#000 !important',
    fontWeight: '700 !important',
    padding: '12px !important',
    marginTop: '24px !important',
    textTransform: 'none !important',
    fontSize: '15px !important',
    borderRadius: '8px !important',
    '&:disabled': {
      backgroundColor: 'rgba(255,255,255,0.1) !important',
      color: 'rgba(255,255,255,0.3) !important',
    },
    '&:hover': {
      backgroundColor: '#e5e7eb !important',
    }
  },
  link: {
    color: '#2EC4B6',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  termsText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '12px'
  }
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2EC4B6',
    },
    background: {
      paper: '#09090b',
      default: '#000000',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", sans-serif',
  },
});

function Signup(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [pwHelper, setPwHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [checked, setChecked] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    formState.email = formState.email.toLowerCase();

    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });

      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (error) {
      setEmailState(false)
      setEmailHelper('Email already exists. Try logging in.')
    }
  };

  const handleChangePw = (event) => {
    const { name, value } = event.target;
    if (value.length >= 8) {
      setPasswordState(true);
      setPwHelper('');
    } else {
      setPasswordState(false);
      setPwHelper('Min. 8 characters');
    }
    setFormState({ ...formState, [name]: value });
  };

  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    const validEmail = new RegExp(/^([a-zA-Z0-9_.-]+)@([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})$/);
    if (validEmail.test(value)) {
      setEmailState(true);
      setEmailHelper('');
    } else {
      setEmailState(false);
      setEmailHelper('Invalid email format');
    }
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Box className={classes.container}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className={classes.signupCard}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ m: 1, bgcolor: '#2EC4B6', width: 48, height: 48 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Outfit', mt: 1 }}>
              Join CalmPath
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1, textAlign: 'center' }}>
              Create an account to start tracking your mental wellness
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleFormSubmit}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeEmail}
              error={!emailState && formState.email.length > 0}
              helperText={emailHelper}
              margin="normal"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChangePw}
              error={!passwordState && formState.password.length > 0}
              helperText={pwHelper}
            />

            <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(46, 196, 182, 0.05)', borderRadius: '8px', border: '1px solid rgba(46, 196, 182, 0.1)' }}>
              <FormControlLabel
                control={<Checkbox value="legal" color="primary" />}
                label={
                  <Typography sx={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                    I agree to the <Link to='/legal' className={classes.link}>Legal Terms</Link> and data privacy policy.
                  </Typography>
                }
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitBtn}
              disabled={!(emailState && passwordState && checked)}
            >
              Create Account
            </Button>

            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/login" className={classes.link}>
                  Already have an account? <strong>Log in</strong>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Box sx={{ mt: 6 }}>
          <Copyright sx={{ color: 'rgba(255,255,255,0.3)' }} />
        </Box>
      </ThemeProvider>
    </Box>
  )
}
export default Signup;
