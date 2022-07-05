import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
// components
import { registerUser } from '../firebase/request';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    registerUser(email, password);
    // navigate('/dashboard', { replace: true });
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} required/>

        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button fullWidth size="large" type="submit" variant="contained">
          Register
        </Button>
      </Stack>
    </form>
  );
}
