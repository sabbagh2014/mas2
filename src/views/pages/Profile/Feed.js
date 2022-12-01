import React from 'react'
import { Box, Typography, makeStyles, Grid } from '@material-ui/core'

import FeedCard from 'src/component/FeedCard'
import FeedCardPrivate from 'src/component/FeedCardPrivate'

import NoDataFound from 'src/component/NoDataFound'
const useStyles = makeStyles(() => ({
  LoginBox: {
    paddingTop: '20px',
    '& h6': {
      fontWeight: 'bold',
      marginBottom: '10px',
      fontSize: '20px',
      color: '#1b1a1a',
      '& span': {
        fontWeight: '300',
      },
    },
  },

  masBoxFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
}))

export default function Login({ allFeed, feeds, updateList, privateFeeds }) {
  console.log('privateFeeds', privateFeeds)
  console.log('allFeed', allFeed)

  console.log('feeds', feeds)

  const classes = useStyles()
  return (
    <Box className={classes.LoginBox} mb={5}>
      <Box className={classes.masBoxFlex}>
        <Typography variant="h6">My feed</Typography>
      </Box>
      <Box>
        {feeds && feeds.length === 0 ? (
          <Box align="center" mt={4} mb={5}>
            <NoDataFound />
          </Box>
        ) : (
          ''
        )}
        <Grid container spacing={1}>
          {feeds?.map((data, i) => {
            return (
              <Grid
                item
                key={i}
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.gridbox}
              >
                <FeedCard updateList={updateList} data={data} index={i} />
              </Grid>
            )
          })}
          {privateFeeds &&
            privateFeeds?.map((data, i) => {
              return (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className={classes.gridbox}
                >
                  <FeedCardPrivate
                    allFeed={allFeed}
                    updateList={updateList}
                    data={data}
                    index={i}
                  />
                </Grid>
              )
            })}
          {/* {privateFeeds 
          &&  <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className={classes.gridbox}
        >

          <FeedCardPrivate updateList={updateList} data={privateFeeds}  />
        </Grid>} */}
        </Grid>
      </Box>
    </Box>
  )
}
