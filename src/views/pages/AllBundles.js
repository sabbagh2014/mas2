import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Bundlecard from "src/component/NewBundleCard";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";

const useStyles = makeStyles(() => ({
  pageTitle: {
    height: "24.5px",
    textAlign: "center",
    padding: "20px 0px",
    fontFamily: "Poppins",
    fontSize: "21.5px",
    fontWeight: "700",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.51",
    letterSpacing: "normal",
    texAlign: "left",
    color: "#141518",
  },
  container: {
    padding: "50px 0px",
  },
  heading: {
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    "@media(max-width:1280px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const AllBundlesPage = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allNFTList, setAllNFTList] = useState([]);
  console.log("allNFTList", allNFTList);
  const [isLoading, setIsLoading] = useState(true);

  const listAllNftHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setAllNFTList(res.data.result);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.message);
      });
  };

  useEffect(() => {
    if (auth.userData?._id && auth.userLoggedIn) {
      listAllNftHandler();
    }
  }, [auth.userLoggedIn, auth.userData]);

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <DataLoading />
      ) : (
        <section>
          {auth.userLoggedIn && auth.userData?._id && (
            <>
              <div className={classes.heading}>
                <Typography variant="h2" className={classes.pageTitle}>ALL BUNDLES</Typography>
              </div>
              <Container maxWidth="lg">
                {allNFTList.length === 0 ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  ""
                )}
                <Grid container spacing={2}>
                  {allNFTList.map((data, i) => {
                   
                    return (
                      <Grid
                        item
                        key={i}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className={classes.gridbox}
                      >
                        <Bundlecard
                          data={data}
                          index={i}
                          callbackFn={listAllNftHandler}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            </>
          )}
        </section>
      )}
    </Box>
  );
};

export default AllBundlesPage;
