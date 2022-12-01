import React from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SubscribtionsCard from "src/component/SubscribtionsCard";
import { Carousel } from 'react-responsive-carousel';

const useStyles = makeStyles(() => ({
  welcomeback: {
    width: "194.5px",
    height: "18px",
    margin: "13.8px 1px 24.5px 10px",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#000",
  },
  border: {
    border: "2px solid black",
    width: "fit-content",
  },
  Bids: {
    display: "flex",
    flexDirection: "column",
  },
  center: {
    display: "flex",
    // justifyContent: "center",
    marginTop: "30px",
    marginBottom: "20px",
    color: "#000000",
  },
  LoginBox: {
    paddingBottom: "50px",
  },
  favoritetitle: {
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    padding: "20px ",
    textAlign: "center",
    fontSize: "22.5px",
    fontWeight: "600",
    color: "#fff",
  },
  cardslider: {
    boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    // border: "solid 0.5px #e5e3dd",
    padding: "30px 0",
    backgroundImage:
      "linear-gradient(to bottom, #03001e7a 77%, #7303c073 84%, #ec38bc6e 93%, #fdeff9)",
    "& h4": {
      color: "#fff",
      display: "flex",
      alignItems: "center",
    },
    "& p": {
      color: "#fff !important",
      marginTop: "10px",
      textAlign: "left",
    },
  },
  mas: {
    padding: "30px 0",
    marginBottom: "30px",
    borderBottom: " solid 0.5px #707070",
  },
}));

function Bids(props) {
  const classes = useStyles();
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    className: "recomended",
    autoplay: false,
    autoplaySpeed: 3000,
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
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "20px",
          autoplay: false,
        },
      },
    ],
  };
  return (
    // <Page title="Marketplace | Fungy">
    <Box className={classes.LoginBox}>
      <Box className={classes.favoritetitle}>
        Find a new MAS. Connect to your favorite one!
      </Box>

      <Box className={classes.cardslider}>
        <Container maxWidth="lg">
          <Carousel centerMode={true} centerSlidePercentage={25} numItemsPerView={4}>
            <Box>
              <Box display="flex" alignItems="center">
                <figure >
                  <img src="/images/user-profile.png" />
                  <Box></Box>
                </figure>
                <Typography variant="h4">
                  Adams Berg
                  <img
                    src="/images/blue-check.png"
                    style={{ width: "30px", paddingLeft: "5px" }}
                  />
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>

            <Box>
              <Box display="flex" alignItems="center">
                <figure >
                  <img src="/images/user-profile.png" />
                  <Box></Box>
                </figure>
                <Typography variant="h4">
                  Adams Berg
                  <img
                    src="/images/blue-check.png"
                    style={{ width: "30px", paddingLeft: "5px" }}
                  />
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>

            <Box>
              <Box display="flex" alignItems="center">
                <figure >
                  <img src="/images/user-profile.png" />
                  <Box></Box>
                </figure>
                <Typography variant="h4">
                  Adams Berg
                  <img
                    src="/images/blue-check.png"
                    style={{ width: "30px", paddingLeft: "5px" }}
                  />
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Typography>
            </Box>
          </Carousel>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="lg" className={classes.mas}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} align="center">
              <Typography variant="h6" style={{ color: "#707070" }}>
                MAS
              </Typography>
              <Typography variant="h2" style={{ color: "#000" }}>
                500
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} align="center">
              <Typography variant="h6" style={{ color: "#707070" }}>
                
                bundles
              </Typography>
              <Typography variant="h2" style={{ color: "#000" }}>
                1,000
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} align="center">
              <Typography variant="h6" style={{ color: "#707070" }}>
                
                clients
              </Typography>
              <Typography variant="h2" style={{ color: "#000" }}>
                2,500
              </Typography>
            </Grid>
            <Grid item xs={6} md={3} align="center">
              <Typography variant="h6" style={{ color: "#707070" }}>
                
                money raised
              </Typography>
              <Typography variant="h2" style={{ color: "#000" }}>
                1,000,000 USD
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box>
          <div className={classes.center}>
            <Typography variant="h2">Newest MAS</Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
            <Grid item xs={12} md={3}>
              
              <SubscribtionsCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
    // </Page>
  );
}

export default Bids;
