import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core'
import HomeCard from 'src/component/HomeCard'
import parse from 'html-react-parser';

const useStyles = makeStyles(() => ({
  mainSection: {
    padding: '30px 0px',
    backgroundImage: 'linear-gradient(45deg, #240b36 30%, #000 90%)',
  },
  rightSection: {
    color: '#d0dfde',
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '4px',
      marginBottom: '60px',
      '@media(max-width:767px)': {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '0px',
        letterSpacing: '3px',
      },
    },
    '& h4': {
      margin: '30px 0px',
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      '@media(max-width:767px)': {
        fontSize: '10px',
        fontWeight: '300',
        margin: '0px 0px',
        lineHeight: '23px',
        letterSpacing: '2px',
      },
    },
  },
  leftSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      maxWidth: '450px',
    },
  },
}))
export default function HowItWorks({ howItWorks }) {
  const classes = useStyles()
  return (
    <Box className={classes.mainSection}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <Box className={classes.leftSection}>
              <img
                src={
                  howItWorks?.contentFile
                    ? howItWorks?.contentFile
                    : 'images/home/banner2.png'
                }
                alt=""
              />
            </Box>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <Box className={classes.rightSection}>
              <Typography variant="h2" >
                How It Works
              </Typography>
              <Typography variant="h4">
                {howItWorks?.description && parse(howItWorks?.description)}
              </Typography>
              <Box className={classes.cardSection}>
                {howItWorks?.contents &&
                  howItWorks?.contents.map((data, i) => {
                    return <HomeCard data={data} key={i} />
                  })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
