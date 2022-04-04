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
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { SendTimeExtension } from "@mui/icons-material";

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
            reject();
          } else {
            resolve({ ...item, subcampo: item.Subcampo?.toUpperCase() });
          }
        }, 200)
      ),
    []
  );
};

{
  /** EXEMPLARES */
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Item() {
  const router = useRouter();
  const [item, setItem] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsEx, setRowsEx] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [value, setValue] = useState(0);
  const [exemplar, setExemplar] = useState({ exemplar: false });
  const mutateRow = useFakeMutation();

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const patchData = async (data) => {
    const res = await api.patch("/cataloguing/edit", data);
    //console.log(res)
  };

  const processRowUpdate = useCallback(
    async (newRow) => {
      try {
        //requests

        const sb = newRow.Subcampos.split("|");
        sb.shift();
        const o = new Object();
        sb.forEach((e) => {
          o[e.split(" ", 1)[0]] = e.substr(2);
        });

        const tagMarc = {
          id: newRow.id.split("-")[2],
          marc: newRow.id.split("-")[0],
          tag: newRow.Tag,
          ind1: newRow.Ind1,
          ind2: newRow.Ind2,
          subcampos: o,
        };
        patchData(tagMarc).catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });

        //console.log(tagMarc)

        const response = await mutateRow(newRow);
        alert("ALLLLTEEEADDD");
        return response;
      } catch (error) {
        alert("ERROOOOO!!!");
        throw error;
      }
    },
    [mutateRow]
  );

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
    let cancel = false
    if (router.isReady) {
      const { id } = router.query;
      const url = `/cataloguing/item/${id}/json`;

      const getData = async () => {
        const res = await api.get(url);
        let title = res.data.datafield[245];
        let publication = res.data.datafield[260];
        const exs = await  api.get(`cataloguing/item/${id}/exemplares`)
        if (cancel) return
        setItem({
          title: title.b ? `${title.a}${title.b}` : title.a,
          authorship: title.c,
          publication: publication.a + publication.b + publication.c,
          subjects: res.data.datafield[650],
          img: res.data.datafield[856].u,
        });
        //console.log(exs.data)
        const exm = exs.data.map((i) => {
          //console.log(i)
          
          return {
            id: i.id,
            Biblioteca: i.library,
            Localização: i.shelf,
            Chamada: i.callnumber,
            Volume: i.volume,
            Exemplar: i.created_at,
            Registro: i.number
          }
        })
        //console.log(exm)
        setRowsEx(exm)

        const r = [
          {
            id: "000",
            Tag: "000",
            Ind1: "#",
            Ind2: "#",
            Subcampos: res.data.leader,
          },
        ];

        Object.entries(res.data.controlfield).map((c) =>
          r.push({
            id: "controlfield-" + c[0],
            Tag: c[0],
            Ind1: "#",
            Ind2: "#",
            Subcampos: c[1],
          })
        );

        Object.entries(res.data.datafield).map((c) =>
          Array.isArray(c[1])
            ? c[1].forEach(function (e, i) {
                r.push({
                  id: "datafield-" + c[0] + i + "-" + id,
                  Tag: c[0],
                  Ind1: c[1].Ind1 ? c[1].Ind1 : "#",
                  Ind2: c[1].Ind2 ? c[1].Ind2 : "#",
                  Subcampos: Object.entries(e)
                    .map(
                      (sub) =>
                        (sub[0] != "Ind1") & (sub[0] != "Ind2") &&
                        `|${sub[0]} ${sub[1]} `
                    )
                    .filter((e) => e != 0)
                    .join(""),
                });
              })
            : r.push({
                id: "datafield-" + c[0],
                Tag: c[0],
                Ind1: c[1].Ind1 ? c[1].Ind1 : "#",
                Ind2: c[1].Ind2 ? c[1].Ind2 : "#",
                Subcampos: Object.entries(c[1])
                  .map(
                    (sub) =>
                      (sub[0] != "Ind1") & (sub[0] != "Ind2") &&
                      `|${sub[0]} ${sub[1]} `
                  )
                  .filter((e) => e != 0)
                  .join(""),
              })
        );

        setRows(r);
      };
      getData().catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

      //GET EXEMPLARES
      // api.get(`cataloguing/item/${id}/exemplares`)
      // .then(function (response) {
      //   console.log(response)
      //   if (cancel) return
      //   setRowsEx(response.data)
      // })
      // .catch((err) => {
      //   console.error("ops! ocorreu um erro" + err);
      // });

    } 
    return () => {
      cancel = true
    }
  }, [router.isReady]);

  

  const handleEdit = (e) => {
    e.preventDefault();
    const { id } = router.query;
    //console.log("EDITAR: ", id);
    router.push(`editItem?id=${id}`);
  };

  const handleExemplar = (e) => {
    e.preventDefault();
    let { id } = router.query;
    const formData = new FormData(e.target);

    const ex = new Object();

    for (const [k, v] of formData.entries()) {
      ex[`${k}`] = v;
    }
    const exs = { exs: [ex] };
    //console.log(exs)
    api
      .post(`/cataloguing/item/${id}/exemplar`, exs)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getNumber = async () => {
    const res = await api.get("/cataloguing/exemplar");
  };

  useEffect(() => {
    api.get("/cataloguing/exemplar").then((res) => {
      setExemplar(res.data);
    });
  });

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

        <CardContent>
          {/** Record */}
          <Box
            sx={value == 0 ? { display: "block", gap: 3 } : { display: "none" }}
          >
            <Box sx={{ display: "flex", gap: 3 }}>
              <CardMedia
                component="img"
                height="194"
                image={item.img}
                sx={{ width: 151 }}
              />

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
                  <Button key={1} style={{ textTransform: "none" }}>
                    {item?.publication}
                  </Button>
                </ButtonGroup>

                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button>Assuntos</Button>

                  {item?.subjects?.map((s, index) => (
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
              </Box>
            </Box>
          </Box>

          {/** Tags Marc */}
          <Box
            sx={
              value == 1
                ? {
                    height: 400,
                  }
                : { display: "none", height: 400 }
            }
          >
            <DataGrid
              columns={[
                { field: "Tag" },
                { field: "Ind1" },
                { field: "Ind2" },
                { field: "Subcampos", width: 600, editable: true },
              ]}
              rows={rows}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={processRowUpdate}
            />
          </Box>
          <Box style={{ height: 250, width: "100%" }}>
            Exemplares
            <DataGrid
              columns={[
                { field: "Biblioteca" }, 
              { field: "Localização" },
              { field: "Chamada"},
              { field: "Localização" }, 
              { field: "Volume" },
              { field: "Exemplar" }, 
              { field: "Registro" }, 
              { field: "Status" }
              ]}
              // rows={[
              //   {
              //     id: 1,
              //     Biblioteca: "Biblioteca do INPA",
              //     Localização: "II-VII",
              //     Chamada: "651.7",
              //     Volume: "",
              //     Exemplar: "Ex. 1",
              //     Registro: "22-0001",
              //     Status: "Disponivel"
              //   },
              // ]}
              rows={rowsEx}
            />
          </Box>
        </CardContent>
        <Box sx={{ borderTop: 1, mt: 2, p: 2, display: "flex", gap: 3 }}>
          <Button variant="outlined" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            Adicionar Exemplar
          </Button>
        </Box>
      </Card>
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        maxWidth={false}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseModal}
        >
          Adicionar Exemplar
        </BootstrapDialogTitle>
        <form onSubmit={handleExemplar}>
          <DialogContent dividers>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="library"
                name="library"
                label="Biblioteca"
                variant="outlined"
                size="small"
                defaultValue="Biblioteca do INPA"
                sx={{ width: 100 }}
              />
              <TextField
                id="shelf"
                name="shelf"
                label="Local"
                variant="outlined"
                size="small"
                sx={{ width: 100 }}
              />
              <TextField
                id="callnumber"
                name="callnumber"
                label="Chamada"
                variant="outlined"
                size="small"
                sx={{ width: 100 }}
              />

              <TextField
                id="collection"
                label="Coleção"
                variant="outlined"
                size="small"
                sx={{ width: 100 }}
              />
              <TextField
                id="volume"
                label="v."
                variant="outlined"
                size="small"
                sx={{ width: 50 }}
              />
              <TextField
                id="ex"
                label="ex."
                variant="outlined"
                size="small"
                sx={{ width: 50 }}
              />
              <TextField
                id="number"
                name="number"
                label="Registro"
                variant="outlined"
                size="small"
                defaultValue={exemplar?.exemplar}
                sx={{ width: 100 }}
              />
              <Box
                onClick={getNumber}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddIcon color="primary" />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </Container>
  );
}
