
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import axios from "axios";
import { toast } from "react-toastify";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

export const VerifyOtp = ({ 
  open, 
  handleClose, 
  channels=['email', 'sms'], 
  context, 
  payload={},
  emailVerificationSent=true,
  smsVerificationSent=true,
  successCallback
}) => {

  const [emailResendTimer, setemailResendTimer] = useState(emailVerificationSent && 60);
  const [smsResendTimer, setsmsResendTimer] = useState(smsVerificationSent && 60);
  const [code, setCode] = useState({
    email:"",
    sms: ""
  });
  const [validatecode, setvalidatecode] = useState({
    email:"",
    sms: ""
  });

  const [emailVerified, setEmailVerified] = useState(channels.includes('email') ? false : null);
  const [phoneVerified, setPhoneVerified] = useState(channels.includes('sms') ? false : null);
  
  const [loader, setloader] = useState(false);

  const handleChange = (event) => {
    setCode({ ...code, [event.target.name]: event.target.value });
  };
    
  const verifyOtpHandler = async () => {
    setloader(true);
    for (const channel of channels) {
      if(channel === 'email' && emailVerified) return true;
      if(channel === 'sms' && phoneVerified) return true;
      if (code[channel].length != 6){
          setvalidatecode({...validatecode, [channel]: 'Please enter a 6-digit verification code.' });
          setloader(false);
      } else  {
        try {
          setloader(true);
          const res = await axios.post(Apiconfigs.verifyOtp, 
            {
              otp: code[channel],
              channel: channel,
              context: context,
              txid: context === 'withdraw' ? payload : null
            },
            {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });
          
          if(res.data.result.verified){
            channel === 'email' ? setEmailVerified(true) : setPhoneVerified(true);
          } else {
            toast.error(res.data.responseMessage);
            setvalidatecode({...validatecode, [channel]: res.data.responseMessage });
          }
        } catch(error) {
          console.log(error.message);
          if (error.response) {
            toast.error(error.response.data.responseMessage);
          } else {
            toast.error(error.message);
          }
          setloader(false);
        }
      }
    }
    setloader(false);
              
  }

  useEffect(() => {
    if(emailVerified){
      setTimeout(() => successCallback(), 1000);
    }
  },[emailVerified, phoneVerified]);

  const sendOTPHandler = async (channel) => {
    try {
      setloader(true);
      const res = await axios.post(Apiconfigs.sendOtp, 
        {
          channel: channel,
          context: context,
        },
        {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setloader(false);
        channel === 'email' && setemailResendTimer(60);
        channel === 'sms' && setsmsResendTimer(60);
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
      setloader(false);
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      setloader(false);
    }
  };

  useEffect(() => {
      let emailtimeout;
      if (emailResendTimer && emailResendTimer >= 0) {
        emailtimeout = setTimeout(() => setemailResendTimer(emailResendTimer - 1), 1000);
      } else {
        setemailResendTimer();
        clearTimeout(emailtimeout);
      }
  });

  useEffect(() => {
    let smstimeout;
    if (smsResendTimer && smsResendTimer >= 0) {
      smstimeout = setTimeout(() => setsmsResendTimer(smsResendTimer - 1), 1000);
    } else {
      setsmsResendTimer();
      clearTimeout(smstimeout);
    }
});

    return (
            <Dialog
              fullWidth
              maxWidth="sm"
              open={open}
              onClose={() => handleClose}
            >
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
                  onClick={handleClose}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#333',
                  }}
                >
                <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                {channels.includes('email') &&
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email Verification Code"
                    name="email"
                    disabled={emailVerified}
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {emailVerified ? <CheckCircleOutlineIcon fontSize="16" htmlColor="green" /> :
                          <Button variant="text" onClick={() => sendOTPHandler('email')} disabled={emailResendTimer || loader}>
                            {emailResendTimer ? `Resend in ${emailResendTimer}s`:'Get Code'}
                          </Button>}
                        </InputAdornment>
                      ),
                      maxLength: 6,
                    }}
                    error={validatecode.email}
                    helperText={
                      validatecode.email ? validatecode.email :"Enter the 6-digit code sent to your email"
                    }
                    value={code.email}
                    onChange={handleChange}
                  />
                }

                {channels.includes('sms') &&
                <TextField
                    fullWidth
                    margin="normal"
                    label="Phone Number Verification Code"
                    name="sms"
                    disabled={phoneVerified}
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {phoneVerified ? <CheckCircleOutlineIcon fontSize="16" htmlColor="green" /> :
                          <Button variant="text" onClick={() => sendOTPHandler('sms')} disabled={smsResendTimer || loader}>
                           {smsResendTimer ? `Resend in ${smsResendTimer}s`:'Get Code'}
                          </Button>}
                        </InputAdornment>
                      ),
                      maxLength: 6,
                    }}
                    error={validatecode.sms}
                    helperText={
                      validatecode.sms ? validatecode.sms : "Enter the 6-digit code sent to you via SMS"
                    }
                    value={code.sms}
                    onChange={handleChange}
                  />
                }
                  
                  
              </DialogContent>
              <DialogActions>
                {context === 'register' && <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => successCallback()}
                >
                  Do it later
                </Button>}
                <Button 
                variant="contained"
                color="secondary"
                disabled={loader || 
                channels.includes('email') && code.email.length != 6 ||
                channels.includes('sms') && code.sms.length != 6
                }
                onClick={() => verifyOtpHandler()}>
                  Submit {loader && <ButtonCircularProgress />}
                </Button>
              </DialogActions>
            </Dialog>
    );
}