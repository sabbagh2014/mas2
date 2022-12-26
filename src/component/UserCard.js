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
                src={userCardData.profilePic }
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
