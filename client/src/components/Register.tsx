import { Box, Input, Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { registrationRequest } from '../service/authApi';
import { AlertColor } from '@mui/material/Alert';
import { login } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const { user, access_token: token} = await registrationRequest(username, email, password);

      setAlertSeverity('success');
      setAlertMessage(`Successfully registered as ${user.username}`);
      setAlertOpen(true);

      dispatch(login({ user, token }));

      localStorage.setItem('token', token);
      
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setAlertSeverity('error');
      setAlertMessage('Registration failed. Please try again.');
      setAlertOpen(true);
      console.error('Error:', err);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      alignItems='center'
      justifyContent='center'
      sx={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: 2, maxWidth: 400, margin: 'auto' }}
    >
      <Input
        id='username'
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id='email'
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' onClick={handleRegister}>
        Register
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
