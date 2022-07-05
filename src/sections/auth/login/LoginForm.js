import { useState } from 'react';
// @mui
import { Link, Stack, TextField, Button } from '@mui/material';
// components
import { loginUser } from '../firebase/request';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(email,password);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField type="email" name="email" label="Email address" onChange={e => setEmail(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}
