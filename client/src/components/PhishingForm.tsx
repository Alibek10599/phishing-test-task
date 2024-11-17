import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { sendPhishingEmail } from '../service/phishingApi';

const PhishingAttemptForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = () => {
    if (validateEmail(email)) {
       sendPhishingEmail(email);
      console.log(`Trigger phishing attempt for: ${email}`);
      setEmail('');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Phishing Simulation
      </Typography>
      <TextField
        fullWidth
        label="Recipient Email"
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        error={emailError}
        helperText={emailError ? 'Please enter a valid email address.' : ''}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!email || emailError}
      >
        Trigger Phishing Attempt
      </Button>
    </Box>
  );
};

export default PhishingAttemptForm;
