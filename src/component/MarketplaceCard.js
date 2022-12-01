import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {
  FaFacebookF,
  FaTelegramPlane,
  FaTwitter,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { GiCancel } from 'react-icons/gi'
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '0 5px',
    background:
      'linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
    border: '1px solid #A8CEDF',
    backdropFilter: 'blur(42px)',
    borderRadius: '10px',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      filter: 'drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))',
      background: '#fff',
      transform: 'scale(1.03)',
      transition: 'all 0.4s ease-in-out 0s',
    },
    '& .basecontent': {
      '& .databox': {
        borderBottom: '1px dashed rgba(0, 0, 0, 0.5)',
        paddingBottom: '16px',
      },
      '& .buttonbox': {
        paddingTop: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
  },
  cards: {
    filter: 'blur(4px)',
    border: 'solid 0.5px #c9c7c3',
    width: '270px',
    // backgroundColor: "#fff",
    padding: '10px',
    borderRadius: '10px',
    margin: '0 10px',
    position: 'relative',
    backgroundImage:
      'linear-gradient(45deg, #eef2f3 90%,#8e9eab 30%, #eef2f3 90%)',
    margin: '8px',
    width: '90%',
    '&:hover': {
      transform: 'scale(1.03)',
      transition: 'all 0.4s ease-in-out 0s',
    },
  },
  text: {
    whiteSpace: 'pre',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 'calc(100% - 5px)',
    color: '#000',
  },
  mainimg: {
    cursor: 'pointer',
    width: '100%',
    height: '190px !important',
    overflow: 'hidden',
    backgroundPosition: 'center !important',
    backgroundSize: 'cover !important',
    backgroundRepeat: ' no-repeat !important',
    borderRadius: '5px 5px 0px 0px',
    backgroundColor: '#ccc !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .topcontent': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '15px',
      '& .topleft': {
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '10px',
        padding: '5px 8px',
        width: 'fit-content',
        '& p': {
          marginLeft: '5px',
          color: '#4da7f0',
          [theme.breakpoints.down('xs')]: {
            fontSize: '10px',
          },
          '& span': {
            color: '#000000',
          },
        },
        '& .Userbox': {
          display: 'flex',
          alignItems: 'center',
          '& figure': {
            margin: '0',
            marginLeft: '-10px',
            height: '30px',
            width: '30px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#101010',
            position: 'relative',
            transition: '0.3s',
            cursor: 'pointer',
            '&:first-child': {
              marginLeft: '0px',
            },
            '&:hover': {
              zIndex: '2',
              transform: 'scale(1.2)',
            },
            '& img': {
              width: 'auto',
              maxWidth: '100%',
              maxHeight: '41px',
            },
          },
        },
      },
      '& .likes': {
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        borderRadius: '10px',
        width: 'fit-content',
        padding: '5px 8px',
        '& p': {
          marginLeft: '5px',
          color: '#000',
        },
      },
    },
    '& .bottomcontent': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
      '& .timer': {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        background:
          'linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)',
        border: '1px dashed #FFFFFF',
        filter: 'drop-shadow(0px 0px 53px rgba(0, 0, 0, 0.25))',
        backdropFilter: 'blur(42px)',
        borderRadius: '10px',
        padding: '5px 10px',
        '& h6': {
          color: '#FFFFFF',
        },
      },
    },
  },
  pricedata: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    '& h6': {
      fontSize: '14px',
      color: '#000',
      display: 'flex',
      alignItems: 'center',
    },
  },
  customizedButton: {
    position: 'absolute',
    top: '-42px',
    right: '-9px',
    color: '#fff',
  },
}))

function ExploreCard(props) {
  const classes = useStyles()
  const navigate = useNavigate()
  const { data, type, index, auth, isSubscribed, bundleDetails } = props
  const [open, setOpen] = useState(false)
  const [viewContent, setViewContent] = useState(false)
  const updateDimensions = () => {
    var offsetWidth = document.getElementById('imagecard' + index).offsetWidth
    var newoofsetWidth = offsetWidth - 80
    document.getElementById('imagecard' + index).style.height =
      newoofsetWidth + 'px'
  }
  useEffect(() => {
    updateDimensions()
  }, [data, index])
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <>
      <Paper className={classes.root}>
        <Box
          id={`imagecard${index}`}
          className={classes.mainimg}
          style={
            data.postType === 'PRIVATE' &&
            auth?.userData?._id !== bundleDetails?.userId
              ? {
                  background: 'url(' + data?.mediaUrl + ')',
                  filter: 'blur(8px)',
                }
              : { background: 'url(' + data?.mediaUrl + ')' }
          }
        ></Box>
        <Box>
          <Box p={2}>
            <Box
              style={
                data.postType === 'PRIVATE' &&
                auth?.userData?._id !== bundleDetails?.userId
                  ? { filter: 'blur(8px)' }
                  : {}
              }
            >
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Typography variant="h6" className={classes.text}>
                    {data?.title ? data?.title : ''}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Typography variant="body1" className={classes.text}>
                    {data?.postType ? data?.postType : ''}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} align="left">
                  <Typography variant="body1" className={classes.text}>
                    {data?.createdAt
                      ? moment(data?.createdAt).format('MMM Do YYYY')
                      : ''}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} align="right">
                  <Box className={classes.pricedata}>
                    <Typography variant="h6">
                      <FavoriteIcon />
                      &nbsp;&nbsp;
                      {data?.likesUsers ? data?.likesUsers?.length : '0'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              {auth?.userData?._id === bundleDetails?.userId ? (
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setViewContent(true)}
                >
                  View
                </Button>
              ) : (
                <>
                  {isSubscribed ? (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => setViewContent(true)}
                      // disabled={data.postType === 'PRIVATE'}
                    >
                      View
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled
                    >
                      Subscribe the bundle to view the content
                    </Button>
                  )}
                </>
              )}

              
            </Box>
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogActions>
            <IconButton
              onClick={() => setOpen(false)}
              className={classes.customizedButton}
            >
              <GiCancel />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Box className={classes.sharemodal} mb={2} align="center" mt={3}>
              <Button>
                <Box>
                  <FaFacebookF style={{ fontSize: '30px' }} /> <br />
                  Facebook
                </Box>
              </Button>
              <Button>
                <Box>
                  <MdEmail style={{ fontSize: '30px' }} /> <br />
                  E-mail
                </Box>
              </Button>
              <Button>
                <Box>
                  <FaTelegramPlane style={{ fontSize: '30px' }} /> <br />
                  Teligram
                </Box>
              </Button>
              <Button>
                <Box>
                  {' '}
                  <FaTwitter style={{ fontSize: '30px' }} /> <br />
                  Twitter
                </Box>
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={viewContent}
          onClose={() => setViewContent(false)}
          aria-labelledby="max-width-dialog-title"
         
        >
          <DialogContent

          >
            <Box className={classes.PhotoBox}>
              <img
                src={data?.mediaUrl}
                alt=""
                style={{ height: '368px', width: '553px' }}
              />
            </Box>
            <Box mt={3} className={classes.bundleText} textAlign="center">
              <Typography variant="h4">
                {data?.title}
              </Typography>
            </Box>

            <Box mt={2} className={classes.deskiText}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={2}>
                  <Typography
                    variant="h4"
                    align="left"
                    color="textSecondary"
                    style={{ fontSize: '16px' }}
                  >
                    Details:{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9} lg={10}>
                  <Typography
                    variant="body2"
                    align="left"
                    color="textSecondary"
                    dangerouslySetInnerHTML={{
                      __html: data?.details,
                    }}
                    style={{ margin: '0px', padding: '0px' }}
                  ></Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            {!auth.userLoggedIn && (
              <Box mt={3} mb={3} textAlign="center">
                {' '}
                <Button
                  className={classes.LoginButton}
                  onClick={() => setViewContent(false)}
                >
                  Cancel
                </Button>
                &nbsp;&nbsp;{' '}
                <Button
                  className={classes.LoginButton}
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Login
                </Button>
              </Box>
            )}
            {auth.userLoggedIn && (
              <Box mt={3} mb={3} textAlign="center">
                <Button
                  className={classes.LoginButton}
                  onClick={() => setViewContent(false)}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Close
                </Button>
              </Box>
            )}
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  )
}

export default ExploreCard
