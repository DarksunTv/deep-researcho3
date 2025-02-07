import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemText } from '@mui/material';

const drawerWidth = 240;

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GHL Chatbot Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button component={RouterLink} to="/workflows">
            <ListItemText primary="Workflows" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout; 