import React from 'react'
import {
  Grid,
  Container,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(() => ({

  bannerSectionBody: {
    minHeight: '400px',
    padding: '100px 0px 0px',
    backgroundImage: 'linear-gradient(45deg, #240b36 30%, #c31432 90%)',
    width: '100%',
  },
  bannerBackground: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '400px',
    backgroundSize: 'contain',
  },

  leftSection: {
    padding: '0px 0px',
    '@media(max-width:667px)': {
      marginTop: '11px',
    },

    '& h1': {
      fontSize: '60px',
      fontWeight: '800',
      lineHeight: '70px',
      letterSpacing: '5px',
      color: '#fffa',
      textShadow: 'rgb(207 81 111) 2px 2px 1px',
      '@media(max-width:1156px)': {
        fontSize: '50px',
        lineHeight: '65px',
      },
      '@media(max-width:667px)': {
        fontSize: '40px',
        lineHeight: '55px',
      },
      '@media(max-width:450px)': {
        fontSize: '35px',
        lineHeight: '45px',
      },
    },
    '& h2': {
      fontSize: '48px',
      fontWeight: '600',
      lineHeight: '60px',
      letterSpacing: '2px',
      color: '#d0dfde',
      '@media(max-width:1156px)': {
        fontSize: '38px',
        lineHeight: '52px',
      },
      '@media(max-width:667px)': {
        fontSize: '26px',
        lineHeight: '42px',
      },
      '@media(max-width:450px)': {
        fontSize: '24px',
        lineHeight: '38px',
      },
    },
    '& h3': {
      fontSize: '26px',
      fontWeight: '350',
      lineHeight: '48px',
      letterSpacing: '2px',
      color: '#d0dfde',
      '@media(max-width:1156px)': {
        fontSize: '20px',
        lineHeight: '36px',
      },
      '@media(max-width:667px)': {
        fontSize: '17px',
        lineHeight: '32px',
      },
    },
    '& h4': {
      margin: '26px 0px',
      fontSize: '16px',
      fontWeight: '300',
      lineHeight: '28px',
      letterSpacing: '2px',
      color: '#d0dfde',
    },
    '& button': {
      borderRadius: '30px',
      background: '#fc424d',
      color: '#d0dfde',
      padding: '8px 14px',
    },
  },
  rightSection: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: 'auto',
      minHeight: '300px',
      maxHeight: '360px',
      maxWidth: '95%',
    },
    '& video': {
      width: 'auto',
      minHeight: '300px',
      maxHeight: '360px',
      maxWidth: '95%',
    },
  },

}))

export default function BannerSection({ bannerDetails }) {

  const classes = useStyles()
  return (
    <>

      <Box
        className={classes.bannerSectionBody}
        style={{ backgroundSize: 'cover', backgroundImage: `url(${bannerDetails?.background})` }}
      >

        <Container>
          <Grid container spacing={5}>
            <Grid item lg={6} sm={12} md={6} xs={12}>

              {bannerDetails &&

                <Box className={classes.leftSection}>
                  <Box style={{ position: 'relative' }}>
                    <Typography
                      variant="h1"
                    >
                      {bannerDetails.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h3"
                  >
                    {bannerDetails.description}
                  </Typography>
                </Box>
              }

            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              {bannerDetails && bannerDetails.media &&

                <Box className={classes.rightSection} >
                  {bannerDetails.mediaType == 'video' ?
                    <video
                      autoPlay
                      muted
                      loop
                      width="100%"
                      style={{ borderRadius: '20px' }}

                    >
                      <source
                        src={bannerDetails.media}
                        type="video/mp4"
                      />
                    </video>
                    : <img src={bannerDetails.media} alt='' />
                  }
                </Box>

              }
            </Grid>
          </Grid>
        </Container>
      </Box>

    </>
  )
}
