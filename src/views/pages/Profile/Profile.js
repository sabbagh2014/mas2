import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Paper,
  Avatar,
  Container,
  Button,
  IconButton,
  TextField,
  Typography,
  makeStyles,
  InputAdornment,
  DialogTitle,
  Input,
  Grid,
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import { FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { AiFillSetting } from "react-icons/ai";
import { FaTelegramPlane, FaUserFriends } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { FaFacebookF } from "react-icons/fa";
import { RiMessengerFill } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import BalanceBox from "src/component/BalanceBox";
import { sortAddress } from "src/utils";
import { tokensDetails, websiteName } from "src/constants";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import NoDataFound from "src/component/NoDataFound";
import { toast } from "react-toastify";
import { FaTwitter } from "react-icons/fa";
import {VerifyOtp} from "src/component/Modals/VerifyOtp"

const useStyles = makeStyles((theme) => ({
  profilebg: {
    boxShadow: " 0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundImage: " linear-gradient(to bottom, #c04848, #480048)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center center",
    height: " 143.5px",
    width: "100%",
    position: "relative",
  },
  profileText: {
    "& h3": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "25px",
      fontWeight: "500",
      color: "#000",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& a": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#707070",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "flex-start",
      },
      "& svg": {
        paddingRight: "5px",
      },
    },
    "& p": {
      fontSize: "12px",
      fontWeight: "500",
      color: "#444",
      marginTop: "6px",
    },
  },
  masBox: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #c6cacf",
    backgroundColor: "#fff",
    padding: "10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
  masBox1: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #c6cacf",
    backgroundColor: "#fff",
    padding: "10px",
    marginLeft: "-10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "32px",
    "& button": {
      height: "30px",
      fontSize: "12px",
    },
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },
  dialogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  tokenList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px",
    border: "solid 0.5px #e5e3dd;",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "&.active": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "& h3": {
      color: "#141518",
      fontSize: "14px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  dilogBody: {
    paddingBottom: "30px",
    position: "relative",
    "& small": {
      position: "absolute",
      bottom: "13px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
    },
  },
  dilogBody2: {
    boxShadow: "0 1.5px 3px 0 rgb(0 0 0 / 16%)",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    borderRadius: "50px",
    overflow: "hidden",
  },
  dilogBody3: {
    backgroundColor: "#101010",
  },
  table: {
    "& th": {
      color: "#fff",
    },
    "& td": {
      color: "#fff",
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",
    
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
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
      height: "34px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  userno: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      paddingRight: "5px",
    },
  },

  walletActions: {
    display: "flex",
    marginBottom: "20px",
    "& button":{
      margin: '10px'
    },
    "@media(max-width:600px)": {
      order: "0",
      width: " 100%",
      justifyContent: "space-between",
    },
  },
  textbox: {
    "@media(max-width:600px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center'
    },
    "& h3": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign:"center",
      },
    },
    "& h5": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign:"center",
      },
    },
    "& button": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign:"center",
      },
    },
  },

}));

export default function Profile() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWihdraw, setOpenWithdraw] = useState(false);
  const [openSelectToken, setOpenSelectToken] = useState(false);
  const [openUserPlan, setOpenUserPlan] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawFees, setWithdrawFees] = useState();
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [loader, setloader] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawTx, setWithdrawTx] = useState("");
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);

  const [availableBalance, setAvailableBalance] = useState({});
  const [totalEarning, setTotalEarning] = useState({});


  if (user.isLogin && !user.userData){
    user.updateUserData();
  }

  useEffect( () => {
    let timer1;
    function checkechecko() {
      if (user.isLogin && user.userData._id){
      if (!user.userData.emailVerification) {
        navigate("/profilesettings");
      }
      return () => {
        clearTimeout(timer1);
      };
    } else {
      timer1 = setTimeout(() => {
        checkechecko()
      }, 200);
    }}
    checkechecko()
  }, []);

  useEffect(()=>{
    setAvailableBalance({
      masBalance : parseFloat(user.userData?.masBalance),
      busdBalance : parseFloat(user.userData?.busdBalance),
      usdtBalance : parseFloat(user.userData?.usdtBalance),
    });
    
  },[user.userData])

  useEffect(()=>{
    setTotalEarning({
      masBalance : parseFloat(user.userEarnings?.masBalance)+parseFloat(user.userEarnings?.referralBalance),
      busdBalance : parseFloat(user.userEarnings?.busdBalance),
      usdtBalance : parseFloat(user.userEarnings?.usdtBalance),
    });
    
  },[user.userEarnings])

  React.useMemo(() => {
    setWithdrawFees(((parseFloat(user.userData?.withdrawFees)*parseFloat(withdrawAmount)/100)).toFixed(2));
  }, [withdrawAmount]);

  const MAxWithdrawAmount = () => {
    setWithdrawAmount((availableBalance[selectedToken.databaseKey] - availableBalance[selectedToken.databaseKey]*parseFloat(user.userData?.withdrawFees)/100).toFixed(2));
  }

  const withdraw = async () => {
    
    if (withdrawAmount === "") {
      setWithdrawError("Please enter Amount");
    } else if (withdrawAmount < 1) {
      setWithdrawError("Please enter valid amount (equal or greater than 1)");
    } else if (
      parseFloat(withdrawAmount) + parseFloat(withdrawFees)  >= parseFloat(user.userData[selectedToken.databaseKey])
    ) {
      setWithdrawError(`${selectedToken.name} balance is low`);
    } else if (withdrawAddress === "") {
      setWithdrawError("Please enter Wallet Address");
    } else {
      setloader(true);
      axios({
        method: "POST",
        url: Apiconfigs.withdraw,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          recipientAddress: withdrawAddress,
          withdrawAmount: withdrawAmount,
          coin: selectedToken?.name,
        },
      })
        .then(async (res) => {
          await user.updateUserData();
          if (res.data.statusCode === 201) {
            setloader(false);
            setWithdrawTx(res.data.result.txid);
            setOpenWithdraw(false);
            setVerifyOTPOpen(true);
          } else {
            setWithdrawError("Something went wrong!");
            setloader(false);
          }
        })
        .catch((err) => {
          setWithdrawError("Something went wrong!");
          setloader(false);
        });
    }
  };

  const handleCloseDepositModal = () => {
    setOpenDeposit(false);
  };
  const handleCloseWithdrawModal = () => {
    setOpenWithdraw(false);
  };
  const handleCloseUserPlanModal = () => {
    setOpenUserPlan(false);
  };
  const handleCloseShareModal = () => {
    setOpenShare(false);
  };

  const profilePageURL = websiteName + "/user-profile/" + user?.userData?.userName;

  return (
    <Box>
      <Box className={classes.profilebg}
        style={
          user.userData && user.userData?.coverPic
            ? {
                backgroundImage: `url(${user.userData?.coverPic})`,
              }
            : null
        }
      >
      </Box>

      <Box className={classes.profileText}>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems='flex-end'>
            <Grid item xs={12} sm={4} md={4} lg={2}>
                <Avatar
                  src={
                    user.userData && user.userData?.profilePic
                      ? user.userData?.profilePic
                      : `https://avatars.dicebear.com/api/miniavs/${user?.userData?._id}.svg`
                  }
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: '10px auto'
                  }}
                />
              <Box className={classes.textbox}>

                  <Typography align='center' variant="h3"
                    style={{ textTransform: "capitalize" }}
                  >
                    {user.userData?.name
                      ? user.userData?.name
                      : user.userData?.userName}
                      {user?.userData?.planType === "Gold" && (
                        <img onClick={() => setOpenUserPlan(true)}
                          src="/images/gold-check.svg"
                          style={{ width: "30px", marginLeft: "5px" }}
                        />
                      )}
                      {user?.userData?.planType === "Diamond" && (
                        <img onClick={() => setOpenUserPlan(true)}
                          src="/images/blue-check.svg"
                          style={{ width: "30px", marginLeft: "5px" }}
                        />
                      )}
                      {user?.userData?.planType === "Silver" && (
                        <img onClick={() => setOpenUserPlan(true)}
                          src="/images/white_check.svg"
                          style={{ width: "30px", marginLeft: "5px" }}
                        />
                      )}
                      {user?.userData?.planType === "Mas Plus" && (
                        <img onClick={() => setOpenUserPlan(true)}
                          src="/images/icon.png"
                          style={{ width: "30px", marginLeft: "5px" }}
                        />
                      )}
                  </Typography>
                  <Typography align='center' variant="body2"
                        component="p">
                    {sortAddress(user?.userData?.ethAccount?.address)} &nbsp;
                    {user?.userData?.ethAccount?.address && (
                      <CopyToClipboard
                        style={{ curser: "pointer" }}
                        text={user?.userData?.ethAccount?.address}
                      >
                        <FiCopy onClick={() => toast.info("Copied")} />
                      </CopyToClipboard>
                    )}
                  </Typography>

                    <Typography align='center' variant="body2" component="p">
                      {user &&
                      user.userData &&
                      user.userData?.followers?.length
                        ? user.userData?.followers?.length
                        : "0"} Subscriber{user.userData?.followers?.length > 1 ? "s":""}
                    </Typography>
                    <Typography align='center' variant="body2"
                        component="p">
                      Referral code : {user?.userData?.referralCode} &nbsp;
                      <CopyToClipboard
                      text={user?.userData?.referralCode}
                      style={{ cursor: "pointer" }}
                    >
                      <FiCopy onClick={() => toast.success("Referral code Copied")} />
                    </CopyToClipboard>
                    </Typography>
                    <Button style={{marginTop: "6px", maxWidth:"100px"}} onClick={() => setOpenShare(true)}>
                      Share
                    </Button>  
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={8} lg={5}>
                <Box display='flex' justifyContent='flex-end' alignContent='center'>
                  
                  <Box className={classes.walletActions}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => setOpenDeposit(true)}
                      >
                        Deposit
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={() => setOpenWithdraw(true)}
                      >
                        Withdraw
                      </Button>
                    <IconButton
                      onClick={()=> navigate("/profilesettings")}
                    >
                      <AiFillSetting />
                    </IconButton>
                  </Box>
                </Box>
                <Typography
                      variant="h5"
                      component="h5"
                    >
                     TOTAL BALANCE
                    </Typography>
                <BalanceBox 
                  availableBalance={availableBalance} 
                  tokensDetails={tokensDetails}
                  setSelectedToken={setSelectedToken} 
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={5}>
             
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={3}>
                    <Paper elevation={1}
                      align="center" style={{height:'100%', paddingTop:'20px'}}
                    >
                      <Typography variant="h5" className={classes.userno}>
                        <FaUserFriends />
                        {user.userData && user.userData?.supporters?.length}
                      </Typography>
                      <Typography variant="span">
                        Supporter{user.userData?.supporters?.length > 1 ? "s": ""}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Typography
                      variant="h5"
                      component="h5"
                    >
                      TOTAL CREATE & EARN
                    </Typography>
                    <BalanceBox 
                      availableBalance={totalEarning} 
                      tokensDetails={tokensDetails}
                      setSelectedToken={setSelectedToken} 
                    />
                  </Grid>
                </Grid>
              
            </Grid>
           
          </Grid>
        </Container>
      </Box>

      <Dialog
        open={openDeposit}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleCloseDepositModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h3"
              align="center"
              style={{ color: "#792034", margiBottom: "10px" }}
            >
              Deposit
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#792034", margiBottom: "10px" }}
            >
              Please make sure you use BSC (BNB Smart Chain) and send only supperted tokens (MAS, USDT, BUSD)
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "#000" }}
            ></Typography>
            <Container maxWidth="md">
              <Box mt={4}>
                <Input
                  value={user.userData?.ethAccount?.address}
                  placeholder="Wallet Address"
                  className={classes.input_fild2}
                  startAdornment={
                    <InputAdornment position="end">
                      <CopyToClipboard text={user.userData?.ethAccount?.address}>
                        <Button onClick={() => toast.info("Copied")}>
                          COPY
                        </Button>
                      </CopyToClipboard>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box mt={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => setOpenDeposit(false)}
                >
                  Close
                </Button>
              </Box>
              
            </Container>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <VerifyOtp 
        open={verifyOTPOpen} 
        handleClose={()=> setVerifyOTPOpen(false)}
        channels={['email']}
        context={'withdraw'}
        emailVerificationSent={false}
        smsVerificationSent={false}
        payload={withdrawTx}
        successCallback={()=>{
          setVerifyOTPOpen(false);
          toast.success("Withdrawal successful!");
        }}
      />

      <Dialog
        open={openWihdraw}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleCloseWithdrawModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={loader}
        disableEscapeKeyDown={loader}
      >
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#792034", margiBottom: "10px" }}
            >
              Withdraw
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "#000" }}
            >
              <>
              Please make sure the Wallet address is BEP20 <br/>
              (Transaction will be sent in BSC Network)
              </>
            </Typography>
            <BalanceBox 
              availableBalance={availableBalance} 
              tokensDetails={tokensDetails}
              setSelectedToken={setSelectedToken} 
            />
            <Container maxWidth="md">
            <Box mt={4}>
                <Input
                  placeholder="Wallet Address"
                  value={withdrawAddress}
                  className={classes.input_fild2}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  
                />
              </Box>
              <Box mt={4}>
                <Input
                  value={withdrawAmount}
                  placeholder={"Minimum amount 10 "+selectedToken?.name?.toString()}
                  className={classes.input_fild2}
                  type="number"
                  min={10}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      onClick={() => setOpenSelectToken(true)}
                    >
                      
                        <Box style={{ cursor: "pointer" }}>
                          <img src={selectedToken?.img} alt="" width="20px"/>
                          <ArrowDropDownIcon style={{ cursor: "pointer" }} />
                        </Box>
                      
                    </InputAdornment>
                  }
                />
                <Typography
                  variant="body2"
                  align="left"
                  style={{ color: "#000" }}
                > 
                  <span onClick={() => MAxWithdrawAmount()} >
                    Available: {availableBalance[selectedToken.databaseKey]?.toFixed(2)} {selectedToken.name} 
                  </span>
                </Typography>
                
              </Box>
              
              <Box mt={2} mb={4}>
                <Typography
                  variant="body2"
                  align="left"
                  style={{ color: "#000" }}
                > 
                  <span>Withdraw fees: {withdrawAmount ? <span>{withdrawFees} {selectedToken.name}</span> : user.userData?.withdrawFees+"%" } </span>
                  <br/>
                  { withdrawAmount ? 
                  <strong>Amount + Fees: {parseFloat(withdrawAmount) + parseFloat(withdrawFees)} {selectedToken.name}</strong> : ""
                  }
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={withdraw}
                  disabled={loader || !withdrawAmount || !selectedToken}
                >
                  {loader ? "Pending..." : `Withdraw` }
                  {loader && <ButtonCircularProgress />}
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ color: "#f22" }}
                > 
                <span>{withdrawError}</span>
                </Typography>
                
              </Box>
            </Container>
            
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* select Token */}
      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={openSelectToken}
        onClose={() => setOpenSelectToken(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <DialogTitle className={classes.dialogTitle}>
            Select a token
          </DialogTitle>
          {tokensDetails.map((data, i) => {
            return (
              <Box key={i}
                mt={3}
                onClick={() => {
                  {
                    setSelectedToken(data);
                    setOpenSelectToken(false);
                  }
                }}
                className={classes.tokenList}
              >
                <Typography variant="h3">
                  {data.name}
                </Typography>
                <img
                  src={data.img}
                  style={{ height: 20, width: 20 }}
                  alt="coin"
                />
              </Box>
            );
          })}
        </DialogContent>
      </Dialog>
      
      <UserPlanListPopup open={openUserPlan} handleClose={handleCloseUserPlanModal} />

      <Dialog
        open={openShare}
        onClose={handleCloseShareModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#000", margiBottom: "10px" }}
            >
              Hooray!
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "#000" }}
            >
              
              You can share your link now anywhere!
            </Typography>

            <Box mt={3}>
              <TextField
                defaultValue={profilePageURL}
                disabled
                variant="outlined"
                className={classes.input_fild}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ fontSize: "12px" }}>
                      <CopyToClipboard text={profilePageURL}>
                        <Button onClick={() => toast.info("Copied")}>
                          COPY
                        </Button>
                      </CopyToClipboard>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={2} mb={4}>
              <Box mt={2} align="center">
                <FacebookShareButton
                  url={profilePageURL}
                  quote={"mas"}
                  hashtag="#mas"
                >
                  <FaFacebookF style={{ color: "#000" }} />
                </FacebookShareButton>
                <EmailShareButton
                  url={profilePageURL}
                  subject="mas"
                  body="mas"
                >
                  <RiMessengerFill style={{ color: "#000" }} />
                </EmailShareButton>
                <TwitterShareButton
                  url={profilePageURL}
                  quote={"CampersTribe - World is yours to explore"}
                  hashtag="#camperstribe"
                >
                  <FaTwitter style={{ color: "#000" }} />
                </TwitterShareButton>
                <TelegramShareButton
                  url={profilePageURL}
                  title={"mas"}
                >
                  <FaTelegramPlane style={{ color: "#000" }} />
                </TelegramShareButton>
              </Box>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleCloseShareModal}
              >
                Close
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export const UserPlanListPopup = ({ open, handleClose }) => {
  const classes = useStyles();
  const [planDetails, setPlanDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const listFeeHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.listFee, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setPlanDetails(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    listFeeHandler();
  }, []);
  return (
    <Dialog
      open={open}
      fullWidth="md"
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dilogBody3}>
        <DialogContentText id="alert-dialog-description">
          <Box className={classes.dilogBody2}>
            {isLoading ? (
              <DataLoading />
            ) : (
              <>
                {planDetails ? (
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">$MAS HELD</TableCell>
                          <TableCell align="center">PROFILE BADGE</TableCell>
                          <TableCell align="center">
                            CLIENT CREATOR FEES
                          </TableCell>
                          <TableCell align="center">
                            CONTENT CREATOR FEES
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {planDetails &&
                          planDetails.map((data, i) => {
                            return (
                              <TableRow key={i}>
                                <TableCell>
                                  {data.planType.toUpperCase()}
                                </TableCell>
                                <TableCell align="center">
                                  {data.masHeld}
                                </TableCell>
                                <TableCell align="center">
                                  {data.planType}
                                </TableCell>
                                <TableCell align="center">
                                  {data.clientFee}
                                </TableCell>
                                <TableCell align="center">
                                  {data.contentCreatorFee}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                )}
              </>
            )}
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
