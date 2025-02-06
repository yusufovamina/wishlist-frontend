import React from 'react';
import { Container, Typography } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Login
      </Typography>
      <AuthForm onLogin={handleLogin} />
    </Container>
  );
};

export default LoginPage;