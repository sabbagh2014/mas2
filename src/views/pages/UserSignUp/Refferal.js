import React from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles(() => ({
  input_fild: {
    backgroundColor: "#ffffff6e",
    
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
    width: "100%",
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
  basicRed: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "#d15b5b",
  },
  basicBlack: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "#141518",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  textArea: {
    paddingTop: "70px",
    paddingBottom: "30px",
  },
  qrCode: {
    height: "145.7px",
    justifyContent: "center",
    display: "flex",
  },
  align: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alignMain: {
    padding: "10px 0px",
  },
  Button: {
    display: "flex",
    justifyContent: "center",
  },
  ButtonBtn: {
    paddingTop: "30px",
    width: "max-content",
    alignItems: "center",
  },
  dilogBody3: {
    backgroundColor: "#353535",
  },
  dilogBody2: {
    boxShadow: "0 1.5px 3px 0 rgb(0 0 0 / 16%)",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    borderRadius: "50px",
    overflow: "hidden",
  },
  table: {
    "& th": {
      color: "#fff",
    },
    "& td": {
      color: "#fff",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <Box className={classes.LoginBox}>
      <Container maxWidth="sm">
        <Typography variant="h4" className={classes.basic}>
          Join Our Affilate Program
        </Typography>
        <Typography variant="h5" className={classes.basicRed}>
          Get 30% of FEES OF YOUR AFFILIATES
        </Typography>
        <Box className={classes.textArea}>
          <Typography variant="h6" className={classes.basicBlack}>
            Your Affilate LINK
          </Typography>

          <Box>
            <TextField
              placeholder="mas.com/affilate/a68dflfvd"
              variant="outlined"
              className={classes.input_fild}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">COPY</InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Typography variant="h6" className={classes.basicBlack}>
          Your Affilate QR Code
        </Typography>
        <Box className={classes.qrCode}>
          <img src="/images/users/qr.svg" alt="" />
        </Box>
        <Box className={classes.alignMain}>
          <Box className={classes.align}>
            <Typography variant="h6" className={classes.basicBlack}>
              Number of Affilates so far :
            </Typography>
            <Typography variant="h6" className={classes.basicRed}>
              15
            </Typography>
          </Box>
          <Box className={classes.align}>
            <Typography variant="h6" className={classes.basicBlack}>
              Your Earnings so Far :
            </Typography>
            <Typography variant="h6" className={classes.basicRed}>
              1000 USDT
            </Typography>
          </Box>
        </Box>

        <Box className={classes.Button} mb={5}>
          <Grid>
            <Box className={classes.ButtonBtn}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
              >
                Withdraw Your Earnings
              </Button>
              <Typography className={classes.basicBlack}>
                <small>
                  ETH fees and
                  <Link
                    style={{
                      color: "#063d6d",
                      textDecoration: "underline",
                      fontWeight: "500",
                    }}
                    onClick={handleClickOpen2}
                  >
                    
                    MAS fees
                  </Link>
                  apply.
                </small>
                {/* <Button>ETH fees and MAS fees apply.</Button> */}
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Container>

      {/* mas table */}

      <Dialog
        open={open2}
        fullWidth="md"
        maxWidth="md"
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dilogBody3}>
          <DialogContentText id="alert-dialog-description">
            <Box className={classes.dilogBody2}>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="center">$MAS HELD</TableCell>
                      <TableCell align="center">PROFILE BADGE</TableCell>
                      <TableCell align="center">CONTENT CREATOR FEES</TableCell>
                      <TableCell align="center">CONTENT CREATOR FEES</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>BASIC</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">No</TableCell>
                      <TableCell align="center">3%</TableCell>
                      <TableCell align="center">0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SILVER</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">No</TableCell>
                      <TableCell align="center">3%</TableCell>
                      <TableCell align="center">0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>GOLD</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">
                        <Typography
                          style={{ display: "flex", justifyContent: "center" }}
                          alignItems="center"
                        >
                          GOLD
                          <img
                            src="/images/gold-check.svg"
                            style={{ marginLeft: "5px", width: "25px" }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">3%</TableCell>
                      <TableCell align="center">0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>DIAMOND</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">
                        <Typography
                          style={{ display: "flex", justifyContent: "center" }}
                          alignItems="center"
                        >
                          DIAMOND
                          <img
                            src="/images/blue-check.svg"
                            width="25"
                            style={{ marginLeft: "5px" }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">3%</TableCell>
                      <TableCell align="center">0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MAS PLUS</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">
                        <Typography
                          style={{ display: "flex", justifyContent: "center" }}
                          alignItems="center"
                        >
                          MAS PLUS
                          <img
                            src="/images/blue-check.svg"
                            width="25"
                            style={{ marginLeft: "5px" }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">3%</TableCell>
                      <TableCell align="center">0%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
