import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import api from "../services/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { func } from "prop-types";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function getTitle(field, tag) {
  if (Object.keys(field).includes(tag)) {
    return field
  }
}

export default function Item() {
  const router = useRouter();
  //const [id, setId] = useState(router.query.id);

  const [item, setItem] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const url = `/cataloguing/item/${id}/json`;
      //console.log(url);
  
      api
        .get(url)
        .then((response) => {
          //const title = response.data.datafield.find(getTitle("245"))[245]['a']
          setItem({
            title: response.data.datafield[245].a,
            author: response.data.datafield[100].a });
          console.log(response.data.datafield[100]) 

          
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }
     


  }, [router.isReady]);

  



  return (
    <Container>
      <Card>
      <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          L
        </Avatar>
      }
      title={<Typography  variant="h5" >{item?.title}</Typography>}
      >

      </CardHeader>
        {/*<Typography  variant="h4" >{item?.title}</Typography>*/}
        
        <CardContent sx={{ display: 'flex', gap: 3}}>
        <CardMedia
        component="img"
        height="194"
        sx={{ width: 151 }}
        
      />
      <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column',}}vvvv>
     
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button>Autor</Button>
        <Button>{item?.author}</Button>
       
      </ButtonGroup>
      </Box>
      
        
        

        </CardContent>
        
      
        
      </Card>
    </Container>
  );
}
