import React, { useState, useEffect } from "react";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { useNavigate } from "react-router-dom";

import {
  Box,
  makeStyles,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@material-ui/core";
import moment from "moment";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import { Pagination } from "@material-ui/lab";
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
  table: {
    minWidth: 320,
    border: "1px solid #e5e3dd",
    "& th": {
      border: "1px solid #e5e3dd",
    },
    "& td": {
      border: "1px solid #e5e3dd",
    },
  },
  tbody: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f3f3f3",
    },
  },
}));

export default function DonateList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [donateList, setDonateList] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const donationListHandler = async () => {
    setLoadingDonations(true);
    await axios({
      method: "GET",
      url: Apiconfigs.donationTransactionlist,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        limit: 10,
        page: page,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setDonateList(res?.data?.result?.docs);
          setPages(res?.data?.result?.pages);
        } 
          setLoadingDonations(false);
      })
      .catch((err) => {
        setLoadingDonations(false);
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      donationListHandler();
    }
  }, [page]);

  return (
    <Box className={classes.LoginBox} mb={5}>
      {donateList && donateList.length === 0 ? (
        <Box align="center" mt={4} mb={5}>
          <NoDataFound />
        </Box>
      ) : (
        <TableContainer className={classes.Paper} component={Paper}>
          {loadingDonations ? (
            <DataLoading />
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead
                style={{
                  background:
                    "linear-gradient(180deg, #c04848 0%, #480048 100%)",
                }}
              >
                <TableRow>
                  
                  <TableCell align="Center" style={{ color: "white" }}>
                    Payment date
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    Amount
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    Beneficiary
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    Receipt Id
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donateList &&
                  donateList?.map((row, index) => (
                    <TableRow className={classes.tbody} key={row.coinName}>
                      
                      <TableCell style={{ color: "black" }} align="Center">
                        {moment(row?.updatedAt).format("DD-MM-YYYY hh:mm A")}
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {row?.amount ? row?.amount : 0}&nbsp;{row?.coinName}
                      </TableCell>
                      
                      <TableCell
                        style={
                          row?.toDonationUser?.userName
                            ? { color: "blue", cursor: "pointer" }
                            : { color: "black" }
                        }
                        align="Center"
                        onClick={() => {
                          if (row?.toDonationUser?.userName) {
                            navigate('/user-profile'+row?.toDonationUser?.userName);
                          }
                        }}
                      >
                        {row?.toDonationUser?.userName
                          ? row?.toDonationUser?.userName
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {row?._id ? row?._id : "N/A"}
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {row.transactionStatus}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
        <Box mb={2} mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
    </Box>
  );
}
