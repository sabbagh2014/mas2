import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from 'src/context/User';

export default function AuthGuard(props) {
  const { children } = props;
  const auth = useContext(UserContext);
  // const profileNotComplete = () => {
  //   console.log('name', auth.userData.name)
  //   console.log('bio',auth.userData.bio)
  //   console.log('pfp',auth.userData.profilePic)
  //   return !auth.userData.name || !auth.userData.bio || !auth.userData.profilePic
  // }
  if (!auth.userLoggedIn) {
    return <Navigate to="/login" />;
  }
  // if (profileNotComplete) {
  //   return <Navigate to="/profilesettings" />;
  // }

  return <>{children}</>;
}


