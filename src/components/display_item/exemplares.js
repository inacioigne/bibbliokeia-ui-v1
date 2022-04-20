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
import { useContext, useRef, useState } from "react";
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
  const [selectionModel, setSelectionModel] = useState([]);

  const handleDelete = () => {
    const newRow = rowsEx.filter((row) => {
      return !selectionModel.includes(row.id);
    });

    // const dellRow = rowsEx.filter((row) => {
    //   return selectionModel.includes(row.id);
    // });

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

  return (
    <Box>
      {renderConfirmDialog()}

      <Box style={{ height: 250, width: "100%" }}>
        <DataGrid
          columns={[
            { field: "Biblioteca" },
            { field: "Localização" },
            { field: "Chamada" },
            { field: "Localização" },
            { field: "Volume" },
            { field: "Exemplar" },
            { field: "Registro" },
            { field: "Status" },
          ]}
          rows={rowsEx}
          hideFooter
          checkboxSelection={checkboxExemplares}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
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
