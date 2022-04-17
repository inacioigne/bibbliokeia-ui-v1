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
} from "@mui/material";
import { red } from "@mui/material/colors";
import { MenuBook, MoreVert, Close } from "@mui/icons-material";
import { ItemContext } from "src/admin/contexts/itemContext";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import Record from "./record"
import TagsMarc from "./tagsMarc"
import Exemplares from "./exemplares"
import CreateExemplar from "src/pages/cataloguing/exemplar/createExemplar"

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
  const { item } = useContext(ItemContext);
  

  const [anchor, setAnchor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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
          {value == 1 && (
            <TagsMarc value={value}/>
          )}

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
         <CreateExemplar /> 
      </BootstrapDialog>
      </Card>
    </Container>
  );
}