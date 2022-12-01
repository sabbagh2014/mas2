import React from 'react';
import { Box } from '@material-ui/core';
import Profile from './Profile';
import UserProfileTabs from './Tabs';

export default function UserProfile() {
  return (
    <Box>
      <Profile />
      <UserProfileTabs />
    </Box>
  );
}
