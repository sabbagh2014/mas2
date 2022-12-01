import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment
} from "@material-ui/core";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { toast } from "react-toastify";

export default function SocialAccounts() {
  const user = useContext(UserContext);
  const [youtube, setyoutube] = useState(user.link.useryoutube);
  const [twitter, settwitter] = useState(user.link.usertwitter);
  const [facebook, setfacebook] = useState(user.link.userfacebook);
  const [telegram, settelegram] = useState(user.link.usertelegram);
  const [isLoading, setIsloading] = useState(false);

  const save = () => {

    
      axios({
        method: "PUT",
        url: Apiconfigs.updateprofile,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          facebook: facebook,
          twitter: twitter,
          youtube: youtube,
          telegram: telegram,
        },
      }).then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success("Your social links has been updated successfully");
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

 
  };

  return (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Social Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Box mb={2}>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={facebook}
                  placeholder="Please enter your facebook page url"
                  error={!facebook}
                  helperText={!facebook && "Invalid URL" }
                  onChange={(e) => setfacebook(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      <FacebookIcon /> {' https://fb.com/'}
                      </InputAdornment>
                    )}}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={twitter}
                  placeholder="Please enter your twitter @username"
                  error={!twitter}
                  helperText={!twitter &&  "twitter userName"}
                  onChange={(e) => settwitter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      <TwitterIcon /> {' @'}
                      </InputAdornment>
                    )}}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={telegram}
                  placeholder="Please enter your telegram @username"
                  error={!telegram}
                  helperText={!telegram && "Invalid telegram username"}
                  onChange={(e) => settelegram(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      <TelegramIcon /> {' @'}
                      </InputAdornment>
                    )}}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={youtube}
                  placeholder="Please enter your youtube channel url"
                  error={!youtube}
                  helperText={!youtube && "Invalid youtube channel URL"}
                  onChange={(e) => setyoutube(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      <YouTubeIcon /> {' https://www.youtube.com/c/'}
                      </InputAdornment>
                    )}}
                />
            </Box>
            <Box>
                  <Button
                    variant="outlined"
                    disabled={isLoading}
                    onClick={save}
                  >
                    {isLoading ? "Updating social links..." : "Save"}
                    {isLoading && <ButtonCircularProgress />}
                    
                  </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
  );
}
