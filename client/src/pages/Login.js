// import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import * as React from 'react';
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
  loginCard: {
    backgroundColor: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '400px',
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

function Login(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [pwHelper, setPwHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [checked, setChecked] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    formState.email = formState.email.toLowerCase();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      setEmailState(false)
      setEmailHelper('No account found with these credentials!')
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
    const validEmail = new RegExp(/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/);
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
        <div className={classes.loginCard}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: '#2EC4B6', width: 48, height: 48 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Outfit', mt: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1 }}>
              Enter your details to access your dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleFormSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              onChange={handleChangeEmail}
              error={!emailState && formState.email.length > 0}
              helperText={emailHelper}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={handleChangePw}
              error={!passwordState && formState.password.length > 0}
              helperText={pwHelper}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={<Typography sx={{ fontSize: '13px' }}>Remember me</Typography>}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitBtn}
            >
              Sign In
            </Button>

            <Grid container sx={{ mt: 3, textAlign: 'center' }}>
              <Grid item xs={12}>
                <Link to="/signup" className={classes.link}>
                  Don't have an account? <strong>Sign Up</strong>
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
  );
}

export default Login;