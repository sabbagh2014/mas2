import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  makeStyles,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useNavigate } from "react-router";
import { AddBundlePopup } from "./Bundles";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
const useStyles = makeStyles(() => ({
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
      height: "45px",
    },
  },
  Button: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "25px",
  },
  ButtonBtn: {
    paddingTop: "30px",
    width: "200px",
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px",
    paddingTop: "10px",
    color: "#141518",
    "& p": {
      fontSize: "15px",
      color: "#707070",
      paddingLeft: "5px",
    },
  },
  inputbox: {
    width: "100%",
    height: "150px",
  },
  LoginBox: {
    paddingBottom: "50px",
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
    position: "relative",
    "& input": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      opacity: "0",
    },
  },
}));

const currencies = [
  {
    value: "PUBLIC",
    label: "PUBLIC",
  },
  {
    value: "PRIVATE",
    label: "PRIVATE",
  },
];

export default function ShareAudience() {
  const [openAddBundle, setOpenAddBundle] = useState(false);
  const [list, setlist] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");
  const [loader, setloader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [activities, setActivities] = useState("");
  const [bundles, setBundles] = useState([]);
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/{
  };
  const submitHandler = async () => {
    setIsSubmit(true);
    if (
      img !== "" &&
      title !== "" &&
      details !== "" &&
      list.length > 0 &&
      activities !== ""
    ) {
      const formData = new FormData();
      formData.append("mediaUrl", img);
      formData.append("title", title);
      formData.append("details", details);
      formData.append("postType", activities);
      formData.append("nftIds", JSON.stringify(list));
      setIsSubmit(false);
      setloader(true);
      axios({
        method: "Post",
        url: Apiconfigs.share,
        headers: {
          token: sessionStorage.getItem("token"),
          Accept: "application/json",
        },
        data: formData,
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.responseMessage);
            setloader(false);
            navigate("/profile");
          } else {
            toast.error(res.data.responseMessage);
            setloader(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setloader(false);
        });
    }
  };

  const bundle = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.bundleList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setBundles(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    bundle();
  }, []);

  const updateSelectedBundle = (data) => {
    const status = list.includes(data);
    if (status) {
      const index = list.indexOf(data);
      if (index > -1) {
        list.splice(index, 1);
        setlist(list);
      }
    } else {
      setlist([...list, data]);
    }
  };

  return (
    <Box className={classes.LoginBox}>
      <Container maxWidth="xl">
        <Typography variant="h4" className={classes.basic}>
          Share with your audience
        </Typography>
        <Box className>
          <Box mt={5}>
            <Grid container spacing={1}>
              
              <Grid item xs={12} md={5}>
                <label className={classes.name}> Title:</label>
                <TextField
                  fullWidth
                  id="standard-basic"
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={isSubmit && title === ""}
                  helperText={
                    isSubmit && title === "" && "Please enter valid title"
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={5}>
                <label className={classes.name}> Details: </label>
                <JoditEditor
                  className={classes.input_fild22}
                  ref={editor}
                  value={details}
                  config={config}
                  tabIndex={8} // tabIndex of textarea
                  style={{ color: "#222" }}
                  onBlur={(newContent) => {
                    // const temp = { ...details, newContent }
                    setDetails(newContent);
                  }} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    console.log("newContent", newContent);
                    // const temp = { ...details, newContent }
                    // setdetails(temp)
                  }}
                />
                
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={5}>
                <label className={classes.name}> Upload a photo/video: </label>
                <Box className={classes.UploadBox}>
                  <label htmlFor="raised-button-file">
                    <input
                      accept="image/*,video/mp4"
                      style={{ display: "none" }}
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                        setImage(URL.createObjectURL(e.target.files[0]));
                      }}
                      type="file"
                    />
                    {image ? (
                      <>
                        <img src={image} alt="" width="200px" />
                        <Box textAlign="center">
                          <Button
                            color="primary"
                            size="large"
                            variant="contained"
                            onClick={() => {
                              setImg("");
                              setImage("");
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
                          Upload photo/video&nbsp;
                          <CloudUploadIcon />
                        </Button>
                      </label>
                    )}
                  </label>
                </Box>
                {isSubmit && image === "" && (
                  <FormHelperText error>Please select image</FormHelperText>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={5}>
                <label className={classes.name}> Select post type </label>
                <Box>
                  <Select
                    fullWidth
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    error={isSubmit && activities === ""}
                    helperText={
                      isSubmit && activities === "" && "Please select post type"
                    }
                  >
                    {currencies.map((data, i) => {
                      return (
                        <MenuItem key={data.value} value={data.value}>
                          {data.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <label className={classes.name}>
                  Select a bundle to share with:
                </label>
                <Box style={{ justifyContent: "start" }}>
                  {bundles && bundles.length === 0 && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      style={{ minWidth: "200px" }}
                      onClick={() => setOpenAddBundle(true)}
                    >
                      Create A Bundle
                    </Button>
                  )}
                  {bundles.map((data, i) => {
                    const status = list.includes(data._id);

                    return (
                      <Box
                        key={i}
                        mr={2}
                        style={
                          status
                            ? {
                                width: "200px",
                                height: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#c04848",
                                color: "white",
                              }
                            : {
                                width: "200px",
                                height: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }
                        }
                        onClick={() => {
                          updateSelectedBundle(data._id);
                        }}
                      >
                        <Typography >
                          {data.tokenName}
                        </Typography>

                        {status ? <span>selected</span> : ""}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
              {isSubmit && list.length === 0 && (
                <FormHelperText error>Please select bundle</FormHelperText>
              )}
            </Box>
          </Box>
        </Box>

        <Box align="center" mt={5}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            style={{ minWidth: "200px" }}
            onClick={submitHandler}
            disabled={loader}
          >
            Share {loader && <ButtonCircularProgress />}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ minWidth: "200px", marginLeft: 8 }}
            disabled={loader}
            onClick={() => navigate('/profile')}
          >
            Back
          </Button>
        </Box>
      </Container>
      {openAddBundle && (
        <AddBundlePopup
          open={openAddBundle}
          handleClose={() => setOpenAddBundle(false)}
          callbackFun={bundle}
        />
      )}
    </Box>
  );
}
