import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "src/services/api"
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";

export default function Exemplares(props) {
  const { item_id, rowsEx, setRowsEx } = useContext(ItemContext);
  //const [rows, setRows] = useState([]);
  //console.log("CTX: ", rowsEx)

//   const getData = async () => {
//     const response = await api.get(`cataloging/exemplar/${item_id}`);
//     const exm = response.data.exemplares.map((i) => {
//       //const exm = rowsEx.map((i) => {
          
//                 return {
//                   id: i.id,
//                   Biblioteca: i.library,
//                   Localização: i.shelf,
//                   Chamada: i.callnumber,
//                   Volume: i.volume,
//                   Exemplar: i.ex,
//                   Registro: i.number,
//                   Status: i.status                  
//                 }
//               })
//       setRows(exm)
      

// }

//   useEffect(() => {
//     getData()

//   }, [])

    return (
        <Box style={{ height: 250, width: "100%" }}>
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
              rows={rowsEx}
            />
        </Box>
    )
}