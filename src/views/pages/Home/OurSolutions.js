import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core'
import parse from 'html-react-parser';

const useStyles = makeStyles(() => ({
  mainSection: {
    padding: '15px 0px',
    background: '#fff',
  },

  leftSection: {
    color: '#000',
    marginTop: '42px',
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      letterSpacing: '4px',
      marginBottom: '60px',
      '@media(max-width:767px)': {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '38px',
        letterSpacing: '4px',
      },
    },
    '& h4': {
      margin: '15px 0px',
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      marginTop: '-35px',
      '@media(max-width:767px)': {
        margin: '0px 0px',
        fontSize: '10px',
        marginTop: '-35px',
        fontWeight: '300',
        lineHeight: '25px',
        letterSpacing: '2px',
      },
    },
    '& h5': {
      fontSize: '15px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      '@media(max-width:767px)': {
        fontSize: '10px',
        fontWeight: '300',
        lineHeight: '25px',
        letterSpacing: '2px',
      },
    },
  },

  rightSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '50px',
    '& img': {
      width: '100%',
      height: '500px',
    },
  },
}))
export default function OurSolutions({ ourSolutions }) {
  const classes = useStyles()
  return (
    <Box className={classes.mainSection}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <Box className={classes.leftSection}>
              <Typography variant="h2" >
                {ourSolutions?.title}
              </Typography>
              <Typography variant="h5" >
                {ourSolutions?.description && parse(ourSolutions?.description)}
              </Typography>
              
            </Box>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <Box className={classes.rightSection}>
              <img
                src={
                  ourSolutions?.contentFile
                    ? ourSolutions?.contentFile
                    : 'images/home/banner1.png'
                }
                alt=""
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
