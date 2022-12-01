import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  makeStyles,
  Typography,
  FormHelperText
} from "@material-ui/core";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import { isValidEmail, isValidPassword } from "src/CommanFunction/Validation";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from '@material-ui/icons/Close';
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loginBox: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e5e5f7",
  },

  splash: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  btnflex: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  labelText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#000",
  },
  inputText: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      border: "solid 1px #4441",
      borderRadius: "20px",
      backgroundColor: "#fafafa",
    },
    "& .MuiOutlinedInput-input": {
      padding: '10px',
      fontSize: "14px",
      fontWeight: "500",
      color: "#000",
    }
  },
  paper: {
    display: "flex",
    alignItems: "center",
    "& a": {
      fontWeight: "700",
      textDecoration: "underline",
      color: "#000",
    },
    "& label": {
      paddingTop: "0 !important",
      color: "#141518",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [splash, setSplash] = useState("");


  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [emailvalid, setemailvalid] = useState(true);
  const [passvalid, setpassvalid] = useState(true);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [showpass, setshowpass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [resetloader, setresetloader] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setcode] = useState("");
  const [resendTimer, setresendTimer] = useState();

  useEffect(() => {
    if (user.userLoggedIn) {
      navigate("/");
    }
  }, [user.userLoggedIn]);

  useEffect(() => {
    let emailtimeout;
    if (resendTimer && resendTimer >= 0) {
      emailtimeout = setTimeout(() => setresendTimer(resendTimer - 1), 1000);
    } else {
      setresendTimer();
      clearTimeout(emailtimeout);
    }
  });

  useEffect(() => {
    setemailvalid(true);
    setpassvalid(true);
  }, []);

  const forgotPasswordHandler = () => {
    setresetloader(true);
    setemailvalid(isValidEmail(email));
    if (emailvalid) {
      axios({
        method: "POST",
        url: Apiconfigs.forgotPassword,
        data: {
          email: email
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success("Email send successfuly!");
            setresetloader(false);
            setVerificationSent(true);
            setresendTimer(60);
          } else {
            toast.error(res.data.responseMessage);
            setresetloader(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.responseMessage);
          } else {
            toast.error(err.message);
          }
          console.log(err.message);
          setresetloader(false);
        });
    } else {
      setresetloader(false);
    }
  };
  const resetPaswordHandler = async () => {
    setresetloader(true);
    setemailvalid(isValidEmail(email));
    setpassvalid(isValidPassword(pass));
    if (emailvalid && passvalid && code.length == 6) {
      axios({
        method: "POST",
        url: Apiconfigs.resetPassword,
        data: {
          email: email,
          password: pass,
          otp: code,
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.responseMessage);
            setOpenForgotPassword(false);
          } else {
            toast.error(res.data.responseMessage);
          }
          setresetloader(false);
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.responseMessage);
          } else {
            toast.error(err.message);
          }
          setresetloader(false);
        });
    }

  };
  const Login = async () => {
    setemailvalid(isValidEmail(email));
    setpassvalid(isValidPassword(pass));
    if (emailvalid && passvalid) {
      setLoader(true);
      try {
        const res = await axios({
          method: "POST",
          url: Apiconfigs.userlogin,
          data: {
            email: email,
            password: pass,
          },
        });
        if (Object.entries(res.data.result).length > 0) {
          if (!res.data?.result?.isNewUser) {
            toast(
              ` 👋 Welcome Back ${res.data?.result?.name
                ? res.data?.result?.name
                : res.data?.result?.userName
              }`
            );
          }
          await user.updatetoken(res.data.result.token);
          if (!res.data?.result?.isEmailVerified || !res.data?.result?.isPhoneVerified) {
            navigate("/profilesettings");
          } else {
            navigate("/");
          }
        } else {
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    const url = 'https://api.unsplash.com/photos/random?client_id=YC94t2S3Nge47lJvxYFndgORX0JUr4Ym7BfrSqfHUzU'
    const fetchSplash = async () => axios.get(url).then(res => {
      console.log(res)
      setSplash(res.data.urls.regular)
    });
    fetchSplash();

  }, [])
  return (
    <Box className={classes.root}>
    <Box className={classes.splash}
        style={{
          padding:"20px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          backgroundSize: 'cover',
          backgroundImage: `url(${splash})`
        }}
      >
        <Link to='/'>
          <img src="/images/footer-logo.svg" alt="home page" width="200" />
        </Link>
        <Typography variant="h1" style={{ color: "#fffc", fontSize: '5rem', fontWeight: 'bold' }}>
          Unleash Your Creativity
        </Typography>


      </Box>
      <Box className={classes.loginBox}>

        <Container maxWidth="sm" style={{ backgroundColor: "#e5e5f7f8", padding: '20px' }}>
          <Typography variant="h2" align='center' mb={40}>
            Login to your account
          </Typography>
          <form onSubmit={Login}>

            <Box>
              <label className={classes.labelText}>Your Email Account</label>
              <TextField
                error={!emailvalid}
                placeholder={email}
                variant='outlined'
                className={classes.inputText}
                type="email"
                helperText={!emailvalid && "Incorrect Email."}
                value={email}
                onBlur={(e) => setemailvalid(isValidEmail(e.target.value))}
                onChange={(e) => {
                  setemail(e.target.value);
                  setemailvalid(isValidEmail(e.target.value));
                }}
              />
            </Box>
            <Box>
              <label className={classes.labelText}>Your Password</label>
              <TextField
                variant='outlined'
                type={showpass ? "text" : "password"}
                error={!passvalid}
                helperText={
                  !passvalid && "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshowpass(!showpass)}
                      >
                        {showpass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={pass}
                onChange={(e) => {
                  setpass(e.target.value);
                  setpassvalid(isValidPassword(e.target.value));
                }}
                onBlur={(e) => setpassvalid(isValidPassword(e.target.value))}
                className={classes.inputText}
              />
            </Box>
            <Box className={classes.btnflex} mt={5}>
              <span
                style={{ color: "brown", cursor: "pointer" }}
                onClick={() => setOpenForgotPassword(true)}
              >
                Forgot Password ? &nbsp;
              </span>
              <Button
                variant="contained"
                size="large"
                color="primary"
                component={Link}
                to="/create-account"
              >
                Sign Up
              </Button>
              &nbsp;&nbsp;

              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={Login}
                disabled={loader || !passvalid || !emailvalid}
              >
                Sign In {loader && <ButtonCircularProgress />}
              </Button>

            </Box>

          </form>
        </Container>

        <Dialog
          open={openForgotPassword}
          keepMounted
          fullWidth="sm"
          maxWidth="sm"
          onClose={() => setOpenForgotPassword(false)}
        >
          <DialogContent>
            {verificationSent &&
              <DialogTitle>
                <Typography
                  variant="h4"
                  style={{ color: "#792034", marginBottom: "10px", textAlign: 'center' }}
                >
                  Security verification
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#999", marginBottom: "10px", textAlign: 'center' }}
                >
                  To secure your account, please complete the following verification.
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenForgotPassword(false)}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
            }
            <DialogContentText>
              {!verificationSent &&
                <Box mt={3}>
                  <Typography
                    variant="h6"
                    style={{ color: "#792034", marginBottom: "5px" }}
                  >
                    Forgot Password
                  </Typography>
                  <Typography
                    variant="body"
                    component="p"
                    style={{ fontSize: "14px" }}
                  >
                    Enter the email address associated with your account and we'll
                    send you a code to reset your password.
                  </Typography>

                  <label className={classes.labelText}>Your Email Account</label>
                  <TextField
                    placeholder={email}
                    className={classes.inputText}
                    type="email"
                    error={!emailvalid}
                    helperText={
                      !emailvalid && "Incorrect Email."
                    }
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                      setemailvalid(isValidEmail(email));
                    }}
                  />

                </Box>
              }
              {verificationSent &&
                <Box mt={3}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email Verification Code"
                    name="code"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="text" onClick={forgotPasswordHandler} disabled={resendTimer || loader}>
                            {resendTimer ? `Resend in ${resendTimer}s` : 'Get Code'}
                          </Button>
                        </InputAdornment>
                      ),
                      maxLength: 6,
                    }}
                    error={code.length != 6}
                    helperText={
                      "Enter the 6-digit code sent to your email"
                    }
                    value={code}
                    onChange={(e) => setcode(e.target.value)}
                  />
                  <TextField
                    type={showpass ? "text" : "password"}
                    hintText="At least 8 characters"
                    fullWidth
                    name="newPassword"
                    label="Enter your new password"
                    error={!passvalid}
                    onBlur={() => { setpassvalid(isValidPassword(pass)) }}
                    value={pass}
                    onChange={(e) => { setpass(e.target.value); setpassvalid(isValidPassword(pass)) }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setshowpass(!showpass)}
                          >
                            {showpass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText>
                    {!isValidPassword(pass) && (
                      <span>
                        Must be at least 8 characters long<br />
                        Must have at least 1 uppercase letter<br />
                        Must have at least 1 lowercase letter<br />
                        Must have at least 1 digit<br />
                        Must have at least 1 special case character<br />
                      </span>
                    )}
                  </FormHelperText>
                </Box>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!verificationSent &&
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={forgotPasswordHandler}
                disabled={resetloader || !emailvalid}
              >
                Continue {resetloader && <ButtonCircularProgress />}
              </Button>
            }
            {verificationSent &&
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={resetloader || code.length != 6 || !passvalid}
                onClick={resetPaswordHandler}
              >
                Submit and Reset
                {resetloader && <ButtonCircularProgress />}
              </Button>
            }
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
  );
}
