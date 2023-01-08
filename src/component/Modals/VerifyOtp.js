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
