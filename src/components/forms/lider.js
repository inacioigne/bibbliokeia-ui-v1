import { Accordion, AccordionSummary, Grid, TextField, MenuItem  } from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function Lider(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        LIDER
      </AccordionSummary>
      <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
        <Controller
          name={"lider.lider04"}
          control={props.control}
          defaultValue={"lider.lider04"}
          render={({ field }) => (
            <TextField
              {...field}
              label="00-04 - Tamanho do registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            />
          )}
        />
        <Controller
          name={`lider.lider05`}
          control={props.control}
          defaultValue={"lider.lider05"}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="05 - Status do registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
              <MenuItem key="a" value="a">
                a - Aumento no nível de catalogação
              </MenuItem>
              <MenuItem key="c" value="c">
                c - Alterado ou revisado
              </MenuItem>
              <MenuItem key="d" value="d">
                d - Excluído
              </MenuItem>
              <MenuItem key="n" value="n">
                n - Novo
              </MenuItem>
              <MenuItem key="p" value="p">
                p - Catalogação da pré-publicação
              </MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Accordion>
  );
}
