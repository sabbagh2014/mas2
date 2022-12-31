import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Input,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  cards: {
    border: "solid 0.5px #e5e3dd",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "0 10px",
    position: "relative",
    marginBottom: 16,
    with: "100%",
  },
  NFTbg: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "20px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  },
  contantCard: {
    textAlign: "left",
    position: "relative",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "18px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },
      "& span": {
        color: "#000",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
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
  sublink: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000",
    alignItems: "center",
    paddingBottom: "10px",
    position: "relative",
    "&::after": {
      content: "''",
      height: " 1px",
      width: "70%",
      position: "absolute",
      backgroundColor: "#cccc",
      bottom: "6px",
      maxWidth: "100%",
      left: "50%",
      transform: " translateX(-50%)",
    },
  },
  nftimg: {
    border: " solid 0.5px #e5e3dd",
    // height: "200px",
    width: "100%",
    margin: "10px 0",
    textAlign: "center",
    overflow: "hidden",

    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  },
  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "0",
    top: "4px",
    zIndex: "9",
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #ccc",
      cursor: "pointer",
      "&.active": {
        backgroundColor: "#ccc",
      },
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  changepic: {
    textAlign: "center",
    "& img": {
      width: "80%",
    },
    "& small": {
      position: "relative",
      fontSize: "12px !important",
      "& input": {
        position: "absolute",
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: "0",
      },
    },
  },

  // cs
  PhotoBox: {
    "& img": {
      maxWidth: "100%",
      borderRadius: "15px",
      width: "-webkit-fill-available",
    },
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#141518",
      fontSize: "20px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#707070",
      fontSize: "20px",
      "& span": {
        color: "#141518",
      },
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    width: "100%",
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
  dilogBody: {
    paddingBottom: "30px",
    position: "relative",
    "& small": {
      position: "absolute",
      bottom: " 3px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
    },
  },
  certificateimg: {
    margiBottom: "30px",
    width: "100%",
    height: "auto",
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
    border: " solid 0.5px #e5e3dd",
  },
}));

export default function UsersCard({
  data,
  index,
  setfire,
  isDays,
  updateList,
}) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const more = useRef(null);

  const [anchorEl, setAnchorEl] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [duration, setDuration] = useState(data.duration);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setMoreOpen(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = () => {
    setMoreOpen(false);
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);

  const handleClose3 = () => {
    setOpen3(false);
  };

  const [open5, setOpen5] = useState(false);

  const handleClickOpen5 = () => {
    setAnchorEl(null);
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };
  const [input, setInput] = useState(data.donationAmount);
  const [image, setImage] = useState(
    data ? data.mediaUrl : "images/user-profile.png"
  );
  const [date, setDate] = useState(data.duration);
  const [userImg, setUserImg] = useState(data.mediaUrl);

  const del = async () => {
    axios({
      method: "delete",
      url: Apiconfigs.del,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        _id: data._id,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (updateList) {
            updateList();
          }
          toast.success(res.data.responseMessage);
          setOpen2(false);
          setOpen(false);
        } else {
          toast.error(res.data.responseMessage);
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.response) {
          toast.error(err.response.data.responseMessage);
        } else {
          toast.error(err.message);
        }
        setOpen2(false);
        setOpen(false);
      });
  };

  const edit = async () => {
    if (input === "") {
      toast.error("Please enter some valid amount");

      return;
    }
    if (date === "") {
      toast.error("Please enter a valid date and time");
      return;
    }
    if (!userImg) {
      toast.error("set image");
      return;
    }
    const formData = new FormData();
    formData.append("file", userImg);
    console.log("form", formData);
    await axios({
      method: "PUT",
      url: Apiconfigs.edit,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        _id: data._id,
        donationAmount: input,
        duration: duration,
        mediaUrl: userImg,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (updateList) {
            updateList();
          }
          toast.success("Done");
          setOpen2(false);
          setOpen(false);
          setfire(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const subscribe = async () => {
    if (
      parseFloat(data.donationAmount) < parseFloat(user.userData.masBalance)
    ) {
      await axios({
        method: "GET",
        url: Apiconfigs.subscribeNow + data._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            if (updateList) {
              updateList();
            }
            toast.success("Done");
          } else {
            toast.error("Error");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert("Balance is low");
    }
  };

  const isVideo = data.mediaUrl.includes(".mp4");
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
  return (
    <Box className={classes.cards}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => setMoreOpen(true)}
        className={classes.feedmenu}
        ref={more}
      >
        <FiMoreHorizontal />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={more.current}
        keepMounted
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
      >
        {user.userData && user.userData._id === data.userId && (
          <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
        )}
        <MenuItem onClick={handleClickOpen1}>View</MenuItem>
        {/* <MenuItem onClick={handleClickOpen2}>Subscribe now</MenuItem> */}
      </Menu>

      <Box className={classes.contantCard}>
        <Typography
          variant="h6"
          component="h6"
          style={{
            color: "#792034",
            width: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data.bundleTitle}
        </Typography>
        <Box className={classes.nftimg}>
          {isVideo ? (
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftimg}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video width="400" controls>
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            </Box>
          ) : (
            // <img src={data.mediaUrl} alt="" />
            <Box
              id={`imagecard${data?._id}`}
              className={classes.nftImg}
              style={{
                background: "url(" + data.mediaUrl + ")",
              }}
              onClick={() => {
                navigate('/#auctions')
              }}
            ></Box>
          )}
        </Box>
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: "400" }}
        >
          <span style={{ color: "#707070" }}>Donation amount: </span>
          {data.donationAmount} MAS
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: "400" }}
        >
          <span style={{ color: "#707070" }}>Duration: </span>
          {isDays
            ? data.duration
            : moment(data.duration).format("DD-MM-YYYY hh:mm A")}
          {/* {data.duration} */}
          {}
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: "400" }}
        >
          <span style={{ color: "#707070" }}>Number of subscribers: </span>
          {data.subscriberCount}
        </Typography>
      </Box>

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
              style={{
                color: "#792034",
                margiBottom: "10px",
                width: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.bundleTitle}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label> Donation Amount</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    className={classes.input_fild2}
                    value={input}
                    type="number"
                    onChange={(e) => setInput(e.target.value)}
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
                  <span
                    className={duration === "7 Days" ? "active" : null}
                    onClick={() => setDuration("7 Days")}
                  >
                    7 Days
                  </span>
                  <span
                    className={duration === "14 Days" ? "active" : null}
                    onClick={() => setDuration("14 Days")}
                  >
                    14 Days
                  </span>
                  <span
                    className={duration === "30 Day" ? "active" : null}
                    onClick={() => setDuration("30 Day")}
                  >
                    30 Days
                  </span>
                  <span
                    className={duration === "60 Days" ? "active" : null}
                    onClick={() => setDuration("60 Days")}
                  >
                    60 Days
                  </span>
                  <span
                    className={duration === "1 Year" ? "active" : null}
                    onClick={() => setDuration("1 Year")}
                  >
                    1 Year
                  </span>
                </Grid>
                {/* <Grid item xs={12} md={8} className={classes.donation}>
                  <TextField
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> */}
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
                <input
                  type="file"
                  onChange={(e) => {
                    setUserImg(e.target.files[0]);
                    setImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </small>
              <img src={image} alt="" />
            </Box>
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={4}>
                  <Link style={{ color: "#000" }} onClick={del}>
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
                    onClick={edit}
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
              style={{
                color: "#792034",
                margiBottom: "10px",
                width: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.bundleTitle}
            </Typography>

            <Box align="center" mt={3}>
              <Typography
                variant="h6"
                component="h6"
                style={{
                  color: "#000",
                  fontWeight: "400",
                  width: "auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#707070" }}>Donation amount: </span>
                {data.donationAmount}
                {data && data.coinName ? data.coinName : "MAS"}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>Duration: </span>
                {data.duration}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>Number of subscribers:</span>
                {data.subscriberCount}
              </Typography>
            </Box>

            <Box align="center">
              <label> Services:</label>
              <Typography
                variant="body2"
                componant="p"
                style={{
                  color: "#000",
                  fontSize: "20px",
                  width: "auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.details}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <img src={data.mediaUrl} alt="" />
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
      >
        <DialogContent>
          <Box className={classes.PhotoBox}>
            <img src={data.mediaUrl} alt="" />
          </Box>
          <Box mt={3} className={classes.bundleText} textAlign="center">
            <Typography variant="h4" >
              Bundle {index + 1}
            </Typography>
            <Typography variant="h4">The basic bundle</Typography>
          </Box>

          <Box mt={2} className={classes.deskiText}>
            <Typography variant="h4" align="left" color="textSecondary">
              Donation amount: <span>{data.donationAmount} MAS</span>
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary">
              Duration: <span>{data.duration}</span>
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
                  style={{
                    width: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.details}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={3} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={subscribe}
            >
              Subscribe now
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* enter amount */}

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
                  <InputAdornment position="end">Select a token</InputAdornment>
                }
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
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
                onClick={handleClickOpen5}
              >
                Donate now
              </Button>
            </Box>
            <small>ETH fees and ETH fees and apply. apply.</small>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* certificate */}

      <Dialog
        open={open5}
        fullWidth="md"
        maxWidth="md"
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.certificate}>
          <img src="/images/img.png" className={classes.certificateimg} alt="" />
          <Box
            mt={2}
            mb={4}
            style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }}
          >
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleClickOpen1}
            >
              download <FiDownload />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
