import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Formik, Form } from 'formik';
import Card from '@mui/material/Card';
import { Box, Button, CardContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/login';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const LogIn = async (username: string, password: string): Promise<void> => {
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch(
        (process.env.REACT_APP_URL as string) + '/login',
        {
          method: 'POST',
          headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY as string,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const responseData = await response.json();
      console.log(responseData);
      localStorage.setItem('access_token', responseData.access_token);
      localStorage.setItem(
        'token_expiration',
        new Date(
          new Date().getTime() + responseData.expires_in * 1000,
        ).toString(),
      );
      loginContext?.signIn();
      navigate('/admin-my-articles');
      console.log(localStorage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div>
        <Card
          sx={{
            maxWidth: 368,
            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.175)',
          }}
          className="card"
        >
          <CardContent sx={{ padding: '2rem' }}>
            <h3>Log In</h3>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={ValidationSchema}
              onSubmit={async ({ username, password }) => {
                LogIn(username, password);
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <TextField
                    label="Email"
                    fullWidth
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="me@example.com"
                    sx={{ marginBottom: '1.5rem' }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="**********"
                    sx={{ marginBottom: '1.5rem' }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" type="submit">
                      Log In
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
export default Login;
