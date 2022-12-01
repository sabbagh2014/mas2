import React from 'react'
import { Box, Typography, makeStyles, Grid } from '@material-ui/core'
import UserDetailsCard from 'src/component/UserCard'

const useStyles = makeStyles(() => ({
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
}))

export default function UserDetails({
  userList,
  type,
}) {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.LoginBox} mb={5}>
        <Box className={classes.masBoxFlex}>
          <Typography variant="h6">
            My {type === 'donor' ? 'Supporter' : 'Subscribers'}
          </Typography>
        </Box>
        <Box>
          
          <Grid container spacing={1}>
            {userList &&
              userList.map((data, i) => {
                return (
                  <Grid item xs={12} md={4} lg={3} key={i}>
                    <UserDetailsCard
                      data={data}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </Box>
    </>
  )
}
