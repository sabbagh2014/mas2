import React from "react";
import {
  Box,
  makeStyles,
} from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import SuspendCard from "src/component/SuspendCard";

const useStyles = makeStyles(() => ({
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
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
}));

export default function Login({ data }) {
  const settings = {
   
    };
  const classes = useStyles();
  return (
    <Box className={classes.LoginBox}>
      <Carousel centerMode={true} centerSlidePercentage={25} numItemsPerView={4}>
        {data &&
          data.map((data, i) => {
            return <SuspendCard data={data} key={i} />;
          })}
      </Carousel>
    </Box>
  );
}
