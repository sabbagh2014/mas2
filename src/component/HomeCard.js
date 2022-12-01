import React from 'react'
import {
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core'
const useStyles = makeStyles(() => ({
  cardMainBody: {
    border: '1px solid #ccc',
    padding: '35px 20px',
    borderRadius: '20px',
    margin: '10px 0px',
    backgroundImage:
      'linear-gradient(45deg, #240b36 30%, #000 90%,#240b36 40%)',
    '@media(max-width:767px)': {
      padding: '21px 20px',
    },
    '& h5': {
      fontSize: '20px',
      fontWeight: '500',
      letterSpacing: '1.5px',
      marginBottom: '15px',
      '@media(max-width:767px)': {
        fontSize: '15px',
        fontWeight: '500',
        marginBottom: '15px',
        letterSpacing: '1.5px',
      },
    },
    '& h6': {
      fontSize: '15px',
      fontWeight: '300',
      letterSpacing: '1px',
      lineHeight: '15x',
      '@media(max-width:767px)': {
        fontSize: '10px',
        fontWeight: '300',

        letterSpacing: '1px',
      },
    },
  },
}))
export default function HomeCard({ data }) {
  const classes = useStyles()
  return (
    <Box className={classes.cardMainBody}>
      <Typography variant="h5" className='seats'>{data?.heading}</Typography>
      <Typography variant="h6" className='seats'>{data?.contentDescription}</Typography>
    </Box>
  )
}
