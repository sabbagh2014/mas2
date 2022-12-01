import React, { createContext, useEffect, useState, } from "react";
import Apiconfigs, { baseURL } from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import { Navigate } from "react-router-dom";
import io from 'socket.io-client';

const UserContext = createContext();

function checkLogin() {
  const accessToken = sessionStorage.getItem("token");
  return accessToken ? true : false;
}

const setTokenSession = async (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};

const UserContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [unReadNotification, setUnReadNotification] = useState(0);
  const [notifyData, setNotifyData] = useState([]);
  const [connected, setIsConnected] = useState(false);

  const [unreadChats, setUnReadChats] = useState({});
  const [search, setsearch] = useState("");
  const [userEarnings, setUserEarnings] = useState({});
  const [userProfileData, setUserProfileData] = useState({
    username: "",
    useremail: "",
    userbio: "",
    userprofile: "",
    usercover: "",
    userprofileurl: "",
    usercoverurl: "",
    name: "",
    speciality: "",
  });
  const [link, setlink] = useState({
    useryoutube: "",
    usertwitter: "",
    userfacebook: "",
    usertelegram: "",
  });


  const getProfileDataHandler = async () => {
    try {
      console.log('feching user data ...')
      const res = await axios({
        method: "GET",
        url: Apiconfigs.profile,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.userDetails.blockStatus === true || res.data.userDetails.status === 'BLOCK') {
          setIsLogin(false);
          setTokenSession(false);
          setUserData();
          setUserProfileData();
          sessionStorage.removeItem("token");
          sessionStorage.clear();
          Navigate('/login');
        }
        setUserData({ ...res.data.userDetails });
        setUserProfileData({
          ...userProfileData,
          name: res?.data?.userDetails?.name,
          speciality: res?.data?.userDetails?.speciality,
          username: res?.data?.userDetails?.userName,
          useremail: res?.data?.userDetails?.email,
          userurl: res?.data?.userDetails?.masPageUrl,
          userbio: res?.data?.userDetails?.bio,
          userprofilepic: res?.data?.userDetails?.profilePic,
          usercover: res?.data?.userDetails?.coverPic,
          userprofileurl: "",
          usercoverurl: "",
        });
        setlink({
          ...link,
          useryoutube: res?.data?.userDetails?.youtube,
          usertwitter: res?.data?.userDetails?.twitter,
          userfacebook: res?.data?.userDetails?.facebook,
          usertelegram: res?.data?.userDetails?.telegram,
        });
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalEarningsHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.totalEarnings,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setUserEarnings(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      
      getProfileDataHandler();
      getTotalEarningsHandler();
      const notifySocket = io(baseURL + '/notifications', {
        forceNew: true,
        auth: {
          token: sessionStorage.getItem("token")
        },
      });

      notifySocket.on('connect', () => {
        setIsConnected(true);
      });
  
      notifySocket.on('disconnect', () => {
        setIsConnected(false);
      });

      notifySocket.on('notification', (notifications) => {
        if (notifications && Array.isArray(notifications)) {
          setUnReadNotification(prev => prev + notifications.length);
          setNotifyData(prev => [...notifications.reverse(), ...prev]);
        }
      });
      
    }

  }, [isLogin]);

  let data = {
    unReadNotification,
    setUnReadNotification,
    unreadChats,
    setUnReadChats,
    userLoggedIn: isLogin,
    userEarnings,
    setsearch,
    search,
    link,
    userProfileData,
    notifyData,
    updateUserStateData: (data) => {
      setUserProfileData({
        ...userProfileData,
        name: data.name,
        speciality: data.speciality,
        username: data.username,
        useremail: data.useremail,
        userurl: data.userurl,
        userbio: data.userbio,
        userprofile: data.profile,
        usercover: data.cover,
        userprofileurl: data.profileurl,
        usercoverurl: data.coverurl,
      });
    },
    userlink: (data) => {
      setlink({
        ...link,
        useryoutube: data.youtube,
        usertwitter: data.twitter,
        userfacebook: data.facebook,
        usertelegram: data.telegram,
      });
    },
    isLogin,
    connected,
    userData,
    logOut: () => {
      setIsLogin(false);
      setTokenSession(false);
      setUserData();
      setUserProfileData();
      sessionStorage.removeItem("token");
      sessionStorage.clear();
    },
    updatetoken: async (token) => {
      setTokenSession(token);
      await getProfileDataHandler();
      setIsLogin(true);
    },
    updateUserData: async () => await getProfileDataHandler(),
  };

  return (
    <UserContext.Provider value={data}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserContextProvider }
