import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';

export default function CheckboxSelectionGrid() {
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const rowsEx = [{
                      id: 1,
                      Biblioteca: "INPA",
                      Localização: "E1.P2",
                      Chamada: "598.2 O48",
                      Volume: "v.I",
                      Exemplar: "ex.1",
                      Registro: "22-0001",
                      Status: "Disponível"                  
                    },
                    {
                        id: 2,
                        Biblioteca: "INPA",
                        Localização: "E1.P2",
                        Chamada: "598.2 O48",
                        Volume: "v.I",
                        Exemplar: "ex.1",
                        Registro: "22-0002",
                        Status: "Disponível"                  
                      },
                      {
                        id: 3,
                        Biblioteca: "INPA",
                        Localização: "E1.P2",
                        Chamada: "598.2 O48",
                        Volume: "v.I",
                        Exemplar: "ex.1",
                        Registro: "22-0003",
                        Status: "Disponível"                  
                      }
                ]

  return (
    <div style={{ width: '100%' }}>
      <Button
        sx={{ mb: 2 }}
        onClick={() => setCheckboxSelection(!checkboxSelection)}
      >
        Toggle checkbox selection
      </Button>
      <div style={{ height: 400 }}>
        <DataGrid 
        checkboxSelection={checkboxSelection}
        // onSelectionModelChange={(newSelectionModel) => {
        //   console.log("TEST: ",newSelectionModel)
        //   setSelectionModel(newSelectionModel);
        // }}
        // selectionModel={selectionModel}
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
      </div>
    </div>
  );
}