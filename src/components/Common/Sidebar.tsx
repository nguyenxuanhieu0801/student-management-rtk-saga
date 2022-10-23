import { Dashboard, PeopleAlt } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const sidebarLinks: {
  title: string;
  url: string;
  [key: string]: any;
}[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'Students',
    url: '/admin/students',
    icon: <PeopleAlt />,
  },
];

export function Sidebar() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav className="sidebar" aria-label="main dashboard student">
        <List>
          {sidebarLinks.map((item, index) => (
            <NavLink key={index} to={item.url}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </nav>
    </Box>
  );
}
