import React from "react";
import { Box, Typography, makeStyles, Grid } from "@material-ui/core";
import BundleCard from "src/component/NewBundleCard";
import UserDetailsCard from "src/component/UserCard";
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles(() => ({
  subscriptionBox: {
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "20px",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  LoginBox: {
    paddingTop: "20px",
    marginLeft: "25px",
    marginRight: "15px",
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#000",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
}));

export default function Subscriptions({
  subscriptions,
  userList,
}) {
  const classes = useStyles();

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    centerMode: false,
    autoplay: false,
    autoplaySpeed: 3000,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
    ],
  };

  return (
    <div className={classes.subscriptionBox}>
      <Box className={classes.LoginBox} mb={5}>
        <Box className={classes.masBoxFlex}>
          <Typography variant="h6">Bundles</Typography>
        </Box>
        <Box>
          
          <Carousel centerMode={true} centerSlidePercentage={25} numItemsPerView={4}>
            {subscriptions.map((data, i) => {
              return (
                <BundleCard
                  data={data}
                  key={i}
                  index={i}
                />
              );
            })}
          </Carousel>
        </Box>
      </Box>
      <Box className={classes.LoginBox} mb={5}>
        <Box className={classes.masBoxFlex}>
          <Typography variant="h6">Users</Typography>
        </Box>
        <Box>
          <Grid container>
            {userList.map((data, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <UserDetailsCard
                    data={data}
                    index={i}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
