import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';
export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Student Managent
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
