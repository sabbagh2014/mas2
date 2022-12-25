import React, { useContext, useState, useEffect } from "react";
import { Typography, Box, Avatar, Button, Card, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  cards: {
    backgroundColor: '#D9AFD9',
    backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
    padding: "10px",
    borderRadius: "10px",
    width: "260px",
    minHeight: "320px",
    margin: "12px",
    position: "relative",
    display: 'flex',
    flexDirection: "column",
    position: 'relative',
    alignItems: "stretch",
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundImage: 'linear-gradient(0deg, #D9AFD955 0%, #97D9E199 100%)',
    borderRadius:"10px",
    padding:"10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    position: "relative",
    backdropFilter: "blur(3px)",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "15px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },
      "& span": {
        color: "#000",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
    },
    "& p": {
      fontSize: "12px",
    },
  },

  boxActions: {
    padding: '4px',
    marginTop: '4px',
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    width: "100%",
    borderRadius: "4px",
    background: "#fff4",
    backdropFilter: "blur(2px)",
    alignSelf: "flex-end",
    zIndex:100
  },

  subButton: {
    "& button": {
      backgroundImage: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: "#fff",
      width: "90px",
      height: "30px",
      fontSize: "11px",
      padding: "2px"
    },
  },
}));

export default function UserDetailsCard(data) {
  const userCardData = data.data;
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useContext(UserContext);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);

  const subscribeToUserHandler = async () => {
    if (auth.userData?._id) {
    await axios({
      method: "GET",
      url: Apiconfigs.followProfile + userCardData._id,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setisSubscribed(res.data.result.subscribed == "yes");
          setnbSubscribed(res.data.result.nb);
        } else {
          toast.error(res.data.result);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.responseMessage);
      });
    } else {
      toast.error("Please Login");
    }
  }

  const likeDislikeUserHandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeUser + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setisLike((liked) => !liked);
          setnbLike((nb) => isLike ? nb - 1 : nb + 1)
        } else {
          setisLike(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      toast.error("Please Login");
    }
  };

  useEffect(() => {
    setnbLike(userCardData.likesUsers.length);
    setnbSubscribed(userCardData.followers.length);
    if (auth.userData?._id) {
      setisLike(userCardData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(userCardData.followers?.includes(auth.userData._id));
    }
  }, [])

  return (
    <Card className={classes.cards}>
      <img
            style={{zIndex:'0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 'auto', height: '100%'}}
           onClick={() => {
              navigate("/user-profile/" + userCardData.userName)
            }}
            src={userCardData.profilePic} />
      <Box className={classes.cardContent}>
        
        <Box style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
          flexGrow: 1,
          flexDirection: "column",
        }}>
          
          <Box
           
          >
            <Typography
              variant="h4"
              component="h4"
              style={{
                color: "#fbfafa",
                cursor: "pointer",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "auto",
                textAlign: "center"
              }}
            >
              {userCardData && userCardData.name
                ? userCardData.name
                : userCardData.userName}
            </Typography><Box>
              {
                userCardData.speciality &&
                <Typography
                  style={{
                    color: "#000",
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: "12px"
                  }}
                >
                  {userCardData.speciality}
                </Typography>
              }
            </Box>
          </Box>
        </Box>
        
      </Box>
      
      <Box
          className={classes.boxActions}
        >
          <Box className={classes.subButton}>
            
                <Button onClick={subscribeToUserHandler}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
          
            <span
              style={{
                color: "#000",
                fontWeight: "600",
                fontSize: "12px",
                padding: '2px'
              }}
            >
              {
                nbSubscribed ?
                  nbSubscribed > 1 ?
                    nbSubscribed + " subs" :
                    '1 sub' : ""
              }
            </span>
          </Box>
          <Box style={{
            cursor: "pointer",
            margin: "0 3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }} >
            <span style={{ fontSize: '12px', margin: "1px 2px" }}>
              {nbLike && nbLike}
            </span>
            <FaHeart
              style={isLike ? { color: "red" } : { color: "#ffa0a0" }}
              onClick={() => likeDislikeUserHandler(userCardData._id)}
            />
          </Box>  
      </Box>
    </Card>
  );
}
