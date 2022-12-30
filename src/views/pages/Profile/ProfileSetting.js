import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  TextField,
  makeStyles,
  InputAdornment
} from "@material-ui/core";
import {
  Alert,
  AlertTitle
} from "@material-ui/lab";
import {green, red} from '@material-ui/core/colors';

import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FiCopy, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SocialAccounts from "./SocialAccounts";
import {VerifyOtp} from "src/component/Modals/VerifyOtp"

const useStyles = makeStyles((theme) => ({
  LoginBox: {
    paddingBottom: "50px",
  },
  basic: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "30px",
    paddingTop: "20px",
    color: "#141518",
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "33px",
      "@media(max-width:960px)": {
        height: "15px",
        marginTop: "-15px",
      },
    },
  },
  Button: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "25px",
  },
  ButtonBtn: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "200px",
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    "& p": {
      fontSize: "15px",
      color: "#707070",
      paddingLeft: "5px",
    },
  },
  inputbox: {
    width: "100%",
    height: "120px",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-75px",
  },
  coverpic: {
    width: "100%",
  },

  coverback: {
    height: "127.7px",
    width: "100%",
  },

  CoverBox: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  coverEdit: {
    color: "#ffffff",
    fontSize: "12px",
    marginTop: "-40px",
    padding: "10px",
    position: "relative",
    "& input": {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
  },
  profilePic: {
    position: "relative",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    "& img": {
      width: "124px",
      height: "124px",
      borderRadius: "50%",
    },
    
    "& input": {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
  },
  Box: {
    width: "100%",
    height: "125px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center center",
  },
  newsec: {
    display: "flex",
    "@media(max-width:560px)": {
      display: "block",
    },
  },
  mainadd: {
    paddingTop: "8px",
    "@media(max-width:560px)": {},
  },
}));
export function copyTextById(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  alert(`Copied ${copyText.value}`);
}

const VerificationAlert = ({verify}) => {
  const user = useContext(UserContext);

  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  return (
    <box>
    <Alert severity="warning" variant="outlined">
      <AlertTitle>Security Verification</AlertTitle>
       To secure your account and enjoy full MAS Platform features please verify
       {' '}
       {verify.includes('email') && 'your email address '}
       {verify.length>1 && ' and '}
       {verify.includes('sms') && 'your phone number '} 
       <Button 
      variant="text"
      onClick={()=>setVerifyOTPOpen(true)}
       >
        check here!
      </Button>
    </Alert>
    <VerifyOtp 
      open={verifyOTPOpen} 
      handleClose={()=> setVerifyOTPOpen(false)}
      channels={verify}
      context={'verifyLater'}
      emailVerificationSent={false}
      smsVerificationSent={false}
      successCallback={()=>{
        setVerifyOTPOpen(false);
        user.updateUserData();
        toast.success("Security Verification complete!");
      }}
    />
    </box>
  )
}

export default function ProfileSettings() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const [isLoading, setIsloading] = useState(false);
  const [name, setname] = useState(user.userProfileData?.name);
  const [speciality, setspeciality] = useState(user.userProfileData?.speciality);
  const [bio, setbio] = useState(user.userProfileData?.userbio);
  const [profilePic, setProfilePic] = useState(user.userProfileData?.userprofilepic);
  const [cover, setcover] = useState(user.userProfileData?.usercover);

  const [needVerification, setNeedVerification] = useState([]);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };

  const updateProfile = async () => {

      if(!name || !bio || !speciality || !profilePic ){
        toast.error("Check field Errors !");
      } else { 
        
        setIsloading(true);
        axios({
          method: "PUT",
          url: Apiconfigs.updateprofile,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          data: {
            name: name,
            speciality: speciality,
            profilePic: profilePic,
            coverPic: cover,
            bio: bio,
            facebook: user.link.userfacebook,
            twitter: user.link.usertwitter,
            youtube: user.link.useryoutube,
            telegram: user.link.usertelegram,
          },
        }).then(async (res) => {
            if (res.data.statusCode === 200) {
              toast.success("Your profile has been updated successfully");
              user.updateUserData();
            } else {
              toast.error(res.data.responseMessage);
            }
            setIsloading(false);
          })
          .catch((error) => {
            setIsloading(false);

            if (error.response) {
              toast.error(error.response.data.responseMessage);
            } else {
              toast.error(error.message);
            }
          });
      }
  };

  useEffect( () => {
    let timer1;
    function checkechecko() {
      if (user.isLogin && user.userData._id){
        let verify = new Set(needVerification);
        if (user.userData.emailVerification === false) {
          verify.add('email')
        } else {
          verify.delete('email')
        }
        if (user.userData.phoneVerification === false) {
          verify.add('sms');
        } else {
          verify.delete('sms')
        }
        setNeedVerification([...verify]);
        
      return () => {
        clearTimeout(timer1);
      };
    } else {
      timer1 = setTimeout(() => {
        checkechecko()
      }, 500);
    }}
    checkechecko()
  }, []);

  useEffect(()=>{
    setname(user.userProfileData?.name);
    setspeciality(user.userProfileData?.speciality);
    setbio(user.userProfileData?.userbio);
    setProfilePic(user.userProfileData?.userprofilepic);
    setcover(user.userProfileData?.usercover);
  },[user.userProfileData])
  
  

  return (
    <Box className={classes.LoginBox}>
      <Grid className={classes.CoverBox}>
        <Box
          className={classes.Box}
          style={ cover
              ? { backgroundImage: `url(${cover})`,}
              : null }
        >
        </Box>
        <Box className={classes.coverEdit} style={{ curser: "pointer" }}>
          Edit Cover Photo
          <FiEdit />
          <input
            style={{ curser: "pointer" }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              getBase64(e.target.files[0], (result) => {
                setcover(result);
              });
            }}
          />
        </Box>
      </Grid>
      <Container maxWidth="sm">
        <Box className={classes.profile}>
          <Box className={classes.profilePic}
            style={!profilePic ? {
                border: "dotted 2px red"
              }: null}
          >
            <img
            
            src={profilePic || "/images/users/profilepic1.svg"}
            alt="Edit profile picture"
          />
            <Box style={{position: 'absolute',bottom:'44px',left:"126px", width:"200px", color: '#fff'}}>
            <FiEdit /> Edit profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                getBase64(e.target.files[0], (result) => {
                  setProfilePic(result);
                });
              }}
            />
            </Box>
            
          </Box>
        </Box>

        {needVerification.length > 0 && <VerificationAlert verify={needVerification} />} 
       
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <label>Name</label>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                
                value={name}
                error={!name}
                helperText={!name && "Please enter valid name"}
                onChange={(e) => setname(e.target.value)}
                className={classes.input_fild2}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <label>Speciality</label>
            </Grid>
            <Grid item xs={12} md={9}>
              <TextField
                
                value={speciality}
                error={!speciality}
                helperText={!speciality && "Please enter valid speciality"}
                onChange={(e) => setspeciality(e.target.value)}
                className={classes.input_fild2}
              />
              
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={1} style={{ alignItems: "center" }}>
          <Grid item xs={12} >
              <label>About me</label>
            </Grid>
            <Grid item xs={12} >
              <TextField
                id="outlined-multiline-static"
                focused="true"
                multiline
                rows={4}
                value={bio}
                error={!bio}
                helperText={!bio && "Please Fill in something about you"}
                variant="outlined"
                className={classes.inputbox}
                onChange={(e) => setbio(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Grid container spacing={2} 
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item xs={12} md={4}>
              <label>Email</label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                disabled={true}
                fullWidth
                variant="outlined"
                margin="normal"
                value={user.userData?.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {user.userData?.emailVerification ? <CheckCircleOutlineIcon fontSize="16" style={{ color: green[500] }} /> :
                      <Tooltip title="Email not verified" placement="right">
                      <ErrorOutlineIcon fontSize="16" style={{ color: red[500] }} />
                      </Tooltip>}
                    </InputAdornment>
                  )}}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2} 
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item xs={12} md={4}>
              <label>Phone Number</label>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                disabled={true}
                fullWidth
                variant="outlined"
                margin="normal"
                value={user.userData?.phone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {user.userData?.phoneVerification ? <CheckCircleOutlineIcon fontSize="16" style={{ color: green[500] }} /> :
                      <Tooltip title="Phone number not verified" placement="right">
                      <ErrorOutlineIcon fontSize="16" style={{ color: red[500] }} />
                      </Tooltip>}
                    </InputAdornment>
                  )}}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2} 
                direction="row"
                justifyContent="center"
                alignItems="center">
            <Grid item xs={12} md={4}>
            <label>Profile URL</label>
            </Grid>
            <Grid item xs={12} md={8} >
              <span style={{fontSize: "12px", color: "blue"}}>
                https://masplatform.net/user-profile/{user?.userData?.userName}
              </span>  &nbsp;
              <CopyToClipboard
                style={{ curser: "pointer" }}
                text={`https://masplatform.net/user-profile/${user.userData?.userName}`}
              >
                <FiCopy onClick={() => toast.info("Profile url Copied")} />
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={2} 
                direction="row"
                justifyContent="center"
                alignItems="center">
          <Grid item xs={12} md={4}>
            <label>Wallet Address</label>
            </Grid>
            <Grid item xs={12} md={8} >
              <span style={{fontSize: "12px", color: "blue"}}>
                {user.userData?.ethAccount?.address}
              </span> &nbsp;
              <CopyToClipboard
                style={{ curser: "pointer" }}
                text={user.userData?.ethAccount?.address}
              >
                <FiCopy onClick={() => toast.info("Wallet Copied")} />
              </CopyToClipboard>
            </Grid>
            
          </Grid>
        </Box>
        <Box>
          <Grid container alignItems="center">
          <Grid item xs={12} md={4}> 
            <label>Referral</label>
            </Grid>
            <Grid item xs={12} md={4} 
            >
                <span style={{fontSize: "12px", color: "blue"}}>{user.userData?.referralCode}</span>
                &nbsp;
                <CopyToClipboard text={user.userData?.referralCode}>
                  <FiCopy onClick={() => toast.info("Referral Code Copied")} />
                </CopyToClipboard>
            </Grid>
            
          </Grid>
        </Box>
        <Box>
          <SocialAccounts />
        </Box>
       
        <Box>
          
              <Box className={classes.Button}>
                <Box className={classes.ButtonBtn}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component={Link}
                    to="/"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </Box>

                <Box className={classes.ButtonBtn}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    disabled={isLoading}
                    onClick={updateProfile}
                  >
                    {isLoading ? "Updating..." : "Update"}
                    {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Box>
            
        </Box>
      </Container>
    </Box>
  );
}
