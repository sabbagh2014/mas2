import { Box, Typography } from "@material-ui/core";
import React from "react";
import Page from "src/component/Page";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Page title="page not found!">
      <Box pt={20} align="center">
      <Link to="/">
      <img src="/images/404.png"/> <br/>
      <Typography variant="h3" style={{color:"#000", marginTop:"10px",}}>Page requested not found</Typography>
      <Typography variant="h2" style={{color:"#000", marginTop:"10px",}}>Go Back to Home Page</Typography>
        </Link>
      </Box>
    </Page>
  );
}
