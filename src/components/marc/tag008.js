import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

export default function Tag008(props) {
    return (
        <Box>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
          sx={{ borderBottom: 1 }}
        >
          <Typography variant="h6" component="div" gutterBottom>
          008 - CAMPO DE TAMANHO FIXO
          </Typography>
        </AccordionSummary>
        <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
        <TextField 
          label="00-05 - Date entered on file" 
          size="small"
          name="008" />
          <TextField
            label="06 - Type of date/Publication status"
            select
            defaultValue={"b"}
            size="small"
            sx={{ width: 210 }}
            name="008"
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
            s - Data conhecida/data provável
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
          <TextField 
          label="07-10 - Date 1" 
          size="small"
          name="008" />
           <TextField 
          label="11-14 - Date 2" 
          size="small"
          name="008" />
          <TextField 
          label="15-17 Lugar de publicação" 
          size="small"
          name="008" />
          <TextField
            label="18-21 Ilustrações"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
            # - Sem ilustrações
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Com ilustrações
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Mapas
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Retratos
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Gráficos
            </MenuItem>
            <MenuItem key="e" value="e">
            e - Plantas
            </MenuItem>
            <MenuItem key="f" value="f">
            f - Lâminas
            </MenuItem>
            <MenuItem key="g" value="g">
            g - Música
            </MenuItem>
            <MenuItem key="h" value="h">
            h - Fac-símiles
            </MenuItem>
            <MenuItem key="i" value="i">
            i - Escudo ou brasões
            </MenuItem>
            <MenuItem key="j" value="j">
            j - Tabela genealógica
            </MenuItem>
            <MenuItem key="k" value="k">
            k - Fórmulas
            </MenuItem>
            <MenuItem key="l" value="l">
            l - Amostras
            </MenuItem>
            <MenuItem key="m" value="m">
            m - Gravações
            </MenuItem>
            <MenuItem key="o" value="o">
            o - Fotografias
            </MenuItem>
            <MenuItem key="p" value="p">
            p - Iluminuras
            </MenuItem>
            <MenuItem key="|" value="|">
            | - Não codificado
            </MenuItem>
          </TextField>


        </Grid>

        </Accordion>

        </Box>

    )
        
}