import React, { useEffect, useContext } from 'react'
import { Box, Typography, makeStyles, Grid } from '@material-ui/core'

import { UserContext } from 'src/context/User'
import NoDataFound from 'src/component/NoDataFound'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  input_fild: {
    backgroundColor: '#ffffff6e',
    
    border: ' solid 0.5px #e5e3dd',
    color: '#141518',
    height: '48px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    borderRadius: '20px',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& .MuiInputBase-input': {
      color: '#141518',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      borderWidth: 0,
    },
  },
  LoginBox: {
    paddingTop: '20px',
    '& h6': {
      fontWeight: 'bold',
      marginBottom: '10px',
      fontSize: '20px',
      color: '#000',
      '& span': {
        fontWeight: '300',
      },
    },
  },
  TokenBox: {
    border: 'solid 0.5px #e5e3dd',
    padding: '5px',
  },
  masBoxFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  dailogTitle: {
    textAlign: 'Center',
    '& h2': {
      color: '#141518',
      fontSize: '23px',
    },
  },
  input_fild2: {
    width: '100%',
    '& input': {
      height: '45px',
    },
  },
  UploadBox: {
    border: 'solid 0.5px #707070',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '110px',
  },
  input_fild22: {
    width: '100%',
    '& input': {
      height: '45px',
      border: 0,
    },
    '& .MuiInput-underline:before': {
      border: 0,
    },
  },
  dlflex: {
    '& div': {
      marginTop: '2rem',
      '& span': {
        border: '1px solid #e8e7e7',
        fontSize: '20px',
        padding: '7px',
        marginRight: '6px',
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

export default function SoldBuyList({ auction, updateList, type }) {
  const classes = useStyles()

  const auth = useContext(UserContext)

  useEffect(() => {
    if (auth.isErrorInWalletConnect && auth.connectWalletError) {
      toast.error(auth.connectWalletError)
    }
  }, [auth.isErrorInWalletConnect, auth.connectWalletError])

  return (
    <Box className={classes.LoginBox} mb={5}>
      <Box className={classes.masBoxFlex}>
        <Typography variant="h6">
          {type === 'bought' ? 'Bought' : 'Sold'} NFT List
        </Typography>
      </Box>
      <Box maxWidth="lg">
        {!auction[0] ? (
          <Box align="center" mt={4} mb={5}>
            <NoDataFound />
          </Box>
        ) : (
          ''
        )}
        <Grid container spacing={2}>
          {auction.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
