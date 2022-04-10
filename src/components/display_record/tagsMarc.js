import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useRef, useState } from "react";
import api from "../../services/api";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (item.Subcampos?.trim() === "") {
            reject();
          } else {
            resolve(item);
          }
        }, 200)
      ),
    []
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.Subcampos !== oldRow.Subcampos) {
    return `Name from '${oldRow.Subcampos}' to '${newRow.Subcampos}`;
  }
  return null;
}

export default function TagsMarc(props) {
  const cellEditable = ["245","250", "856"]
  const patchData = async (data) => {
    const res = await api.patch(`cataloguing/item/${props.itemId}/patch`, data);
  };

  const mutateRow = useFakeMutation();
  const noButtonRef = useRef(null);
  const [promiseArguments, setPromiseArguments] = useState(null);

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow);
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow);
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      //requests
      const sb = newRow.Subcampos.split("|");
      sb.shift();
      const obj = new Object();
      obj["Ind1"] = newRow.Ind1;
      obj["Ind2"] = newRow.Ind2;
      sb.forEach((e) => {
        obj[e.split(" ", 1)[0]] = e.substr(2);
      });
      const tagMarc = {
        marc: newRow.id.split("-")[0],
        tag: newRow.Tag,
        subfield: obj,
      };
      patchData(tagMarc).catch((err) => {
   console.error("ops! ocorreu um erro" + err);
   });
      const response = await mutateRow(newRow);
      console.log(response);
      setSnackbar({ children: "User successfully saved", severity: "success" });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    //not used
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);
    
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

 
  return (
    <Box sx={{ height: 400,
     '& .MuiDataGrid-cell--editable': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
        }, }}>
      {renderConfirmDialog()}
      <DataGrid
        columns={[
          { field: "Tag" },
          { field: "Ind1" },
          { field: "Ind2" },
          { field: "Subcampos", width: 600, editable: true },
        ]}
        rows={props.rows}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        isCellEditable={(params) => cellEditable.includes(params.row.Tag)}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
