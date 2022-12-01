import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import {
  Box,
  Card,
  Badge,
  Typography,
  makeStyles,
  Tooltip,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar

} from "@material-ui/core";
import InsertPhotoRoundedIcon from '@material-ui/icons/InsertPhotoRounded';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SendIcon from '@material-ui/icons/Send';
import ImageUploading from "react-images-uploading";
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import InputEmoji from "react-input-emoji";
import axios from "axios";
import Apiconfigs, { baseURL } from "src/Apiconfig/Apiconfigs.js";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading";
import io from 'socket.io-client';
import { toast } from "react-toastify";
import { Virtuoso } from 'react-virtuoso';
import {isMobile} from 'react-device-detect';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: '60px',
    display: "flex",
    justifyContent: 'flex-end',
    width: '100vw',
    maxWidth: '100vw',
    height: 'calc(100vh - 55px)',

  },
  drawer: {
    flexShrink: 0,
    '& .MuiList-padding': {
      padding: '0px'
    },
    '& .MuiListItemText-secondary': {
      fontSize: "12px"
    }
  },
  drawerPaper: {
    top: '60px',
    width: drawerWidth,
    background: '#fcfcfc'
  },
  avatar: {
    marginLeft: "5px",
    backgroundColor: '#fff',
  },
  main: {
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: "space-between",
    alignItems: 'stretch',
    padding: '10px 0px',
    flex: 4,
    background: '#dadada',
    width: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
    maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
  },
  msg: {
    alignSelf: 'end',
    width: '100%',
    '& .react-input-emoji--container':{
      order: 2,
      margin: "0px 10px"
    },
    '& .react-emoji-picker--wrapper':{
      width: '100%',
    },
  },
}));

const socket = io(baseURL, {
  auth: {
    token: sessionStorage.getItem("token")
  },
});


const ChatBox = function ({ chat, socket, visible, isOnline }) {
  const START_INDEX = 10000;
  const INITIAL_ITEM_COUNT = 50;
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX)
  
  const classes = useStyles();
  const user = useContext(UserContext);
  const virtuosoRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(false);
  const [theStart, setTheStart] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  let contact = chat.users.find(c => c._id != user.userData._id);
  let photo = contact.profilePic ? contact.profilePic :
    `https://avatars.dicebear.com/api/miniavs/${contact.userName}.svg`;

  const onImagesChange = (imageList) => {
    setImages(imageList);
  };

  const uploadImages = async (onImageRemoveAll) => {
    if (images.length > 0) {
      try {
        setUploading(true);
        let upload_images = [...images];
        for(const image in upload_images){
          const formData = new FormData();
          formData.append("file", upload_images[image].file);
          const res = await axios({
            method: "POST",
            url: Apiconfigs.chatUploadImage,
            data: formData,
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });

          if (res.data.statusCode === 200) {
            let data = {
              chat_id: chat._id,
              message: res.data.result,
              mediaType: 'image'
            };
            socket.emit("sendMsg", data);
          } else {
            toast.error("Error upload image " + (image+1));
          }
        }
        setUploading(false);
        onImageRemoveAll();
      } catch (err) {
        console.log(err);
        setUploading(false);
      }
    } else {
      setUploading(false);
    }
  };

  const sendMsg = () => {
    if (msg.length > 0) {
      let data = {
        chat_id: chat._id,
        message: msg,
      };
      socket.emit("sendMsg", data);
    }
  };

  const unreadMsgs = useCallback(() => {
    return messages.filter(m => (m.status == 'Unread' && m.sender == contact._id));
  }, [messages]);

  const readChatMsgs = async (chatId, MsgsIds) => axios.post(Apiconfigs.readChat,
    {
      chat: chatId,
      ids: MsgsIds
    },
    {
      headers: {
        token: sessionStorage.getItem("token"),
      }
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      toast.error(err);
    });

  useEffect(() => {

    let unreaded = unreadMsgs();
    console.log(chat._id, unreaded.length);

    if (visible) {
      !isScrolling && virtuosoRef.current.scrollToIndex({ index: messages.length - 1, behavior: 'smooth' });
      let chats = user.unreadChats;
      delete chats[chat._id];
      user.setUnReadChats(chats);

      if (unreaded.length > 0) {
        let unreadIds = unreaded.map(ur => ur._id);
        let ids = String(unreadIds);
        readChatMsgs(chat._id, ids);
        let read = messages.map(r => {
          if (unreadIds.includes(r._id)) {
            r.status = 'Read';
          }
          return r;
        });
        setMessages(read);
      }
    } else {
      if (unreaded.length > 0) {
        user.setUnReadChats(chats => ({ ...chats, [chat._id]: unreaded }));
      }
    }

  }, [visible, messages]);


  const loadChat = async () => axios.get(Apiconfigs.viewChat + chat._id, {
    headers: {
      token: sessionStorage.getItem("token"),
    },
    params: {
      page: messages.length,
      limit: 50
    },
  }).then(res => {
    if (res.data.result.length > 0) {
      let result = res.data.result.reverse();
      setMessages((msgs) => [...result, ...msgs, ]);
      setFirstItemIndex(firstItemIndex => firstItemIndex - result.length);
    } else {
      setTheStart(true);
    }
  });

  useEffect(() => {
    loadChat();
    socket.on(chat._id, (data) => {
      setMessages((msgs) => [...msgs, data]);
    });

    return () => {
      socket.off(chat._id);
    };

  }, []);

  return (
    <Box 
      className={classes.main} 
      style={{ 
        display: visible ? 'flex' : 'none',
        paddingBottom: isMobile? '110px' : '10px'
        }}>
      <Box display='flex' alignItems='center'>
        <Avatar alt={contact.userName} src={photo} className={classes.avatar} />
        <Box m={1}>
          <Typography component="h5" variant="h5" >{contact.userName}</Typography>
          <Typography component="p" variant="body2" >
            {isOnline ? 'Online' : 'Active recently'}
          </Typography>
        </Box>
      </Box>
      <Virtuoso
        style={{ flexGrow: 1 }}
        ref={virtuosoRef}
        isScrolling={setIsScrolling}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
        data={messages}
        startReached={loadChat}
        components={{
          Header: () => {
            return theStart ?
              <Box width='100%' align='center' >
                <Typography component="h5" variant="h5" >Chat started</Typography>
                <Typography component="p" variant="body2" >
                {messages[0] && new Date(messages[0]?.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                </Typography>
              </Box> :
              <DataLoading />
            
          },
        }}
        itemContent={(index, msg) => {
          let alignT = (msg.sender == user.userData._id) ? 'right' : ' left';
          let justf = (msg.sender == user.userData._id) ? 'flex-end' : ' flex-start';
          let cardV = (msg.sender == user.userData._id) ? 'outlined' : ' elevation';
          return (
            <Box key={index} display="flex" justifyContent={justf} padding={1}>
              <Card variant={cardV} style={{ padding: '10px', maxWidth: '80%' }}>
                {msg.mediaType == 'image' ?
                  <img src={msg.text} alt="" style={{ maxWidth: '300px' }} /> :
                  <Typography
                    align={alignT}
                    variant="h6"
                    style={{ display: "block", fontSize: "14px" }}
                  >
                    {msg.text}
                  </Typography>
                }

              </Card>
            </Box>
          )
        }}
      />
     
      <Box display={images.length > 0 ? 'block' : 'flex'} className={classes.msg}>
        <ImageUploading
          multiple
          value={images}
          onChange={onImagesChange}
          maxNumber={5}
          dataURLKey="data_url"
          acceptType={["jpg", 'jpeg', 'png', 'gif']}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            <>
              <Tooltip title="Send media" placement="top">
                <IconButton style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}>
                  <InsertPhotoRoundedIcon />
                </IconButton>
              </Tooltip>
              {imageList.length > 1 && <Button onClick={onImageRemoveAll}>Remove all images</Button>}
              {imageList.length > 0 &&
                <ImageList rowHeight={120} className={classes.imageList} cols={6}>
                  {imageList.map((image, index) => (
                    <ImageListItem key={index} cols={1} style={{backgroundColor:'#ffffff55',textAlign:'center'}}>
                      <img src={image.data_url} alt="" style={{height:'100%', width:'auto',margin:'auto'}} />
                      <ImageListItemBar
                        title={(index + 1) + ': ' + image.file.name}
                        subtitle={<span>{image.file.size} bytes</span>}
                        actionIcon={
                          <IconButton
                            onClick={() => onImageRemove(index)}
                            disabled={uploading}
                            aria-label={`remove from selection`}>
                            {uploading ? <DataLoading /> :
                            <HighlightOffOutlinedIcon color="error" />
                            }
                          </IconButton>
                        }
                      />
                    </ImageListItem>

                  ))}
                  <ImageListItem key={'send'} cols={1}>
                    <Box display='flex' height='100%' justifyContent='center' alignItems='center' alignContent='center'>
                      {uploading && <DataLoading />}
                      <IconButton
                        disabled={uploading}
                        onClick={() => uploadImages(onImageRemoveAll)}
                        aria-label={`send`} >
                        <SendIcon />
                      </IconButton>
                    </Box>

                  </ImageListItem>
                </ImageList>
              }
            </>
          )}
        </ImageUploading>

        <InputEmoji
          value={msg}
          onChange={setMsg}
          cleanOnEnter
          onEnter={sendMsg}
          placeholder="Type a message"
          className={classes.msgInput}
        />
      </Box>
    </Box>
  )
}

export default function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatList, setChatList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getChatList = async () => axios.get(Apiconfigs.chatList, {
    headers: {
      token: sessionStorage.getItem("token"),
    },
    params: {
      page: 1,
      limit: 10
    },
  }).then(res => {
    setChatList(res.data.result);
  });


  useEffect(async () => {
    socket.emit("ping");
    getChatList();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('notify', (msg) => {
      if (msg.onlineusers && Array.isArray(msg.onlineusers)) {
        setOnlineUsers(msg.onlineusers)
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('notify');
    };
  }, []);

  return (
    <Box className={classes.container}>
      <RemoveScrollBar />
      <Drawer
        className={classes.drawer}
        variant={isMobile ? "persistent": "permanent"}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={chatId == 't'}
      >
        <List>
          <ListItem>
            {isConnected ?
              <Box padding={1} fontSize={12}>🟢 Online users ({onlineUsers.length})</Box> :
              <Box padding={1} fontSize={12}>⛔ Chat disconnected, retrying ... </Box>
            }
          </ListItem>
        </List>
        <Divider />
        <List dense={true}>
          {!chatList ? <DataLoading /> :

            chatList.length > 0 && chatList.map((chat) => {
              let contact = chat.users.find(c => c._id != user.userData._id);
              let photo = contact.profilePic ? contact.profilePic :
                `https://avatars.dicebear.com/api/miniavs/${contact.userName}.svg`;

              return (
                <ListItem button key={chat._id} onClick={() => navigate('/chat/' + chat._id)}>
                  <ListItemAvatar>
                    <Avatar alt={contact.userName} src={photo} className={classes.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.userName}
                    secondary={onlineUsers.includes(contact._id) ? 'Online' : 'Active recently'}
                  />
                  <ListItemSecondaryAction style={{ marginRight: '13px' }}>
                    <Badge color="error" overlap="rectangular" badgeContent={user.unreadChats[chat._id]?.length}></Badge>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
        </List>
      </Drawer>
      {chatId == 't' ?
        <Box className={classes.main} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <Typography component="h2" variant="h2" align='center'>
            Kick start chat now! <br /> Say Hi 👊 to your MAS community
          </Typography>
        </Box> : null}

      {!chatList ? <DataLoading /> :
        chatList.length > 0 && chatList.map((chat) => {
          return <ChatBox
            key={chat._id}
            chat={chat}
            socket={socket}
            visible={(chat._id === chatId)}
            isOnline={onlineUsers.includes(chat.users.find(c => c._id != user.userData._id)._id)}
          />
        })
      }
    </Box>
  );
}
