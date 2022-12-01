import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts";

export const routes = [

  {
    path: "/",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Home/Main")),
  },

  {
    path: "/login",
    element: lazy(() =>
      import("src/views/pages/UserSignUp/login")
    ),
  },
  {
    path: "/create-account",
    element: lazy(() =>
      import("src/views/pages/UserSignUp/register")
    ),
  },
  
  {
    path: "/user-list",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/UsersList")),
  },
  {
    path: "/creators",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/Searchresult")),
  },
 
  {
    path: "/chat",
    element: () => <Navigate to="/chat/t" />,
  },

  {
    path: "/chat/:chatId",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Chat/index")),
  },

  {
    path: "/profile",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/index")),
  },
  {
    path: "/profilesettings",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/ProfileSetting")),
  },
  {
    path: "/user-profile/:username",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Users/UserProfile")),
  },
  {
    path: "/bundles",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/AllBundles")),
  },
  {
    path: "/bundles-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Bundles/BundleDetails")
    ),
  },
  {
    path: "/auctions",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Auctions")),
  },
  {
    path: "/share-audience",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/ShareAudience")),
  },
  
  
  {
    path: "/refferal",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/UserSignUp/Refferal")),
  },
  {
    path: "/favorite",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Home/Favorite")),
  },
  {
    path: "/corporate/:pageName",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/staticPage")),
  },

  {
    path: "/404",
    element: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    path: "*",
    element: () => <Navigate to="/404" />,
  },
];
