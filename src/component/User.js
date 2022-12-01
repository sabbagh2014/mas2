import React from "react";
import {
  Grid,
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { sortAddress } from "src/utils";

const useStyles = makeStyles(() => ({
  borderBotm: {
    borderBottom: "1px solid #ccc",
    display: "flex",
    background: "#fff",
    width: "275px",
  },
  
  main: {
    color: "#999",
    background: "#fff",
    cursor: "pointer",
    padding: "10px"
  },
}));

export default function UsersCard({
  users,
  navigate,
  setsearch,
  setIsLoading1,
}) {
  const classes = useStyles();
  const handleCloseFunction = () => {
    navigate("/user-profile/"+users.userName)
    setIsLoading1(false);
    setsearch("");
  };

  return (
    <Box className={classes.main} onClick={handleCloseFunction}>
      <Grid 
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item >
          <Box>
            <figure
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              <img
                src={users.profilePic || `https://avatars.dicebear.com/api/miniavs/${users?.userName}.svg`}
                style={{ height: "45px", width: "45px" }}
              />
            </figure>
            <Typography
              variant="h5"
              component="h4"
              style={{ color: "black" }}
            >
              {users.name
                ? users.name
                : users.userType === "User"
                ? sortAddress(users.walletAddress)
                : sortAddress(users.ethAccount.address)}
            </Typography>
          </Box>
        </Grid>

        <Grid item >
          <Box>
            <Box>
              <Typography variant="h6" component="h6">
                {users.followers.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span" component="span">
                subscribers
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
