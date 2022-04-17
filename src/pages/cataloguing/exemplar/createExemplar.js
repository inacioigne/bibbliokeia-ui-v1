import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { api } from "src/services/api"
import { useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";

export default function CreateExemplar(props) {
  const { item_id, item } = useContext(ItemContext);
  console.log("EX:", item.datafields["090"].subfields.b)
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      exemplares: [
        {
          library: "Biblioteca do INPA",
          shelf: item.datafields["090"].subfields.b,
          callnumber: item.datafields["090"].subfields.b,
          collection: "",
          volume: "",
          ex: "",
          number: "",
          status: "disponivel",
        },
      ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "exemplares",
    }
  );
  const addField = (index) => {
    append({
        library: "Biblioteca do INPA",
        shelf: props.item.location,
        callnumber: props.item.chamada,
        collection: "",
        volume: "",
        ex: "",
        number: getRegister(index),
        status: "disponivel",
      },);
  };

  const getRegister = () => {
      const q = fields.length
    const r = props.exemplar?.exemplar
    const n = parseInt(r.split("-")[1]) + q
    
    const ano = r.split("-")[0]
    return `${ano}-${("0000" + n).slice(-4)}`

  }
  const postExemplar = async (data) => {
    const res = await api.post(`cataloguing/item/${props.itemId}/exemplar`, data);
    console.log(res)
  };
  const onSubmit = (data) => {
    postExemplar(data)
    .catch((err) => {
               console.error("ops! ocorreu um erro" + err);
          });
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: "flex", gap: 1 }}>
              <Controller
                name={`exemplares[${index}].library`}
                control={control}
                defaultValue={field.library}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Biblioteca"
                    variant="outlined"
                    size="small"
                    sx={{ width: 170 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].shelf`}
                control={control}
                defaultValue={field.shelf}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Local"
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].callnumber`}
                control={control}
                defaultValue={field.callnumber}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Chamada"
                    variant="outlined"
                    size="small"
                    sx={{ width: 130 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].collection`}
                control={control}
                defaultValue={field.collection}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Coleção"
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].volume`}
                control={control}
                defaultValue={field.volume}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Volume"
                    variant="outlined"
                    size="small"
                    sx={{ width: 50 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].ex`}
                control={control}
                defaultValue={field.ex}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ex."
                    variant="outlined"
                    size="small"
                    sx={{ width: 50 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].number`}
                control={control}
                defaultValue={field.number}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Registro"
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                  />
                )}
              />
              <Controller
                name={`exemplares[${index}].status`}
                control={control}
                defaultValue={field.status}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                  >
                    <MenuItem value="disponivel">Disponivel</MenuItem>
                    <MenuItem value="local">Local</MenuItem>
                  </TextField>
                )}
              />
               <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AddIcon color="primary" onClick={addField} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RemoveIcon color="primary" onClick={() => remove(index)}/>
            </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus type="submit">
          Salvar
        </Button>
      </DialogActions>
    </form>
  );
}
