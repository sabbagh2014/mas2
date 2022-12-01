import React from "react";
import {
  Container,
  Box,
  Typography,
} from "@material-ui/core";


const AuctionPage = () => {
  return (
    <Container maxWidth='100%' style={{ padding: '0px' }} >
    <Box align="center"
            style={{
              margin: '0px',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              mixBlendMode: 'darken',
              backgroundImage: 'url(/images/home/nft-comingsoon-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
            }}
            mt={4} mb={5}>
            <Typography
              variant="h1"
              style={{
                color: '#fffa',
                textAlign: 'center',
                fontSize: '10vw',
                textShadow: 'rgb(81 13 29) 1px 1px 4px'
              }}
            >
              COMING SOON
            </Typography>
          </Box>
          </Container>
  );
};

export default AuctionPage;
