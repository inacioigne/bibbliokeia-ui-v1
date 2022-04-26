import { Accordion, AccordionSummary, Grid, TextField, MenuItem  } from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import { Controller } from "react-hook-form";

export default function Tag008(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        008
      </AccordionSummary>
      <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
        <Controller
          name={"tag008.tag008_05"}
          control={props.control}
          defaultValue={"tag008.tag008_05"}
          render={({ field }) => (
            <TextField
              {...field}
              label="00-05 - Data de entrada"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            />
          )}
        />
        <Controller
          name={"tag008.tag008_06"}
          control={props.control}
          defaultValue={"tag008.tag008_06"}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="05 - Status do registro"
              variant="outlined"
              size="small"
              sx={{ width: 170 }}
            >
             <MenuItem key="b" value="b">
              b - Nenhuma data fornecida/ Data A.C.
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Publicação corrente
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Publicação encerrada
            </MenuItem>
            <MenuItem key="e" value="e">
              e - Data detalhada
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Data inclusiva de coleção
            </MenuItem>
            <MenuItem key="k" value="k">
              k - Intervalo de datas
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Datas múltiplas
            </MenuItem>
            <MenuItem key="n" value="n">
              n - Datas desconhecidas
            </MenuItem>
            <MenuItem key="p" value="p">
              p - Data de produção
            </MenuItem>
            <MenuItem key="q" value="q">
              q - Data questionável
            </MenuItem>
            <MenuItem key="r" value="r">
              r - Reimpressão/Data original
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Data conhecida
            </MenuItem>
            <MenuItem key="t" value="t">
              t - Data de publicação e copyright
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Status desconhecido
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
            </MenuItem>
            </TextField>
          )}
        />
      </Grid>
    </Accordion>
  );
}
