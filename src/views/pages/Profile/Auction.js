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
  FormHelperText,
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
      // height: '45px',
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
      // height: '45px',
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  dlflex: {
    "& div": {
      // marginTop: '2rem',
      margin: "0px",
      width: "100%",
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

export default function Login({ auction, updateList }) {
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
  const [importNFtPop, setImportNFTPop] = useState(false);
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
    setmessage("Uploading ipfs");
    setprocess(true);
    try {
      const formdataipfsupload = new FormData();
      formdataipfsupload.append("file", image);

      const res = await axios.post(
        Apiconfigs.ipfsupload,
        formdataipfsupload,
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );

      if (res.data.statusCode === 200) {
        const createNFTBody = {
          mediaUrl: res.data.result.imageUrl,
          mediaType: image?.name ? image.name.split(".").pop() : "png",
          title: name,
          time: date,
          tokenId: "N/A",
          startingBid: bid.toString(),
          tokenName: name,
          details: detail,
        };

        const createNFTRes = await axios.post(
          Apiconfigs.createNft,
          createNFTBody,
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
            data: {
              mediaUrl: res.data.result.imageUrl,
              mediaType: image?.name ? image.name.split(".").pop() : "png",
              title: name,
              time: date,
              tokenId: "N/A",
              startingBid: bid.toString(),
              tokenName: name,
              details: detail,
            },
          }
        );
        if (createNFTRes.data.result._id) {
          setmessage("Approving token");
          const createOrderBody = {
            title: name,
            time: date,
            tokenId: "N/A",
            startingBid: bid.toString(),
            tokenName: name,
            details: detail,
            nftId: createNFTRes.data.result._id,
          };
          axios({
            method: "POST",
            url: Apiconfigs.order,
            data: createOrderBody,
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }).then(async (res) => {
            if (res.data.statusCode === 200) {
              auth.updateUserData();
              updateList();
              setprocess(false);
              toast.success("Your order has been placed successfully");
              setfire(!fire);
              setOpenAuction(false);
            } else if (res.data.statusCode === 404) {
              setprocess(false);
              toast.error("error");
            } else {
              setprocess(false);
              toast.error("error");
            }
          });
        } else {
          setprocess(false);
          toast.error(createNFTRes.data.message);
        }
      } else {
        setprocess(false);
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      setprocess(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Box className={classes.LoginBox} mb={5}>
      <Box className={classes.masBoxFlex}>
        <Typography variant="h6">My Auctions</Typography>

        {auth?.userData?.userType === "Creator" && (
          <Box>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => setOpenAuction(true)}
            >
              Make a new auction
            </Button>
           
          </Box>
        )}
      </Box>

      <Box maxWidth="lg">
        {!auction[0] ? (
          <Box align="center" mt={4} mb={5}>
            <NoDataFound />
          </Box>
        ) : (
          ""
        )}
        <Grid container spacing={4}>
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
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={process}
          disableEscapeKeyDown={process}
        >
          <DialogTitle className={classes.dailogTitle}>
            Make a new auction
          </DialogTitle>
          <DialogContent>
            {auth.isErrorInWalletConnect && (
              <Box mb={3}>
                <FormHelperText error>{auth.connectWalletError}</FormHelperText>
              </Box>
            )}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <label style={{ margin: "0px", padding: "0px" }}>
                    
                    Title:
                  </label>
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
                        accept="image/*,video/mp4"
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
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Button
                              color="primary"
                              size="large"
                              variant="contained"
                              onClick={() => {
                                setimage("");
                                setimageurl("");
                              }}
                            >
                              Remove
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
                      style={{ padding: "0px 10px" }}
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
                    inputProps={{ min: moment().format("YYYY-MM-DDThh:mm") }}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                  <label>Starting bid:</label>
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
            {auth.isErrorInWalletConnect && (
              <Box mb={3}>
                <FormHelperText error>{auth.connectWalletError}</FormHelperText>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Box>
              <Button
                variant="contained"
                onClick={() => setOpenAuction(false)}
                color="primary"
                size="large"
                disabled={process}
              >
                cancel
              </Button>
              &nbsp;&nbsp;
              {/* {account ? ( */}
              <Button
                variant="contained"
                onClick={
                  placeOrder
                  // placeAuctionOrder
                  // setOpenAuction(false)
                }
                color="secondary"
                size="large"
                disabled={process}
              >
                {!process ? "Place Auction" : message}
                {process && <ButtonCircularProgress />}
              </Button>
              
            </Box>
          </DialogActions>
        </Dialog>
      )}
      {importNFtPop && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={importNFtPop}
          onClose={() => setImportNFTPop(false)}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={process}
          disableEscapeKeyDown={process}
        >
          <DialogTitle className={classes.dailogTitle}>Import NFT</DialogTitle>
          <DialogContent>
            {auth.isErrorInWalletConnect && (
              <Box mb={3}>
                <FormHelperText error>{auth.connectWalletError}</FormHelperText>
              </Box>
            )}
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <label style={{ margin: "0px", padding: "0px" }}>
                    
                    Title:
                  </label>
                  <TextField
                    id="standard-basic"
                    placeholder=""
                    className={classes.input_fild2}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <label style={{ margin: "0px", padding: "0px" }}>
                    
                    Contract Adress:
                  </label>
                  <TextField
                    id="standard-basic"
                    placeholder=""
                    className={classes.input_fild2}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <label style={{ margin: "0px", padding: "0px" }}>
                    
                    Token id:
                  </label>
                  <TextField
                    id="standard-basic"
                    placeholder=""
                    className={classes.input_fild2}
                    onChange={(e) => setname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <label style={{ margin: "0px", padding: "0px" }}>
                    
                    NFT URL:
                  </label>
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
                        accept="image/*,video/mp4"
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
                      style={{ padding: "0px 10px" }}
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
                    inputProps={{ min: moment().format("YYYY-MM-DDThh:mm") }}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={4}>
                  <label>Starting bid:</label>
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
            {auth.isErrorInWalletConnect && (
              <Box mb={3}>
                <FormHelperText error>{auth.connectWalletError}</FormHelperText>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Box>
              <Button
                variant="contained"
                onClick={() => setOpenAuction(false)}
                color="primary"
                size="large"
                disabled={process}
              >
                cancel
              </Button>
              &nbsp;&nbsp;
              {/* {account ? ( */}
              <Button
                variant="contained"
                onClick={
                  placeOrder
                  // placeAuctionOrder
                  // setOpenAuction(false)
                }
                color="secondary"
                size="large"
                disabled={process}
              >
                {!process ? "Place Auction" : message}
                {process && <ButtonCircularProgress />}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
