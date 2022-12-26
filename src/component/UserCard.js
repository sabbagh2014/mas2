import React, { useContext, useState, useEffect } from "react";
import { Typography, Box,   Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  cards: {
    border: "solid 0.5px #e5e3dd",
    backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
    padding: "10px",
    borderRadius: "10px",
    width: "200px",
    height: "250px",
    margin: "0 10px",
    position: "relative",
  },
  cardContent: {
    display: "flex",
    flexDirection:"column",
    flex:1,
    flexGrow: 1,
    justifyContent: "space-between",
    height: "inherit",
    textAlign: "center",
    position: "relative",
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
  nftimg: {
    width: "100%",
    margin: "10px 0",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",

    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "-webkit-fill-available",
      borderRadius: "20px",
    },
  },
  nftImg: {
    width: "100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    backgroundColor: "#ccc !important",
  },
  socialbox: {
    "@media(max-width:821px)": {
      height: "12px",
      marginBottom: "3px",
    },
  },
  subButton: {
    "& button": {
      border: "0.5px solid #ccc",
      backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
      color: "#fff",
      width: "90px",
      height: "30px",
      fontSize: "11px",
      padding: "2px"
    },
  },
}));

export default function UserDetailsCard( data ) {
  const userCardData = data.data;
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(UserContext);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);

  const subscribeToUserHandler = async () => {
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
            setisLike((liked)=>!liked);
            setnbLike((nb)=> isLike ? nb-1 : nb+1)
          } else {
            setisLike(false);
            toast.error(res.data.responseMessage);
          }
        } catch (error) {}
      
    } else {
      toast.error("Please Login");
    }
  };

  useEffect(()=>{
    setnbLike(userCardData.likesUsers.length);
    setnbSubscribed(userCardData.followers.length);
    if (auth.userData?._id) {
      setisLike(userCardData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(userCardData.followers?.includes(auth.userData._id));
    }
  },[])

  return (
    <Box className={classes.cards}>
        <Box className={classes.cardContent}>
          <Box style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection:"column",
          }}>
              <figure
              style={{
                background: "white",
                width: " 90px",
                height: " 90px",
                borderRadius: "90px",
                overflow: 'hidden',
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
style={{zIndex:'0', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', margin: 'auto', height: '100%'}}
                src={userCardData.profilePic || `https://avatars.dicebear.com/api/miniavs/${userCardData?._id}.svg`}
               onClick={() =>
                    history.push({
                      pathname: "/user-profile",
                      search: userCardData?.userName,
                    })
                  }
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "100%"
                }}
              />
            </figure>
           <Box
              onClick={() => {
                history.push({
                  pathname: "/user-profile",
                  search: userCardData.userName,
                });
              }}
            >           
            <Typography
                variant="h4"
                component="h4"
                style={{
                  color: "#444",
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
          

          

          <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "100%",
            borderRadius: "4px",
            background: "#fbfafa",
            alignSelf: "flex-end"
          }}
          >
            <Box className={classes.subButton}>
            {
              auth.userData &&
              auth.userLoggedIn &&
              (
                <Button onClick={subscribeToUserHandler}>
                  {isSubscribed ? 'Subscribed' : 'Subscribe' } 
                </Button>
              )
            }
            <span
                style={{ color: "#000", 
                fontWeight: "600", 
                fontSize: "12px",
                padding:'2px'
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
                  margin:"0 3px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }} >
              <span style={{fontSize:'12px',margin:"1px 2px"}}>
                {nbLike && nbLike}
              </span>
              <FaHeart
                style={isLike ? { color: "red" } : {color: "#ffa0a0"}}
                onClick={() => likeDislikeUserHandler(userCardData._id)}
                />
          </Box>
          </Box>
          
          
        </Box>
    </Box>
    
  );
}
