import Box from "@mui/material/Box";
//import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';
import { red } from "@mui/material/colors";

export default function Record(props) {
  return (
    <Box
      sx={
        props.value == 0
          ? { display: "block", gap: 3, mb: 2 }
          : { display: "none" }
      }
    >
      <Box sx={{ display: "flex", gap: 2 }}>
      {props.item.img ? 
        <Image
          src={
            props.item.img
               }
          width={155}
          height={200}
        /> :
        <Skeleton variant="rectangular" width={155} height={200} />
      }
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
          {/** Autoria */}
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Autoria</Button>
            <Button style={{ textTransform: "none" }}>
              {props.item?.authorship}
            </Button>
          </ButtonGroup>
          {/** Publicação */}
          <ButtonGroup
            sx={
              props.item?.publication
                ? { display: "block" }
                : { display: "none" }
            }
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button>Publicação</Button>
            <Button style={{ textTransform: "none" }}>
              {props.item?.publication}
            </Button>
          </ButtonGroup>

          {/** Assuntos */}
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Assuntos</Button>

            {props.item?.subjects?.map((s, index) => (
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
                  {s.a}
                </Box>
              </Button>
            ))}
          </ButtonGroup>
          {/** Chamada */}
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Chamada</Button>
            <Button style={{ textTransform: "none" }}>
              {props.item?.chamada}
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
