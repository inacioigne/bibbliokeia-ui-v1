import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import api from "../services/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { func } from "prop-types";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from '@mui/x-data-grid';


function getTitle(field, tag) {
  if (Object.keys(field).includes(tag)) {
    return field;
  }
}

const useFakeMutation = () => {
  return useCallback(
    (item) => 
    new Promise((resolve, reject) => 
    setTimeout(() => {
      if (item.Subcampo?.trim() === "") {
        reject()
      } else {
        resolve({ ...item, subcampo: item.Subcampo?.toUpperCase()})
      }
    }, 200)
    ),
    [],
  )
}

export default function Item() {
  const mutateRow = useFakeMutation()

  const processRowUpdate = useCallback(
    async (newRow) => {
      try {
        //requests
        console.log(newRow)
        const response = await mutateRow(newRow)
        alert("ALLLLTEEEADDD")
        return response
      } catch (error) {
        alert("ERROOOOO!!!")
        throw error
      }
    },
    [mutateRow]
  )
  const router = useRouter();

  const [item, setItem] = useState(false);
  const [rows, setRows] = useState(false)
  const [anchor, setAnchor] = useState(null);
  const [value, setValue] = useState(0);

  const open = Boolean(anchor);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleRegister = () => {
    setValue(0);
  };
  const handleTagMarc = () => {
    setValue(1);
  };

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const url = `/cataloguing/item/${id}/json`;

      const getData = async () => {
        const res = await api.get(url)
        let title = res.data.datafield[245];
        let publication = res.data.datafield[260];
        setItem({
          title: title.b ? `${title.a}${title.b}` : title.a,
          authorship: title.c,
          publication: publication.a + publication.b + publication.c,
          subjects: res.data.datafield[650],
          img: res.data.datafield[856].u,
        })

        
        
        const rows = Object.entries(res.data.controlfield).map((c) => (
          {
            id: c[0],
                 Tag: c[0],
                Subcampos: c[1]
          }
        ))
        rows.unshift(
          {
            id: 0,
            Tag: "000",
            Subcampos: res.data.leader
          }
        )
       
        Object.entries(res.data.datafield).map((c) => (
          
          Array.isArray(c[1]) ? 
            null :
            (
              //const a = c[1].a,
              rows.push(
              {
                id: c[0],
                Tag: c[0],
                Ind1: c[1].Ind1,
                Ind2: c[1].Ind2,
                Subcampos: Object.entries(c[1]).map((sub) => (
                  
                  sub[0] != "Ind1" & sub[0] != "Ind2"   && 
                  ` ${sub[0]}| ${sub[1] }`
                )).filter(e => (e != 0))
             
                
              }
            )
            //delete c[1].Ind1
            
            //console.log(c[1])
              )
        ))
        setRows(rows)
        
        
      //   const row = Object.entries(res.data?.controfield).map((c) => (
      //   {
      //     Tag: c[0],
      //     Subcampo: c[1]
      //   }
      // ))
      // setMarc(row)
        
      }
      getData()
      .catch((err) => {
           console.error("ops! ocorreu um erro" + err);
        })
       

      
        
    }
  }, [router.isReady]);


  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <MenuBookIcon />
            </Avatar>
          }
          title={<Typography variant="h5">{item?.title}</Typography>}
          action={
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                aria-label="settings"
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{ borderBottom: 1 }}
        ></CardHeader>
        <Menu
          anchorEl={anchor}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem key="0" onClick={handleRegister}>
            <Avatar>R</Avatar> Registro
          </MenuItem>
          <MenuItem key="1" onClick={handleTagMarc}>
            <Avatar>M</Avatar> Tags Marc
          </MenuItem>
        </Menu>
        {/*<Typography  variant="h4" >{item?.title}</Typography>*/}

        <CardContent>
          {/** Register */}
          <Box
            sx={value == 0 ? { display: "flex", gap: 3 } : { display: "none" }}
          >
            <CardMedia
              component="img"
              height="194"
              image={item.img}
              //image="https://lh3.googleusercontent.com/pw/AM-JKLWjj2Kl09pSE9ffhb41RAboNsMgMT8ywSLMHb_8BG4UNhoQt2Df8UXIvMFyjgBPr2KMl-P2dBGlJrMB7vCEqMWJTeylEn0gFrxEH4nmdNJHQQzuwRG5OQeeFYYwU4W42iucAPNxqin4EqmS8iJHCf5d=w354-h499-no?authuser=0"
              sx={{ width: 151 }}
            ></CardMedia>
            <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button key={0}>Autoria</Button>
                <Button key={1} style={{ textTransform: "none" }}>
                  {item?.authorship}
                </Button>
              </ButtonGroup>

              <ButtonGroup
                sx={
                  item?.publication != ""
                    ? { display: "block" }
                    : { display: "none" }
                }
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button key={0}>Publicação</Button>
                <Button key={1}style={{ textTransform: "none" }}>
                  {item?.publication}
                </Button>
              </ButtonGroup>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button>Assuntos</Button>
                {item?.subjects?.map((s) => (
                  <Button style={{ textTransform: "none" }}>
                    <Box key={s.a}
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
            </Box>
          </Box>
          {/** MARC TAG */}
          <Box
            sx={
              value == 1
                ? {
                  height: 400
                  }
                : { display: "none" }
            }
          >
            <DataGrid 
              columns={[
                { field: 'Tag' },
                { field: 'Ind1' },
                { field: 'Ind2' },
                { field: 'Subcampos', width: 500,  editable: true  },
              ]}
              rows={rows}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={processRowUpdate}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
