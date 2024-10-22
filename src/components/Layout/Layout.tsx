import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  marginRight: theme.spacing(3),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Copyright © 2024 Netronix, Inc. All rights reversed.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
