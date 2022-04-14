import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import { api } from "../../../services/api"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Record  from "src/components/display_item/record";
import TagsMarc  from "src/components/display_item/tagsMarc";
import Exemplares  from "src/components/display_item/exemplares";
import Layout from "src/admin/layout";
import CreateExemplar from "src/pages/cataloguing/createExemplar"
import { parseCookies } from "nookies";

function getTitle(field, tag) {
  if (Object.keys(field).includes(tag)) {
    return field;
  }
}

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
  const { item_id } = router.query
  const [item, setItem] = useState(null);
  //console.log(item)
  const [rows, setRows] = useState([]);
  const [rowsEx, setRowsEx] = useState([]);
  const [anchor, setAnchor] = useState(null);
  const [value, setValue] = useState(0);
  const [exemplar, setExemplar] = useState({ exemplar: false });

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // const patchData = async (data) => {
  //   const res = await api.patch("/cataloguing/edit", data);
  // };

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
      //const { id } = router.query;
      //setItemId(id)

      //const url = `/cataloguing/item/${id}/json`;

      const getData = async () => {
        const response = await api.get(`cataloging/item/${item_id}`);
        setItem(response.data)

                // let title = res.data.datafield[245];
        // let publication = res.data.datafield[260];
        // const exs = await  api.get(`cataloguing/item/${id}/exemplares`)
        if (cancel) return
        // const img = res.data.datafield[856].filter((e) => {
        //   return e[3] == "capa"
       // })
        
        //console.log(res.data.datafield["852"].c)
        // setItem({
        //   title: title.b ? `${title.a}${title.b}` : title.a,
        //   authorship: title.c,
        //   publication: publication.a + publication.b + publication.c,
        //   subjects: res.data.datafield[650],
        //   img: img[0].u,
        //   chamada: `${res.data.datafield["090"].a} ${res.data.datafield["090"].b}`,
        //   location: res.data.datafield["852"].c,
        //   colletion: res.data.datafield["852"].b
        // });
        
        const exm = exs.data.map((i) => {
          
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

    } 
    return () => {
      cancel = true
    }
  }, [router.isReady]);

  

  const handleEdit = (e) => {
    e.preventDefault();
    const { id } = router.query;
    router.push(`editItem?id=${id}`);
  };

  // useEffect(() => {
  //   api.get("/cataloguing/exemplar").then((res) => {
  //     setExemplar(res.data);
  //   });
  // });

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <MenuBookIcon />
            </Avatar>
          }
          title={<Typography variant="h5">{item?.datafields[245].subfields.a}</Typography>}
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

        <CardContent >
          {/** Record */}
          <Record 
            value={value}
            item={item}
          />

          {/** Tags Marc */}
          {value == 1 && 
          <TagsMarc 
          value={value}
          item={item}
         
          //rows={rows}
          />}
          
         {/** exemplares */}
         <Exemplares 
         
           rows={rowsEx}
         />
          
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
        
          <CreateExemplar 
           // item={item}
           // exemplar={exemplar}
           // itemId={itemId}
          />
   
      </BootstrapDialog>
    </Container>
  );
}

Item.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    //console.log("BOOK: SEM TOKEN")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    } 
  } 

  return {
    props: {},
  };
};
