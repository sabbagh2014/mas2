import React from "react";

import { Typography, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  LoginBox: {
    position: "relative",
    height: "300px",
    width: "100%",
    "& img": {
      width: "100%",
      height: "100%",
    },
    "& p": {
      fontSize: "12px",
      position: "absolute",
      bottom: "5px",
      textAlign: "center",
      left: "50%",
      transform: "translateX(-50%)",
      width: "90%",
      backgroundColor: "#fff",
      padding: " 5px",
    },
  },
}));

const AuctionCard = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.LoginBox}>
        <img src="/images/images-1.jpg" alt="" />
        <Typography variant="body2" component="p">
          Ends in : 10 days 4 hours 36 minutes 44 seconds
        </Typography>
      </Box>
    </>
  );
};

export default AuctionCard;
