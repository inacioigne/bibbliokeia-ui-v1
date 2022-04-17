import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "src/services/api"
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";

export default function Exemplares(props) {
  const { item_id } = useContext(ItemContext);

  const getData = async () => {
    const response = await api.get(`cataloging/exemplar/${item_id}`);
    console.log("EX: ",response)
}

  useEffect(() => {
    getData()

  }, [])

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
              rows={props.rows}
            />
        </Box>
    )
}