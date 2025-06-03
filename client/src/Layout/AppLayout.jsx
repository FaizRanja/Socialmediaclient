import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Profile from '../Components/profile/Profile';
import Home from '../Components/Home/Home';

const AppLayout = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: { xs: 2, md: 5 },
        py: 3,
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3}>

        {/* Left Sidebar - Profile */}
        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              position: 'sticky',
              top: 20,
              maxHeight: '80vh',
              overflowY: 'auto',
              minWidth: 180,
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2} textAlign="center">
              Profile
            </Typography>
            <Profile />
          </Paper>
        </Grid>

        {/* Center - Home Feed */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2} textAlign="center">
              Home Feed
            </Typography>
            <Home />
          </Paper>
        </Grid>

        {/* Right Sidebar - Chat */}
        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              position: 'sticky',
              top: 20,
              maxHeight: '80vh',
              overflowY: 'auto',
              minWidth: 180,
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2} textAlign="center">
              Chat
            </Typography>
            <Typography align="center">No new messages</Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default AppLayout;
