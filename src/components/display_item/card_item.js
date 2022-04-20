import {
  Container,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Box,
  Button,
  Dialog,
  styled,
  DialogTitle,
  Stack,
  Snackbar,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList

} from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import { MenuBook, MoreVert, Close, ArrowDropDown } from "@mui/icons-material";
import { ItemContext } from "src/admin/contexts/itemContext";
import { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Record from "./record";
import TagsMarc from "./tagsMarc";
import Exemplares from "./exemplares";
import CreateExemplar from "src/components/cataloguing/createExemplar";
import { api } from "src/services/api";
import BtnDelete from "src/components/cataloguing/btn_delete"

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
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ItemCard() {
  const { item, openModal, setOpenModal, openSnack, setOpenSnack } =
    useContext(ItemContext);

  const [anchor, setAnchor] = useState(null);
  //const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(0);
  const [lastEx, setLastEx] = useState({});

  const getData = async () => {
    const response = await api.get(`cataloging/exemplar/last_exemplar/`);

    setLastEx(response.data);
    //console.log(lastEx);
  };

  useEffect(() => {
    getData();
    //console.log("EX: ", lastEx);
  }, []);

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

  const handleEdit = (e) => {
    e.preventDefault();
    const { id } = router.query;
    router.push(`editItem?id=${id}`);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  {
    /** SNACKBAR */
  }
  //const [openSnack, setOpenSnack] = useState()
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const action = (
    <React.Fragment>
      {/**<Button 
      color="secondary" 
      size="small" 
      onClick={handleCloseSnack}>
        UNDO
      </Button>*/}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <MenuBook />
            </Avatar>
          }
          title={
            <Typography variant="h5">
              {item?.datafields[245].subfields.a}
            </Typography>
          }
          action={
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                aria-label="settings"
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          }
          sx={{ borderBottom: 1 }}
        />
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
        {/** CONTEÚDO */}
        <CardContent>
          {/** Record */}
          <Record value={value} />

          {/** Tags Marc */}
          {value == 1 && <TagsMarc value={value} />}

          {/** exemplares*/}
          <Exemplares />
        </CardContent>
        <Box sx={{ borderTop: 1, mt: 2, p: 2, display: "flex", gap: 3 }}>
          <Button variant="outlined" onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            Adicionar Exemplar
          </Button>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Excluir
          </Button> */}
          {/** EXCLUIR */}
          <BtnDelete />
          
        </Box>
        {/** MODAL */}
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
          {/*CreateExemplar */}
          <CreateExemplar nextEx={lastEx?.exemplar} />
        </BootstrapDialog>
      </Card>
      {/** SNACKBAR */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/**
      <Button variant="outlined" onClick={handleClickSnack}>
      Open success snackbar
      </Button>*/}
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message="Exemplar salvo com sucesso!!"
          action={action}
        ></Snackbar>
      </Stack>
    </Container>
  );
}
