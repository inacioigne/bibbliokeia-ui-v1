import Box from "@mui/material/Box";
import Image from "next/image";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';
import { red } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { getImageListItemBarUtilityClass } from "@mui/material";
import { resolveHref } from "next/dist/shared/lib/router/router";



export default function Record(props) {

  // function imgField() {
  //   return new Promise((resolve, reject) => {
  //     if (props.item) {
  //       resolve(
  //         props.item.datafields[856].filter((e) => {
  //           return e.subfields[3] == 'capa'
  //         })
  //       ) 
  //     } else {
  //       reject(null)
  //     }
  //   })
   
  // }

 function getImagem(props) {
   if (props.item) {
    let [f] = props.item.datafields[856].filter((field) => {return field.subfields[3] == 'capa'})
     return f
   } else {
     return false
   }
 }
 const img = getImagem(props)

  

    
  return (
    <Box
      sx={
        props.value == 0
          ? { display: "block", gap: 3, mb: 2 }
          : { display: "none" }
      }
    >

      <Box sx={{ display: "flex", gap: 2 }}>
      {/** IMAGEM */}
      {img ?
        <Image
          src={img.subfields.u}
          width={155}
          height={200} 
        />
         :
        <Skeleton variant="rectangular" width={155} height={200} />
      }
      

        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          {/** Autoria */}
          { props.item ?
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Autoria</Button>
            <Button style={{ textTransform: "none" }}>
              {props.item.datafields[245].subfields.c}
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} />
          }
          
          {/** Publicação */}
          { props.item ?
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button>Publicação</Button>
            <Button style={{ textTransform: "none" }}>
              {`${props.item.datafields[260].subfields.a}
              ${props.item.datafields[260].subfields.b}
              ${props.item.datafields[260].subfields.c}
              `}
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={300} height={35} /> }


          {/** Assuntos */}
          { props.item ?
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Assuntos</Button>

            {props.item.datafields[650].map((field, index) => (
              <Button key={index} style={{ textTransform: "none" }}>
                <Box
                  sx={{
                    bgcolor: red[400],
                    color: "white",
                    pl: 1,
                    pr: 1,
                    borderRadius: 1,
                  }}
                >
                  {field.subfields.a}
                </Box>
              </Button>
            ))}
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} /> }

          {/** Chamada */}
          { props.item ?
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Chamada</Button>
            <Button style={{ textTransform: "none" }}>
              {`${props.item.datafields["082"].subfields.a}
              ${props.item.datafields["090"].subfields.b}
              `}
            </Button>
          </ButtonGroup> :
          <Skeleton variant="rectangular" width={250} height={35} /> }

        </Box>
      </Box>
    </Box>
  );
}
