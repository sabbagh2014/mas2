import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Badge,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles(() => ({
  token: {
    textAlign: "center",
    padding: "20px 0",
    "& p": {
      fontSize: "14px",
      fontWeight: "500",
      lineHight: "20px",
      color: "#000",
    },
    "& img": {
      marginTop: "5px",
    },
  },
  // feedBox: {
  //   border: "solid 0.5px #e5e3dd",
  //   boxShadow: "0px 1px 6px #0000000d",
  //   transform: "translate(2%, -2%)",
  //   fontFamily: 'adobe-clean", sans-serif',
  //   padding: "20px",
  //   borderRadius: "15px",

  //   marginLeft: "-10%",
  //   // position: "relative",
  //   "& p": {
  //     fontSize: "14px",
  //     marginTop: "15px",
  //   },
  // },
  cards: {
    filter: "blur(4px)",
    border: "solid 0.5px #c9c7c3",
    width: "270px",
    // backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "0 10px",
    position: "relative",
    backgroundImage:
      "linear-gradient(45deg, #eef2f3 90%,#8e9eab 30%, #eef2f3 90%)",
    margin: "8px",
    width: "90%",
    "&:hover": {
      transform: "scale(1.03)",
      transition: "all 0.4s ease-in-out 0s",
    },
  },
  feedpost: {
    marginTop: "8px",
  },
  imageClass: {
    width: "100%",
    height: "300px",
    "@media(max-width:768px)": {
      width: "100%",
    },
  },
  LikeBox: {
    fontSize: "20px",
    cursor: "pointer",
  },
  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  blurBox: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: "9",
    display: "flex",
    justifyContent: " center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: " #141518",
    backgroundColor: "#ffffff80",
    "& span": {
      color: "#f26a6a",
    },
  },
  img: {
    position: "absolute",
    width: "5%",
    marginLeft: "5px",
  },
  downloadButton: {
    maxWidth: "100px",
    backgroundColor: "#a33748",
    borderRadius: "33px",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  nftImg: {
    width: "100%",
    // height: "165px",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    // borderRadius: "40px 40px 10px 10px",
    // borderRadius: "18px",
    backgroundColor: "#ccc !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "350px",
  },
}));

export default function UsersCard({ data, index, updateList, allFeed }) {
  const responseMessage = allFeed?.private?.responseMessage;
  const [open3, setOpen3] = React.useState(false);
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const classes = useStyles();

  const updateDimensions = () => {
    if (data?._id) {
      let offsetWidth = document.getElementById(
        "imagecard" + data?._id
      ).offsetWidth;
      let newoofsetWidth = offsetWidth - 60;
      document.getElementById("imagecard" + data?._id).style.height =
        newoofsetWidth + "px";
    }
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const isVideo = data.mediaUrl.includes(".mp4");
  const [isLoading, setIsloading] = useState(false);
  const userId =
    typeof data.userId === "object" &&
    !Array.isArray(data.userId) &&
    data.userId !== null
      ? data.userId._id
      : data.userId;
  let isUserSubscribed = false;

  const subscribeNowHandler = async (isCheck) => {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + data.nftId[0]._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          auth.updateUserData();
          navigate("/profile");
          toast.success("You have subscribed successfully");
          setOpen3(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error("Something went wrong");
      });
    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  return (
    <>
      <Box style={{ position: "relative" }}>
        <Box className={classes.cards}>
          <Box className={classes.feedBox}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <figure>
                  <img
                    src={
                      data && data.userId && data.userId.profilePic
                        ? data.userId.profilePic
                        : "images/user-profile.png"
                    }
                    alt=""
                  />
                </figure>
                <div>
                  
                  <Typography
                    variant="h6"
                    style={{ marginBottom: "0", fontWeight: 500 }}
                  >
                    {data.userId.name}
                    <img src="/images/blue-check.png" className={classes.img} />
                  </Typography>
                  <Typography variant="body" component="small">
                    since {moment(data.createdAt).format("DD-MM-YYYY HH:mm")}
                  </Typography>
                </div>
              </Box>
            </Box>
            <Typography
              variant="h6"
              style={{
                marginBottom: "-10px",
                fontWeight: 500,
                wordBreak: "break-all",
              }}
            >
              {data?.nftId[0]?.bundleName}
            </Typography>
            <Typography
              variant="h6"
              style={{ marginBottom: "-10px", fontWeight: 500 }}
            >
              {data?.title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{
                fontWeight: 400,
                fontSize: "13px",
                color: "#3f3f3",
                marginTop: "8px",
              }}
            >
              {data?.details}
            </Typography>
            <Box className={classes.feedpost}>
              {isVideo ? (
                <Box updateList>
                  <video controls style={{ width: "100%", height: "300px" }}>
                    <source src={data?.mediaUrl} type="video/mp4" />
                  </video>
                  <Button className={classes.downloadButton} fullWidth>
                    Download
                  </Button>
                </Box>
              ) : (
                // <img className={classes.imageClass} src={data?.mediaUrl} />
                <Box
                  id={`imagecard${data._id}`}
                  className={classes.nftImg}
                  style={{
                    background: "url(" + data?.mediaUrl + ")",
                  }}
                  
                ></Box>
              )}
            </Box>
            <Box>
              <IconButton>
                <FaHeart
                // style={isLike ? { color: "#d15b5b" } : {}}
                // onClick={() => likeDislikeFeedHandler(data._id)}
                />
              </IconButton>
              &nbsp;
              <Badge
                style={{ marginTop: "-4px" }}
                // badgeContent={nFormatter(parseFloat(data.likesCount), 1)}
              ></Badge>
              &nbsp;<span>Likes</span>
            </Box>
          </Box>
        </Box>
        <Box style={{ position: "absolute", top: "50%", left: "10%" }}>
          <Typography style={{ color: "#e3e3e1", fontWeight: "500" }}>
            {responseMessage}
          </Typography>
          <Button
            style={{ left: "19%" }}
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => setOpen3(true)}
          >
            Subscribe now
          </Button>
        </Box>
      </Box>

      {open3 && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open3}
          onClose={() => setOpen3(false)}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            <Box className={classes.PhotoBox}>
              {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={data?.nftId[0]?.mediaUrl} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <img
                  src={data?.nftId[0]?.mediaUrl}
                  alt=""
                  style={{ height: "368px", width: "553px" }}
                />
              )}
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" >
                {data?.nftId[0]?.bundleName}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Typography variant="h4" align="left" color="textSecondary">
                Donation amount:
                <span>
                  {data?.nftId[0]?.donationAmount} {data.coinName}
                </span>
              </Typography>
              <Typography variant="h4" align="left" color="textSecondary">
                Duration: <span> {data?.nftId[0]?.duration}</span>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={2}>
                  <Typography variant="h4" align="left" color="textSecondary">
                    Details:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                  <Typography
                    variant="body2"
                    align="left"
                    color="textSecondary"
                  >
                    {data?.nftId[0]?.bundleTitle}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== data.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      setOpen3(false);
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={subscribeNowHandler}
                        // onClick={() => {
                        //   if (auth?.userData.userType === "User") {
                        //     subscribeNowBlockchainHandler(data);
                        //   } else {
                        //     subscribeNowHandler(true);
                        //   }
                        // }}
                        // disabled={isLoading}
                      >
                        Subscribe Now
                        {/* {isLoading ? "pending..." : "Subscribe now"}
                        {isLoading && <ButtonCircularProgress />} */}
                      </Button>
                    )}
                </Box>
              )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
