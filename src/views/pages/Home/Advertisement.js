import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
// import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  bannerSectionBody: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2px 0px',
    // backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    // backgroundImage: "white",
    backgroundColor: '#fff',
    width: '100%',
    // border:"2px solid black",
    // marginTop:"10px",
    // marginBottom:"10px"
    // background: "#141518",
  },
  container: {
    width: '970px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-2px',
  },
}))

export default function Advertisement({ isLoading, users }) {
  const classes = useStyles()


  return (
    <Box className={classes.bannerSectionBody}>
      {users?.mediaType === 'video' ? (
        <video
          autoPlay
          muted
          loop
          width="100%"
          height="380px"
        >
          <source src={users?.image} type="video/mp4" />
        </video>
      ) : (
        <Box
          container
          maxWidth="lg"
          style={{
            backgroundImage: 'url(' + users?.image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            cursor: 'pointer',
            minHeight: '380px',
          }}
          className={classes.container}
          onClick={() => window.open(`${users?.url}`)}
        >
          {/* <Typography variant="h1">{users?.title}</Typography> */}
        </Box>
      )}
    </Box>
  )
}
