import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

export default function Lider(props) {
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
          Lider
          </Typography>
        </AccordionSummary>
        <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
          <TextField 
          label="00-04 - Tamanho do registro" 
          size="small"
          disabled
          defaultValue={"||||"}
          sx={{ width: 210 }}
          name="lider" />
          <TextField
            label="05 - Status do registro"
            select
            defaultValue={"n"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
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
          <TextField
            label="06 - Tipo de registro"
            select
            defaultValue={"a"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="a" value="a">
            a - Material textual
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Notação musical
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Notação musical manuscrita
            </MenuItem>
            <MenuItem key="c" value="c">
            e - Material cartográfico impresso
            </MenuItem>
            <MenuItem key="f" value="f">
            f - Material cartográfico manuscrito
            </MenuItem>
            <MenuItem key="g" value="g">
            g - Mídia projetável
            </MenuItem>
            <MenuItem key="i" value="i">
            i - Gravação de som não musical
            </MenuItem>
            <MenuItem key="j" value="j">
            j - Gravação de som musical
            </MenuItem>
            <MenuItem key="k" value="k">
            k - Material gráfico
            </MenuItem>
            <MenuItem key="f" value="f">
            f - Material cartográfico manuscrito
            </MenuItem>
            <MenuItem key="m" value="m">
            m - Arquivo de computador
            </MenuItem>
            <MenuItem key="o" value="o">
            o - Kit
            </MenuItem>
            <MenuItem key="p" value="p">
            p - Material misto
            </MenuItem>
            <MenuItem key="r" value="r">
            r - Artefatos tridimensionais
            </MenuItem>
          </TextField>
          <TextField
            label="07 - Nível bibliográfico"
            select
            defaultValue={"m"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="a" value="a">
            a - Artigo
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Artigo seriado
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Coleção
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Subunidade
            </MenuItem>
            <MenuItem key="i" value="i">
            i - Recurso integrado
            </MenuItem>
            <MenuItem key="m" value="m">
            m - Monografia
            </MenuItem>
            <MenuItem key="s" value="s">
            s - Publicação seriada
            </MenuItem>
          </TextField>
          <TextField
            label="08 - Tipo de controle"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="#" value="#">
            # - Tipo não especificado
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Arquivístico
            </MenuItem>
          </TextField>
          <TextField
            label="09 - Esquema de Codificação de Caractere"
            select
            defaultValue={"a"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="#" value="#">
            # - MARC-8
            </MenuItem>
            <MenuItem key="a" value="a">
            a - UCS/Unicode
            </MenuItem>
          </TextField>
          <TextField 
          name="lider"
          label="10 - Número de indicadores" size="small" sx={{ width: 210 }} defaultValue="2"/>
          <TextField 
          name="lider"
          label="11 - Número de subcampos" size="small" sx={{ width: 210 }} defaultValue="2"/>
          <TextField 
          name="lider"
          label="12-16 - Endereço dos dados" size="small" sx={{ width: 210 }} defaultValue="|||||"/>
          <TextField
            label="17 - Nível de Codificação"
            select
            defaultValue={"4"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="#" value="#">
            #- Completo
            </MenuItem>
            <MenuItem key="1" value="1">
            1 - Completo, material não examinado
            </MenuItem>
            <MenuItem key="2" value="2">
            2 - Incompleto, material não examinado
            </MenuItem>
            <MenuItem key="3" value="3">
            3 - Abreviado
            </MenuItem>
            <MenuItem key="4" value="4">
            4 - Básico
            </MenuItem>
            <MenuItem key="5" value="5">
            5 - Parcial ou preliminar
            </MenuItem>
            <MenuItem key="7" value="7">
            7 - Mínimo
            </MenuItem>
            <MenuItem key="8" value="8">
            8 - Pré-publicação
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecido
            </MenuItem>
            <MenuItem key="z" value="z">
            z- Não se aplica
            </MenuItem>
          </TextField>
          <TextField
            label="18 - Forma de Catalogação Descritiva"
            select
            defaultValue={"a"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="#" value="#">
            # - Não é ISBD
            </MenuItem>
            <MenuItem key="a" value="a">
            a - AACR2
            </MenuItem>
            <MenuItem key="c" value="c">
            c - ISBD sem pontuação
            </MenuItem>
            <MenuItem key="i" value="i">
            i - ISBD com pontuação
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecido
            </MenuItem>
          </TextField>
          <TextField
            label="19 - Nível de registro de recurso em várias partes"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="lider"
          >
            <MenuItem key="#" value="#">
            # - Não especificado ou não se aplica
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Conjunto
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Parte com título independente
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Parte com título dependente
            </MenuItem>
          </TextField>
          <TextField 
          name="lider"
          label="20 - Tamanho da parte correspondente ao tamanho do campo"
           size="small" sx={{ width: 210 }} defaultValue="4"/>
          <TextField 
          name="lider"
          label="21 - Tamanho da posição do caractere de início"
           size="small" sx={{ width: 210 }} defaultValue="5"/>
          <TextField 
          name="lider"
          label="22 - Tamanho da parte definida para implementação"
           size="small" sx={{ width: 210 }} defaultValue="0"/>
           <TextField 
           name="lider"
           label="23 - Entrada não definida"
           size="small" sx={{ width: 210 }} defaultValue="0"/>
          
        </Grid>
      </Accordion>
    </Box>
  );
}
