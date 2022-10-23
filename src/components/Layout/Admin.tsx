import { Box, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header, PrivateRoute, Sidebar } from '../Common';

export const AdminLayout = () => {
  const theme = createTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          gridArea: 'header',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          gridArea: 'sidebar',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          gridArea: 'main',
          backgroundColor: 'background.paper',
          padding: theme.spacing(2, 3),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
