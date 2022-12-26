import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NFTCard from "src/component/NFTCard";
import UserDetailsCard from "src/component/UserDetailsCard";
import BundleCard from "src/component/BundleCard";
import Slider from "react-slick";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import NoDataFound from "src/component/NoDataFound";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Loader from "src/component/Loader";

const useStyles = makeStyles((theme) => ({
  mas: {
    textAlign: "center",
    padding: "0px 0px 35px",
    fontFamily: "Poppins",
    fontSize: "32px",
    fontWeight: "700",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.51",
    letterSpacing: "normal",
    texAlign: "left",
    color: "#141518",
    marginTop: "70px",
  },
  LoginBox: {
    padding: "0px 0px",
  },
  namemas: {
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

const AuctionPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [auctionList, setAuctionList] = useState([]);
  const [allNFTList, setAllNFTList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isLoadingCreators, setIsLoadingCreators] = useState(false);
  const [isLoadingBundles, setIsBundlesLoading] = useState(false);
  const [isLoadingAuctions, setIsLaodingAuctions] = useState(false);
  const settings = {
    dots:false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    autoplay: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
          autoplay: false,
        },
      },
    ],
  };

  const auctionNftListHandler = async () => {
    setIsLaodingAuctions(true);
    await axios({
      method: "GET",
      url: Apiconfigs.allorder,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result) {
            setAuctionList(res.data.result);
            setIsLaodingAuctions(false);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLaodingAuctions(false);
      });
  };

  const listAllNftHandler = async () => {
    setIsBundlesLoading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFTList(res.data.result);
        }
        setIsLoading(false);
        setIsBundlesLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsBundlesLoading(false);
        console.log(err.message);
      });
  };

  const getuser = async () => {
    setIsLoading(true);
    setIsLoadingCreators(true);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      params: {
        limit: 10,
        userType: "Creator",
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setUserListToDisplay(res.data.result.docs);
            setIsLoading(false);
            setIsLoadingCreators(false);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsLoadingCreators(false);
      });
  };

  useEffect(() => {
    auctionNftListHandler();
    listAllNftHandler();
    getuser();
  }, []);

 

  return (
    <Box className={classes.LoginBox} id="talentCreater">
     
      <section>
        <div id="home_section" className={classes.namemas}>
          <Typography
            className={classes.mas}
            onClick={() => history.push("/creators")}
            style={{ cursor: "pointer" }}
          >
            Featured Talents and Creators
          </Typography>
        </div>
        &nbsp;
        <Container maxWidth="lg">
          {!isLoadingCreators && userListToDisplay.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
          ) : (
            ""
          )}
          <Grid container>
            {" "}
            <Slider {...settings} className="width100">
              {userListToDisplay.map((data, i) => {
                return (
                  <UserDetailsCard
                    data={data}
                    key={i}
                  />
                );
              })}{" "}
            </Slider>
          </Grid>
          {isLoadingCreators && <Loader />}
        </Container>
        <>
          <div id="bundle_section" className={classes.namemas}>
            <Typography
              onClick={() => history.push("/bundles")}
              style={{ cursor: "pointer" }}
              className={classes.mas}
            >
              Bundles
            </Typography>
          </div>
          <Container maxWidth="lg" style={{ marginBottom: "50px" }}>
            {!isLoadingBundles && allNFTList.length === 0 ? (
              <Box align="center" mt={4} mb={5}>
                <NoDataFound />
              </Box>
            ) : (
              ""
            )}
            <Grid container style={{ paddingTop: "25px" }}>
              <Slider {...settings} className="width100">
                {allNFTList &&
                  allNFTList.map((data, i) => {
                    return (
                      <BundleCard
                        data={data}
                        key={i}
                      />
                    );
                  })}
              </Slider>
            </Grid>
            {isLoadingBundles && <Loader />}
          </Container>
          <div className={classes.namemas} id="auctions">
            <Link style={{ marginLeft: "-30px" }} to="/auctions">
              <Typography
                style={{ marginTop: "-20px", marginBottom: "10px" }}
                className={classes.mas}
              >
                Auction
              </Typography>
            </Link>
          </div>
          <Container maxWidth="lg">
            {!isLoadingAuctions && auctionList.length === 0 ? (
              <Box align="center" mt={4} mb={5}>
                
                <Box align="center" mt={4} mb={5}>
                <Typography
                  variant="h1"
                  style={{
                    color: '#000',
                    marginBottom: '10px',
                    padding: '10px',
                    fontSize: '17px',
                  }}
                >
                  COMING SOON
                </Typography>
                <img src="images/home/nft.png" />
              </Box>
              </Box>
            ) : (
              ""
            )}
            <Grid container style={{ marginBottom: "50px" }} spacing={1}>
              <Slider {...settings} className="width100">
                {auctionList.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <NFTCard data={data} index={i} />
                    </Grid>
                  );
                })}
              </Slider>
            </Grid>
            {isLoadingAuctions && <Loader />}
          </Container>
        </>
      </section>
    </Box>
  );
};

export default AuctionPage;
