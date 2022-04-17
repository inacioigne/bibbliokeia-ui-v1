import { ItemProvider } from "src/admin/contexts/itemContext"
import ItemCard from "src/components/display_item/card_item"
import { parseCookies } from "nookies";
import Layout from "src/admin/layout";
// import { useState, useEffect, createContext } from "react";
// 
// import { api } from "../../../services/api"
// import Box from "@mui/material/Box";
// import  from "@mui/material/Typography";
// 
// 
// import  from "@mui/material/Avatar";
// 
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// 
// import  from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import  from "@mui/material/Tooltip";
// import  from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import CloseIcon from "@mui/icons-material/Close";
// import PropTypes from "prop-types";
// import Record  from "src/components/display_item/record";
// import TagsMarc  from "src/components/display_item/tagsMarc";
// import Exemplares  from "src/components/display_item/exemplares";
// 
// import CreateExemplar from "src/pages/cataloguing/createExemplar"

// import { ItemContext } from "src/admin/contexts/itemContext"
// 
// import { useContext } from 'react';



// function getTitle(field, tag) {
//   if (Object.keys(field).includes(tag)) {
//     return field;
//   }
// }

// 

// const BootstrapDialogTitle = (props) => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

export default function Item() {
  // const router = useRouter();
   //const { item_id } = router.query
//   
//   //const [rows, setRows] = useState([]);
//   const [rowsEx, setRowsEx] = useState([]);
//   
//   
//   const [exemplar, setExemplar] = useState({ exemplar: false });
//   

//   //const { provItem } = useContext(ItemContext);
  
  





//   // const patchData = async (data) => {
//   //   const res = await api.patch("/cataloguing/edit", data);
//   // };

//   

//   

//   useEffect(() => {
//     let cancel = false
//     if (router.isReady) {
//       //const { id } = router.query;
//       //setItemId(id)

//       //const url = `/cataloguing/item/${id}/json`;

//       const getData = async () => {
//         const response = await api.get(`cataloging/item/${item_id}`);
//         setItem(response.data)

//                 // let title = res.data.datafield[245];
//         // let publication = res.data.datafield[260];
//         // const exs = await  api.get(`cataloguing/item/${id}/exemplares`)
//         if (cancel) return
//         // const img = res.data.datafield[856].filter((e) => {
//         //   return e[3] == "capa"
//        // })
        
//         //console.log(res.data.datafield["852"].c)
//         // setItem({
//         //   title: title.b ? `${title.a}${title.b}` : title.a,
//         //   authorship: title.c,
//         //   publication: publication.a + publication.b + publication.c,
//         //   subjects: res.data.datafield[650],
//         //   img: img[0].u,
//         //   chamada: `${res.data.datafield["090"].a} ${res.data.datafield["090"].b}`,
//         //   location: res.data.datafield["852"].c,
//         //   colletion: res.data.datafield["852"].b
//         // });
        
//         const exm = exs.data.map((i) => {
          
//           return {
//             id: i.id,
//             Biblioteca: i.library,
//             Localização: i.shelf,
//             Chamada: i.callnumber,
//             Volume: i.volume,
//             Exemplar: i.created_at,
//             Registro: i.number
//           }
//         })
//         setRowsEx(exm)

//         const r = [
//           {
//             id: "000",
//             Tag: "000",
//             Ind1: "#",
//             Ind2: "#",
//             Subcampos: res.data.leader,
//           },
//         ];

//         Object.entries(res.data.controlfield).map((c) =>
//           r.push({
//             id: "controlfield-" + c[0],
//             Tag: c[0],
//             Ind1: "#",
//             Ind2: "#",
//             Subcampos: c[1],
//           })
//         );

//         Object.entries(res.data.datafield).map((c) =>
//           Array.isArray(c[1])
//             ? c[1].forEach(function (e, i) {
//                 r.push({
//                   id: "datafield-" + c[0] + i + "-" + id,
//                   Tag: c[0],
//                   Ind1: c[1].Ind1 ? c[1].Ind1 : "#",
//                   Ind2: c[1].Ind2 ? c[1].Ind2 : "#",
//                   Subcampos: Object.entries(e)
//                     .map(
//                       (sub) =>
//                         (sub[0] != "Ind1") & (sub[0] != "Ind2") &&
//                         `|${sub[0]} ${sub[1]} `
//                     )
//                     .filter((e) => e != 0)
//                     .join(""),
//                 });
//               })
//             : r.push({
//                 id: "datafield-" + c[0],
//                 Tag: c[0],
//                 Ind1: c[1].Ind1 ? c[1].Ind1 : "#",
//                 Ind2: c[1].Ind2 ? c[1].Ind2 : "#",
//                 Subcampos: Object.entries(c[1])
//                   .map(
//                     (sub) =>
//                       (sub[0] != "Ind1") & (sub[0] != "Ind2") &&
//                       `|${sub[0]} ${sub[1]} `
//                   )
//                   .filter((e) => e != 0)
//                   .join(""),
//               })
//         );

//         setRows(r);
//       };
//       getData().catch((err) => {
//         console.error("ops! ocorreu um erro" + err);
//       });

//     } 
//     return () => {
//       cancel = true
//     }
//   }, [router.isReady]);

  



  // useEffect(() => {
  //   api.get("/cataloguing/exemplar").then((res) => {
  //     setExemplar(res.data);
  //   });
  // });

  return (
    <ItemProvider>
    <ItemCard />
    
    </ItemProvider>
  );
}

Item.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    
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
