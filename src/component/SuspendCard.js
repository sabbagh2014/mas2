import React from "react";
import {
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cards: {
    border: "solid 0.5px #cbc8bf",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0px 0px 10px",
  },
  NFTbg: {
    width: "100%",
    height: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "20px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  },
  contantCard: {
    textAlign: "left",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "14px !important",
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
      "@media(max-width:821px)": {
        fontSize: "10px !important",
      },
    },
    "& p": {
      fontSize: "12px",
    },
  },
  contantCard2: {
    textAlign: "left",
    position: "relative",
    paddingTop: "10px",
    borderTop: "solid 0.5px #707070",
    "&::after": {
      position: "absolute",
      border: " solid 0.5px #707070",
      content: "''",
      left: "50%",
      top: "0",
      transform: "translatex(-50%)",
    },
  },
  btnBox: {
    display: "flex",
    alignItems: "center",
    "& button": {
      fontSize: "8px !important",
    },
  },
}));

export default function UsersCard({ data }) {
  const classes = useStyles();

  return (
    <Box className={classes.cards}>
      <Box className={classes.contantCard}>
        <Typography
          variant="h6"
          component="h6"
          style={{
            color: "#792034",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "auto",
          }}
        >
          {data.bundleTitle}
        </Typography>
        <Typography variant="h6" component="h6" style={{ color: "#000" }}>
          {data.donationAmount}
          {` `}
          <span style={{ color: "#707070", fontWeight: "bold" }}>
            {data.coinName}
          </span>
        </Typography>
        <Typography variant="h6" component="h6" style={{ color: "#000" }}>
          <span style={{ color: "#707070", fontWeight: "bold" }}>
            duration
          </span>
          {data.duration}
        </Typography>
        <Typography
          style={{
            color: "#000",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "auto",
          }}
        >
          
          {data.details}
        </Typography>
        <Box className={classes.NFTbg}>
          {data.mediaUrl && (
            <img
              style={{ width: "100%", height: "140px" }}
              height="100"
              src={data.mediaUrl}
              alt=""
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
