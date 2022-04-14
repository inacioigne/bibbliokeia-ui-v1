import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function Exemplares(props) {
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