import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import Suspend from "./Suspend";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import DataLoading from "./DataLoading";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import NoDataFound from "./NoDataFound";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(() => ({
  cards: {
    // border: "solid 0.5px #e5e3dd",
    border: "solid 5px #e5e3dd",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    margin: "0 10px",
    boxShadow: "0px 1px 6px #707070",
    // transform: "translate(2%, -2%)",
    fontFamily: 'adobe-clean", sans-serif',
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
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "14px !important",
      "@media(min-width:799px) and (max-width:1081px)": {
        fontSize: "10px !important",
      },
      "@media(min-width:449px) and (max-width:580px)": {
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
      width: "60%",
      position: "absolute",
      backgroundColor: "#cccc",
      bottom: "5px",
      maxWidth: "100%",
      left: "40%",
      transform: " translateX(-50%)",
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      width: "1100px",
      minWidth: "300px",
      maxWidth: "100%",
    },
    "& .makeStyles-paper-70": {
      width: "1100px",
      minWidth: "300px",
      maxWidth: "100%",
    },
  },
  bttn: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function UsersCard({ data, index, likeDislikeNfthandler }) {
  const classes = useStyles();
  const [openBlock, setOpen1] = React.useState(false);
  const [selectedUserID, setselectedUserID] = React.useState("");
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <Box className={classes.cards}>
      {openBlock && selectedUserID && (
        <SubscribtionsCardPopup
          openBlock={openBlock}
          handleClose1={handleClose1}
          selectedUserID={selectedUserID}
        />
      )}
      {/* <Link to="/"> */}
      <Box
        className={classes.sublink}
        onClick={() => {
          if (data.bundleDetails[0] && data.bundleDetails[0].userId) {
            setselectedUserID(data.bundleDetails[0].userId);
            handleClickOpen1();
          }
        }}
      >
        <Typography
          variant="h3"
          style={{
            textOverflow: "ellipsis",

            whiteSpace: "nowrap",
            width: "auto",
          }}
        >
          {data &&
          data.bundleDetails[0] &&
          data.bundleDetails[0].userId &&
          data.bundleDetails[0].userId.name
            ? data.bundleDetails[0].userId.name
            : data.name}
        </Typography>
        <figure>
          <img
            src={
              data &&
              data.bundleDetails[0] &&
              data.bundleDetails[0].userId &&
              data.bundleDetails[0].userId.profilePic
                ? data.bundleDetails[0].userId.profilePic
                : "images/user-profile.png"
            }
            alt=""
            style={{ width: "45px", height: "45px", marginTop: "3px" }}
          />
          <Box></Box>
        </figure>
      </Box>
      {/* </Link> */}
      <Box className={classes.contantCard}>
        <Box>
          <Typography
            variant="h6"
            component="h6"
            style={{
              color: "#792034",
              fontWeight: 500,
              textOverflow: "ellipsis",

              whiteSpace: "nowrap",
              width: "auto",
            }}
            onClick={() => {
              if (data.bundleDetails[0] && data.bundleDetails[0].userId) {
                setselectedUserID(data.bundleDetails[0].userId);
                handleClickOpen1();
              }
            }}
          >
            {data.title}
          </Typography>
          <Typography
            variant="h5"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "auto",
            }}
          >
            {data.name}
          </Typography>
          <Box
            style={{
              curser: "pointer",
              display: "flex",
              justifyContent: "flex-end",
            }}
            onClick={() =>
              data.bundleDetails[0] && likeDislikeNfthandler
                ? likeDislikeNfthandler(data.nftId)
                : false
            }
          >
            {data.bundleDetails[0] && data.bundleDetails[0].isLike ? (
              <Box style={{ display: "flex" }}>
                <Box>
                  <FcLike />
                </Box>
                &nbsp;
                <Box style={{ fontSize: "15px" }}>
                  {data.bundleDetails[0] && data.bundleDetails[0].likesCount}
                </Box>
              </Box>
            ) : (
              <Box style={{ display: "flex" }}>
                <Box>
                  <IoMdHeartEmpty />
                </Box>
                &nbsp;
                <Box style={{ fontSize: "15px" }}>
                  {data.bundleDetails[0] && data.bundleDetails[0].likesCount}
                </Box>
              </Box>
            )}
            {/* <FaRegHeart
              style={
                data.bundleDetails[0] && data.bundleDetails[0].isLike
                  ? { color: 'red' }
                  : {}
              }
              onClick={() =>
                data.nftId && likeDislikeNfthandler
                  ? likeDislikeNfthandler(data.nftId)
                  : false
              }
            /> */}
          </Box>
        </Box>
        <Typography
          variant="h6"
          component="h6"
          style={{ color: "#000", fontWeight: 500 }}
        >
          {data.masPrice}
          <span style={{ color: "#707070", fontWeight: 500 }}>MAS</span>
        </Typography>
        <Typography variant="h6" component="h6" style={{ color: "#00" }}>
          <span style={{ color: "#191818", fontWeight: 500 }}>
            Valid till:
          </span>
          <span>{moment(data.validTillDate).format("DD-MM-YYYY hh:mm A")}</span>
        </Typography>
        <Typography
          style={{
            color: "#000",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "auto",
          }}
        >
          
          {data.bundleDetails[0] && data.bundleDetails[0].details}
        </Typography>
        
      </Box>
    </Box>
  );
}

export function SubscribtionsCardPopup({
  openBlock,
  handleClose1,
  selectedUserID,
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const auth = useContext(UserContext);
  const [isDonate, setIsDonate] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const navigate = useNavigate();
  const getDetails = async (selectedUserID) => {
    setIsLoading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.userAllDetails + selectedUserID._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setUserDetails(res.data.result);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.message);
      });
  };

  useEffect(() => {
    if (selectedUserID) {
      getDetails(selectedUserID);
    }
  }, [selectedUserID]);

  const donationHandler = async () => {
    if (parseFloat(donationAmount) < parseFloat(auth.userData.masBalance)) {
      try {
        setIsDonating(true);
        const res = await axios.get(Apiconfigs.donation, {
          params: {
            amount: donationAmount,
            userId: selectedUserID,
          },
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        toast.success(res.data.responseMessage);
        auth.updateUserData();
        setIsDonating(false);
      } catch (error) {
        setIsDonating(false);

        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        console.log("Error", error);
      }
    } else {
      toast.error("Donation amount should be less than MAS balance");
    }
  };

  return (
    <>
      <Dialog
        open={openBlock}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.customModal}
      >
        <DialogContent className={classes.paper} style={{ minHeight: 450 }}>
          <DialogContentText id="alert-dialog-slide-description">
            {isLoading && !userDetails ? (
              <DataLoading />
            ) : (
              <>
                <Box align="center" mb={2}>
                  <img
                    onClick={() =>
                      navigate("/user-profile/"+selectedUserID)
                    }
                    src={
                      userDetails && userDetails.profilePic
                        ? userDetails.profilePic
                        : "images/user-profile.png"
                    }
                    alt=""
                  />
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ color: "#000" }}
                  >
                    {userDetails && userDetails.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    align="center"
                    style={{ color: "#707070" }}
                  >
                    <span style={{ color: "#792034", fontWeight: 500 }}>
                      Bio:
                    </span>
                    &nbsp;
                    {userDetails && userDetails.bio}
                  </Typography>
                </Box>
                <Box align="center" mb={2}>
                  <Typography
                    variant="body2"
                    component="span"
                    align="center"
                    style={{ color: "#792034" }}
                  >
                    Available bundles:
                  </Typography>
                  <Box mt={2}>
                    <Suspend data={userDetails && userDetails.bundleDetails} />
                  </Box>
                  {userDetails &&
                    userDetails.bundleDetails &&
                    userDetails.bundleDetails.length === 0 && <NoDataFound />}
                </Box>
                

                <Box align="center">
                
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleClose1}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {isDonate && (
        <Dialog
          open={isDonate}
          fullWidth="sm"
          maxWidth="sm"
          onClose={() => setIsDonate(false)}
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
                {userDetails.name}
              </Typography>

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label> Donation Amount</label>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="standard-basic"
                      placeholder="30"
                      className={classes.input_fild2}
                      type="number"
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={4}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item md={6}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => setIsDonate(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={donationHandler}
                      disabled={isDonating}
                    >
                      Donate {isDonating && <ButtonCircularProgress />}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
