import React, {useState, useEffect} from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import parse from 'html-react-parser';
import { useLocation, useParams } from "react-router";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
const useStyles = makeStyles((theme) => ({

  title: {
    fontSize: "30px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
    borderBottom: "solid 1px #e5e3dd",
    paddingBottom: "10px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
}));



export default function StaticPage() {
  const classes = useStyles();
  const location = useLocation();
  const {pageName} = useParams();
  let data = location.state?.data;
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(()=>{
  if (!data) {
    const fetcher = async (url) => axios.get(url).then(res => {
      setTitle(res.data.result.title) ; 
      setContent(res.data.result.description);
    });
    fetcher(Apiconfigs.viewStaticPage+`?type=${pageName}`)
  } else {
    setTitle(data.title) ; 
    setContent(data.html);
  }
  },[data])

  return (title && content) ? (
      <Container maxWidth="lg">
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>

        <Box mt={5}>
          {parse(content)}
        </Box>
      </Container>
  ) :  null
}
