import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
//import clsx from 'clsx';
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  InputAdornment,
  Input,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,

} from "@material-ui/core";

import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ButtonCircularProgress from "./ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 10,
    textAlign: 'left'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: "pointer",
  },
  expand: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 10px',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  
  avatar: {
    backgroundColor: red[500],
    cursor: 'pointer',
  },
}));

export default function BundleCard({ data }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useContext(UserContext);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  let BundleData = data.bundleDetails || data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen2 = () => {
    setOpenSubscribe(false);
    setOpen2(true);
  };
  let userId =
  typeof BundleData.userId === "object" &&
  !Array.isArray(BundleData.userId) &&
  BundleData.userId !== null
    ? BundleData.userId._id
    : BundleData.userId;
  let userName = BundleData.userId.userName || BundleData.userDetail.userName;
  let profilePic = BundleData.userId.profilePic || BundleData.userDetail.profilePic || 
  `https://avatars.dicebear.com/api/miniavs/${userName}.svg`;
  let isVideo = BundleData.mediaUrl.includes(".mp4");

  const subscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + BundleData._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {

          setisSubscribed(res.data.result.subscribed == "yes");
          setnbSubscribed(res.data.result.nb);

          setOpen2(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error(err?.response?.data?.responseMessage);
      });
  };
  const unSubscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + BundleData?._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setIsloading(false);
          toast.success("You have unsubscribed successfully.");
          setisSubscribed(false);
          setnbSubscribed((nb)=>nb-1);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const likeDislikeNfthandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeNft + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setisLike((liked)=>!liked);
          setnbLike((nb)=> isLike ? nb-1 : nb+1)
        } else {
          setisLike(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
      
    } else {
      toast.error("Please login");
    }
  };

  const downLoadFile = () => {
    saveAs(BundleData?.mediaUrl);
  };

  useEffect(()=>{
    setnbLike(BundleData.likesUsers.length);
    setnbSubscribed(BundleData.subscribers.length);
    if (auth.userData?._id) {
      setisLike(BundleData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(BundleData.subscribers?.includes(auth.userData._id));
    }
  },[])

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar 
            aria-label="user" 
            alt={userName} 
            src={profilePic} 
            className={classes.avatar}
            onClick={() => {
              navigate("/user-profile/"+userName)
            }}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={BundleData.bundleName}
        subheader={new Date(BundleData.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}
      />
      <CardMedia
        className={classes.media}
        image={BundleData.mediaUrl}
        title={BundleData.bundleName}
        onClick={() =>
          navigate("/bundles-details?"+BundleData?._id)
        }
      />
      <CardContent>
      <Typography
          variant="h5"
          component="h5"
          style={{ color: "#000", fontWeight: "400" }}
        >
          {BundleData?.donationAmount ? BundleData?.donationAmount : "Any amount"}
          {BundleData && BundleData.coinName ? BundleData.coinName : "MAS"} {" for "}
          {BundleData?.duration ? BundleData?.duration : "Ever"}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {BundleData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
        onClick={() => likeDislikeNfthandler(BundleData._id)}
        >
          <FavoriteIcon style={isLike ? { color: red[800] } : {color: red[200]}} />
        </IconButton>
        <span>{nbLike}</span>
        {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== userId &&
              isSubscribed && (
                <Button className={classes.expand} onClick={handleClickOpen2}> Renew </Button>
              )}

            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== userId &&
              isSubscribed && (
                <Button className={classes.expand} onClick={unSubscribeToBundleHandler}>
                  Unsubscribe
                </Button>
              )}
            {
              auth?.userData?._id !== userId && !isSubscribed && (
                <Button className={classes.expand} onClick={handleClickOpen2}>
                  Subscribe
                </Button>
              )
            }
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id === userId && (
                <Button
                  className={classes.expand}
                  onClick={() =>
                    navigate("/bundles-details?"+BundleData?._id)
                  }
                >
                  View
                </Button>
              )}
      </CardActions>

      {/* edit */}
        <Dialog
          open={open}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#792034", margiBottom: "10px" }}
              >
                {BundleData.bundleTitle}
              </Typography>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label> Donation Amount</label>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      id="standard-basic"
                      placeholder="30"
                      className={classes.input_fild2}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box
                style={{
                  paddingBotton: "10px",
                  borderBottom: "solid 0.5px #e5e3dd",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <label> Duration</label>
                  </Grid>
                  <Grid item xs={12} md={8} className={classes.donation}>
                    <span>7 Days</span>
                    <span>14 Days</span>
                    <span>30 Days</span>
                    <span>60 Days</span>
                    <span>1 Year</span>
                    <span>Forever</span>
                  </Grid>
                </Grid>
              </Box>

              <Box align="center">
                <label> Services:</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  I will send you a special video every <br />
                  month specially for you! (edit)
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <small>
                  Change/upload a photo or video
                  <input type="file" />
                </small>
                <img src="/images/Rectangle.png" alt="" />
              </Box>
              <Box mt={4}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item md={4}>
                    <Link style={{ color: "#000" }} onClick={handleClose}>
                      Delete this bundle
                    </Link>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={handleClose}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      {/* view */}
        <Dialog
          open={open1}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#792034", margiBottom: "10px" }}
              >
                Bundle I
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
              >
                
                My basic supporter
              </Typography>

              <Box align="center" mt={3}>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>Donation amount: </span>10
                  MAS
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>Duration: </span>One month
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  style={{ color: "#000", fontWeight: "400" }}
                >
                  <span style={{ color: "#707070" }}>
                    Number of subscribers:
                  </span>
                  100
                </Typography>
              </Box>

              <Box align="center">
                <label> Services:</label>
                <Typography
                  variant="body2"
                  componant="p"
                  style={{ color: "#000", fontSize: "20px" }}
                >
                  I will send you a special video every <br />
                  month specially for you!
                </Typography>
              </Box>
              <Box mt={2} className={classes.changepic}>
                <img src="/images/Rectangle.png"  alt=""/>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      {/* Subscribe now */}
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open2}
          onClose={handleClose2}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            <Box className={classes.PhotoBox}>
              {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={BundleData.mediaUrl} type="video/mp4" />
                  </video>
                  {auth.userData &&
                    auth.userLoggedIn &&
                    auth.userData._id !== userId &&
                    isSubscribed && (
                      <Box>
                        <Grid
                          lg={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className={classes.downloadButton}
                            fullWidth
                            onClick={downLoadFile}
                          >
                            Download
                          </Button>
                        </Grid>
                      </Box>
                    )}
                </div>
              ) : (
                <img
                  src={BundleData.mediaUrl}
                  alt=""
                />
              )}
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4">
                {BundleData.bundleTitle}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Typography variant="h4" align="left" color="textSecondary">
                Donation amount:
                <span>
                  {BundleData.donationAmount} {BundleData.coinName}
                </span>
              </Typography>
              <Typography variant="h4" align="left" color="textSecondary">
                Duration: <span> {BundleData.duration}</span>
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
                    {BundleData?.details}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            {!auth.userLoggedIn && (
              <Box mt={3} mb={3} textAlign="center">
                
                <Button className={classes.LoginButton} onClick={handleClose2}>
                  Cancel
                </Button>
                &nbsp;&nbsp;
                <Button
                  className={classes.LoginButton}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            {auth.userData &&
              auth.userLoggedIn &&
              auth.userData._id !== data.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      handleClose2();
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
                        onClick={subscribeToBundleHandler}
                        
                        disabled={isLoading}
                      >
                        {isLoading ? "pending..." : "Subscribe now"}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    )}
                </Box>

                
              )}
          </DialogContent>
        </Dialog>

        <Dialog
          open={open3}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent className={classes.dilogBody}>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
                Enter an amount
              </Typography>
              <Box mt={4}>
                <Input
                  placeholder="300"
                  className={classes.input_fild2}
                  endAdornment={
                    <InputAdornment position="end">
                      Select a token
                    </InputAdornment>
                  }
                />
              </Box>

              <Box mt={4}>
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: "#000" }}
                >
                  Send a message
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  className={classes.input_fild}
                  defaultValue="Default Value"
                  variant="outlined"
                />
              </Box>
              <Box mt={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Donate now
                </Button>
              </Box>
              <small>ETH fees and ETH fees and apply. apply.</small>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      
    </Card>
  );
}
