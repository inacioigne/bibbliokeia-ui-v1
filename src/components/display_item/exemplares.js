import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "src/services/api";
import { useContext, useRef, useState, useCallback } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";
import DeleteIcon from "@mui/icons-material/Delete";



export default function Exemplares(props) {
  const {
    item_id,
    rowsEx,
    setRowsEx,
    checkboxExemplares,
    setCheckboxExemplares,
  } = useContext(ItemContext);
  console.log('EX: ', rowsEx)
  const [selectionModel, setSelectionModel] = useState([]);

  const handleDelete = () => {
    const newRow = rowsEx.filter((row) => {
      return !selectionModel.includes(row.id);
    });

    const pr = new Promise((resolve, reject) => {
      setPromiseArguments({ resolve, reject, newRow, selectionModel });
    });

 
  };

  {
    /** CONFIRMAÇÃO */
  }
  const handleYes = async () => {
    const { newRow, selectionModel, reject, resolve } = promiseArguments;
    try {
      //FAZER O DELETE
      selectionModel.forEach((ex_id) => {
        api
          .delete(`/cataloging/exemplar/${ex_id}`)
          //.then((response) => console.log("DEL: ", response))
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      });
      setRowsEx(newRow);

      setPromiseArguments(null);
      setCheckboxExemplares(!checkboxExemplares)
    } catch (error) {
      //setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(selectionModel);
      setPromiseArguments(null);
      setCheckboxExemplares(!checkboxExemplares)
    }
  };
  const handleNo = () => {
    const { newRow, selectionModel } = promiseArguments;
    //resolve(selectionModel);
    //console.log("NO: ", promiseArguments)
    setPromiseArguments(null);
    setCheckboxExemplares(!checkboxExemplares)
  };
  const noButtonRef = useRef(null);
  const handleEntered = () => {
    //not used
  };
  const [promiseArguments, setPromiseArguments] = useState(null);
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    const { newRow, selectionModel } = promiseArguments;

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Deseja excluir os exemplares?</DialogTitle>
        <DialogContent dividers>
          {
            rowsEx.filter((row) => {
      return selectionModel.includes(row.id);
     }).map((row) => (            
            <p key={row.id}>{row.Registro}</p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            Não
          </Button>
          <Button onClick={handleYes}>Sim</Button>
        </DialogActions>
      </Dialog>
    );
  };
  {/** UPDATE EXEMPLAR */}
  
  // const processRowUpdate = useCallback(

  //   (newRow, oldRow) =>
    
  //     new Promise((resolve, reject) => {
  //       console.log('UP: ', newRow, oldRow)
  //       const mutation = computeMutation(newRow, oldRow);
  //       if (mutation) {
          
  //         setPromiseArguments({ resolve, reject, newRow, oldRow });
         
  //       } else {
  //         resolve(oldRow);
  //       }
  //     }),
  //   []
  // );
  const handleNoUpdate = () => {
    const { oldRow, resolve } = promiseUpdateEx;
    resolve(oldRow);
 
    setPromiseUpdateEx(null);

  };
  const handleYesUpdate = async () => {
    const { newRow, oldRow, reject, resolve } = promiseUpdateEx;
    try {
      

     
      console.log("NEWROW: ", newRow)

    // patchData(data).catch((err) => {
    //  console.error("ops! ocorreu um erro" + err);
    //  });
    //   const response = await mutateRow(newRow);
    //   //console.log("RES:", response);
    //   setSnackbar({ children: "Item atualizado com sucesso", severity: "success" });
    //   resolve(response);
      
      
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const renderConfirmUpdate = () => {
    if (!promiseUpdateEx) {
      return null;
    }
    const { newRow, oldRow } = promiseUpdateEx;
    const mutation = computeMutation(newRow, oldRow);
    
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseUpdateEx}
      >
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent dividers>
          {`Deseja substituir os ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNoUpdate}>
            Não
          </Button>
          <Button onClick={handleYesUpdate}>Sim</Button>
        </DialogActions>
      </Dialog>
    );
  };
  function computeMutation(newRow, oldRow) {
    if (newRow !== oldRow) {
      //console.log('MUT :', oldRow.Registro)
      return `Exemplar '${oldRow.Registro}'`;
    }
    return null;
  }
  const [promiseUpdateEx, setPromiseUpdateEx] = useState(null);
  const updateEx = useCallback(
    (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        setPromiseUpdateEx({ resolve, reject, newRow, oldRow });
        console.log('UP: ', promiseUpdateEx)

      } else {
                 resolve(oldRow);
              }


    }), [])
  

  return (
    <Box>
      {renderConfirmDialog()}
      {renderConfirmUpdate()}

      <Box style={{ height: 250, width: "100%" }}>
        <DataGrid
          columns={[
            { field: "Biblioteca", width: 200, editable: true },
            { field: "Localização", width: 150, editable: true },
            { field: "Chamada", width: 150, editable: true },
            { field: "Volume", editable: true },
            { field: "Exemplar", editable: true },
            { field: "Registro" },
            { field: "Status", editable: true },
          ]}
          rows={rowsEx}
          hideFooter
          checkboxSelection={checkboxExemplares}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={updateEx}
       
        />
      </Box>
      <Button
        sx={checkboxExemplares ? { mt: 1 } : { display: "none" }}
        aria-label="delete"
        size="small"
        variant="outlined"
        onClick={handleDelete}
      >
        Excluir <DeleteIcon />
      </Button>
    </Box>
  );
}
