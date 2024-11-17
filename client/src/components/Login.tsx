import { Box, Input } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { loginRequest } from '../service/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const {user, access_token: token} = await loginRequest(email, password);

      dispatch(login({ user, token }));

      localStorage.setItem('token', token);
      navigate('/phishing-table');
    } catch (err) {
      console.error('Error :', err);
    }
  };

  return (
    <Box
      alignItems='center'
      justifyContent='center'
      sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}
    >
      <Input
        id='email'
        type='text'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id='password'
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant='contained' onClick={handleLogin}>Log in</Button>
    </Box>
  );
};

export default Login;
