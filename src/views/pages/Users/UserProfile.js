import React from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Profile from "./Profile";
import BundlesCard from "src/component/NewBundleCard.js";
import { useParams } from "react-router-dom";
import useSWR from 'swr';

import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import DataLoading from "src/component/DataLoading";
const useStyles = makeStyles(() => ({

 
}));

const fetcher = url => axios.get(url).then(res => res.data.result);


function UserProfile() {
  const classes = useStyles();


  const { username } = useParams();
  const { data: userData } = useSWR(Apiconfigs.getUser + username, fetcher, { suspense: true })

  if (!userData) return <DataLoading />
  const userDetails = userData[0];
  return (
    <Box>
      <Profile data={userDetails} isabout={true} />
      <Container maxWidth="xl">
        
        <Typography variant="h2" align="center">
          Bundles
        </Typography>
        <Grid container justifyContent='center'>
          {userDetails?.bundleDetails?.map((data, i) => {
            return <Grid item key={i} ><BundlesCard data={data}/></Grid>
            
          })}
        </Grid>

      </Container>
    </Box>
  );
}

export default UserProfile;
