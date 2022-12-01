import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
  Input,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  DialogActions,
} from "@material-ui/core";
import moment from "moment";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import NoDataFound from "src/component/NoDataFound";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  input_fild: {
    backgroundColor: "#ffffff6e",
    
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
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
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  LoginBox: {
    paddingTop: "20px",
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#000",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  dailogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
  },
  input_fild22: {
    width: "100%",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  dlflex: {
    "& div": {
      marginTop: "2rem",
      "& span": {
        border: "1px solid #e8e7e7",
        fontSize: "20px",
        padding: "7px",
        marginRight: "6px",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function MyBids({ auction, updateList }) {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [OpenAuction, setOpenAuction] = useState(false);
  const [name, setname] = useState("");
  const [date, setdate] = useState(moment().format("YYYY-MM-DDThh:mm"));
  const [image, setimage] = useState();
  const [imageurl, setimageurl] = useState("");
  const [detail, setdetail] = useState("");
  const [bid, setbid] = useState("");
  const [process, setprocess] = useState(false);
  const [message, setmessage] = useState("");
  const [fire, setfire] = useState(false);

  const placeOrder = async () => {
    if (name === "") {
      toast.error("Empty Name");
      return;
    }
    if (date === "") {
      toast.error("Empty Date");
      return;
    }
    if (!image) {
      toast.error("Empty Image");
      return;
    }
    if (detail === "") {
      toast.error("Empty Details");
      return;
    }
    if (bid === "") {
      toast.error("Empty Bid");
      return;
    }
    setmessage("Creating Auction...");
    setprocess(true);
    try {
      const formData = new FormData();
      formData.append("file", image);
      console.log("form", formData);
      console.log("image", image);
      formData.append("tokenName", name);
      formData.append("bundleTitle", name);
      formData.append("duration", date);
      formData.append("bundleName", name);
      formData.append("details", detail);
      formData.append("donationAmount", bid);

      const formdatas = new FormData();
      formdatas.append("title", name);
      formdatas.append("time", date);
      formdatas.append("startingBid", bid.toString());
      formdatas.append("file", image);
      formdatas.append("tokenName", name);
      formdatas.append("details", detail);
      axios({
        method: "POST",
        url: Apiconfigs.order,
        data: formdatas,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            auth.updateUserData();
            updateList();
            console.log(res);
            setprocess(false);
            toast.success("Order Placed");
            setfire(!fire);
            setOpenAuction(false);
          } else if (res.data.statusCode === 404) {
            setprocess(false);
            toast.error("error");
          } else {
            setprocess(false);
            toast.error("error");
          }
        })
        .catch((err) => {
          setprocess(false);
          console.log(err.message);
          toast.error("error");
        });
      // }
      // })
      // .catch((err) => {});
    } catch {
      setprocess(false);
      toast.error("error");
    }
  };

  return (
    <Box className={classes.LoginBox} mb={5}>
      <Box className={classes.masBoxFlex}>
        <Typography variant="h6">My Bids</Typography>
        
      </Box>

      <Box maxWidth="lg">
        {!auction[0] ? (
          <Box align="center" mt={4} mb={5}>
            <NoDataFound />
          </Box>
        ) : (
          ""
        )}
        <Grid container spacing={2}>
          {auction.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {OpenAuction && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={OpenAuction}
          onClose={() => setOpenAuction(false)}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle className={classes.dailogTitle}>
            Make a new auction
          </DialogTitle>
          <DialogContent>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label> Title:</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    placeholder=""
                    className={classes.input_fild2}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                  <label>Upload a photo or video:</label>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box className={classes.UploadBox}>
                   
                    <label htmlFor="raised-button-file">
                     
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        onChange={(e) => {
                          setimage(e.target.files[0]);
                          setimageurl(URL.createObjectURL(e.target.files[0]));
                        }}
                        type="file"
                      />
                      {imageurl ? (
                        <>
                          <img src={imageurl} alt="" width="200px" />
                          <Box>
                            <Button
                              variant="outined"
                              color="primary"
                              component="span"
                            >
                              Uploaded Successfully
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="outined"
                            color="primary"
                            component="span"
                          >
                            Upload &nbsp;
                            <CloudUploadIcon />
                          </Button>
                        </label>
                      )}
                    </label>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                  <label>Details:</label>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box className={classes.UploadBox}>
                    <TextField
                      id="standard-basic"
                      placeholder=""
                      className={classes.input_fild22}
                      multiline
                      maxRows={6}
                      rows={6}
                      onChange={(e) => setdetail(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                  <label>Expiry time:</label>
                </Grid>
                <Grid item xs={12} md={8} className={classes.dlflex}>
                  <TextField
                    id="datetime-local"
                    onChange={(e) => setdate(e.target.value)}
                    value={date}
                    type="datetime-local"
                    // defaultValue='2021-09-12T23:08'
                    min={new Date()}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* <Box className={classes.timings}>
                    <span>{d} Days</span>
                    <span>{h}</span>
                    <span>{m}</span>
                    <span>{s}</span>
                  </Box> */}
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                  <label>starting bid:</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Input
                    placeholder=""
                    className={classes.input_fild2}
                    type="number"
                    onChange={(e) => setbid(e.target.value)}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">MAS</InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => setOpenAuction(false)}
              color="primary"
              size="large"
            >
              cancel
            </Button>
            <Button
              variant="contained"
              onClick={
                placeOrder
                // setOpenAuction(false)
              }
              color="secondary"
              size="large"
              disabled={process}
            >
              {!process ? "Place Auction" : message}
              {process && <ButtonCircularProgress />}
            </Button>
            {/* {!process ? (
             
            ) : (
              <>
                <CircularProgress />
                ...{message}
              </>
            )} */}
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
