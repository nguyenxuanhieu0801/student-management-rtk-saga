import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface ILoginPageProps {}

const schema = yup
  .object({
    username: yup.string().required('Please enter username.').min(6, 'Username must be at least 6'),
    password: yup.string().required('Please enter name.').min(6, 'Password must be at least 6'),
  })
  .required();

const LoginPage = (props: ILoginPageProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{
    username: string;
    password: string;
  }>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Boolean(localStorage.getItem('access_token'))) return navigate('/admin/dashboard');
  }, []);

  const handleFormSubmit = async (formValues: { username: string; password: string }) => {
    const newValue = { ...formValues };
    newValue.username = newValue.username.trim();
    newValue.password = newValue.username.trim();

    if (newValue.username === 'demo123' && newValue.password === 'demo123') {
      dispatch(authActions.login(newValue));
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } else {
      toast.error('Failed to login');
    }
  };

  if (Boolean(localStorage.getItem('access_token'))) return null;

  return (
    <Stack minHeight="100vh" direction="row" justifyContent="center" alignItems="center">
      <Paper
        sx={{
          padding: 2,
        }}
        elevation={1}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Login Form
        </Typography>

        <Box maxWidth={400}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField name="username" control={control} label="Username" />
            <InputField name="password" type="password" control={control} label="Password" />
            <Box mt={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting && <CircularProgress size={16} color="primary" />}
                &nbsp;Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Typography variant="subtitle1" component="h2" textAlign="center" mt={2}>
          Username: demo123 - Password: demo123
        </Typography>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
