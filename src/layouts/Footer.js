import React, { Suspense } from "react";
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import TelegramIcon from "@material-ui/icons/Telegram";
import { FaFacebookF } from "react-icons/fa";
import { GrMedium } from "react-icons/gr";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import axios from "axios";
import useSWR from 'swr';
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footerSection: {
    width: "100%",
    padding: "20px",
    background: "#e5e3dd"
  },

  footerLink: {
    padding: "0px",
    "& h5": {
      fontSize: "12px"
    }
  },

  socialIcon: {
    margin: '4px',
    color: "#fff",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  }

}));

const fetcher = url => axios.get(url).then(res => res.data.result);

const StaticContentSection = () => {
  const classes = useStyles();
  const { data: staticContent } = useSWR(Apiconfigs.staticContentList, fetcher, { suspense: true })
  return (
    <>
      <Grid item xs={5} sm={3} md={2}>
        {staticContent.slice(0, 4).map((row, i) => {
          return (
            <List key={i}>
              <ListItem  className={classes.footerLink}>
                <Link
                  style={{ color: '#222', textDecoration: 'none', }}
                  to={"/corporate/" + row.type}
                  state={{
                    data: {
                      title: row.title,
                      html: row.description
                    }
                  }}
                >
                  <Typography variant="h5"> {row.title}</Typography>
                </Link>
              </ListItem>
            </List>
          );
        })}
      </Grid>
      <Grid item xs={5} sm={3} md={2}>
        {staticContent.slice(4, 8).map((row, i) => {
          return (
            <List key={i}>
              <ListItem className={classes.footerLink}>
                <Link
                  style={{ color: '#222', textDecoration: 'none', }}
                  to={"/corporate/" + row.type}
                  state={{
                    data: {
                      title: row.title,
                      html: row.description
                    }
                  }}
                >
                  <Typography  variant="h5"> {row.title}</Typography>
                </Link>
              </ListItem>
            </List>
          );
        })}

      </Grid>
    </>
  )
}

const SocialLinks = () => {
  const classes = useStyles();
  const { data: socialLinks } = useSWR(Apiconfigs.listSocial, fetcher, { suspense: true })
  return (
    <>
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
      >
        <Box display='flex' flexDirection='column' justifyContent='center'>
          <Typography align="center" variant="h6">
            Join The Community
          </Typography>
          <Box display='flex' justifyContent='center'>
            <Link to={socialLinks[0]?.link} target="_blank" rel="noreferrer">
              <IconButton className={classes.socialIcon}><GrMedium /></IconButton>
            </Link>
            <Link to={socialLinks[2]?.link} target="_blank" rel="noreferrer">
              <IconButton className={classes.socialIcon}><TelegramIcon /></IconButton>
            </Link>
            <Link to={socialLinks[3]?.link} target="_blank" rel="noreferrer">
              <IconButton className={classes.socialIcon}><FaFacebookF /></IconButton>
            </Link>
            <Link to={socialLinks[1]?.link} target="_blank" rel="noreferrer">
              <IconButton className={classes.socialIcon}><AiFillYoutube /></IconButton>
            </Link>
            <Link to={socialLinks[4]?.link} target="_blank" rel="noreferrer">
              <IconButton className={classes.socialIcon}><AiOutlineTwitter /> </IconButton>
            </Link>
          </Box>
        </Box>
      </Grid>
    </>
  )
}


export default function Footer() {
  const classes = useStyles();
  const { pathname } = useLocation();
  if (pathname.includes('chat')) return null;
  return (
    <Box className={classes.footerSection}>
      <Box maxWidth="xl">
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={1} justifyContent="center">
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/">
                  <img
                    src="/images/footer-logo.svg"
                    alt=""
                    className={classes.footerLogo}
                  />
                </Link>
                <Typography variant="h6" className={classes.join}>
                  masplatform.net &copy; 2022
                </Typography>


              </Grid>

              <Suspense fallback={<div>loading...</div>}>
                <StaticContentSection />
              </Suspense>

              <Suspense fallback={<div>loading...</div>}>
                <SocialLinks />
              </Suspense>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
