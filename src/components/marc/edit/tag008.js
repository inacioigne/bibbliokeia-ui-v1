import {Box, 
  Select } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect, useContext } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";


export default function Tag008(props) {
  const { item } = useContext(ItemContext);
  
  
  const CreateDate = () => {
 
    const date = new Date()
    const year = date.getFullYear().toString().substr(-2); 
    const m = date.getMonth()+1
    const month = (m < 10) ? '0'+m.toString() : m.toString()
    const day = (date.getDate() < 10) ? '0'+date.getDate().toString() : date.getDate().toString()
    const today = year+month+day
  
    return today
  }
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
          sx={{ borderBottom: 1 }}
        >
          <Typography variant="h7" component="div" gutterBottom>
            008 - CAMPO DE TAMANHO FIXO
          </Typography>
        </AccordionSummary>
        {item &&
          <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
          <TextField
            label="00-05 - Data de entrada"
            size="small"
            name="008"
            defaultValue={item?.controlfields['008']?.substring(0,6)} 
           
            sx={{ width: 210 }}
          />
          <TextField
            label="06 - Tipo de data"
            select
            defaultValue={item ? item.controlfields['008'][6]: "s"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="b" value="b">
              b - Nenhuma data fornecida/ Data A.C.
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Publica????o corrente
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Publica????o encerrada
            </MenuItem>
            <MenuItem key="e" value="e">
              e - Data detalhada
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Data inclusiva de cole????o
            </MenuItem>
            <MenuItem key="k" value="k">
              k - Intervalo de datas
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Datas m??ltiplas
            </MenuItem>
            <MenuItem key="n" value="n">
              n - Datas desconhecidas
            </MenuItem>
            <MenuItem key="p" value="p">
              p - Data de produ????o
            </MenuItem>
            <MenuItem key="q" value="q">
              q - Data question??vel
            </MenuItem>
            <MenuItem key="r" value="r">
              r - Reimpress??o/Data original
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Data conhecida
            </MenuItem>
            <MenuItem key="t" value="t">
              t - Data de publica????o e copyright
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Status desconhecido
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField 
          label="07-10 - Date 1" size="small" name="008"
          defaultValue={item?.controlfields['008']?.substring(7,11)}   />
          <TextField label="11-14 - Date 2" size="small" defaultValue={"||||"} name="008" />
          <TextField
            label="15-17 Lugar de publica????o"
            size="small"
            defaultValue={item?.controlfields['008']?.substring(15,18)} 
            name="008"
          />
          {/** 18-21 Ilustra????es */}
          <TextField 
          label="18-21 Ilustra????es"
          size="small"
          name="008"
          defaultValue={item?.controlfields['008']?.substring(18,22)} 
          >
          </TextField>

         
          <TextField
            label="22 P??blico alvo"
            select
            defaultValue={item?.controlfields["008"][22]}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Sem publico especifico
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Pr??-escolar
            </MenuItem>
            <MenuItem key="b" value="b">
              b - Infantil (1o. ciclo)
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Pr??-adolescente (2o. ciclo)
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Adolescente
            </MenuItem>
            <MenuItem key="e" value="e">
              e - Adulto
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Especializado
            </MenuItem>
            <MenuItem key="g" value="g">
              g - Geral
            </MenuItem>
            <MenuItem key="h" value="h">
              j - Juvenil
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="23 Forma do documento"
            select
            defaultValue={item?.controlfields["008"][22]}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Nenhum dos c??digos seguintes
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Microfilme
            </MenuItem>
            <MenuItem key="b" value="b">
              b - Microficha
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Microopaca
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Impress??o ampliada
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Braile
            </MenuItem>
            <MenuItem key="o" value="o">
              o ??? Online
            </MenuItem>
            <MenuItem key="q" value="q">
              q - Dispositivo eletr??nico direto
            </MenuItem>
            <MenuItem key="r" value="r">
              r - Reprodu????o em impress??o regular
            </MenuItem>
            <MenuItem key="s" value="s">
              s ??? Eletr??nica
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          {/** 24-27 Natureza do conte??do */}
          <TextField 
          label="24-27 Natureza do conte??do"
          size="small"
          name="008"
          defaultValue={item?.controlfields['008']?.substring(18,22)} 
          />
         
          <TextField
            label="28 Publica????o governamental"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Publica????o n??o oficial
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Publica????o de regi??o aut??noma
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Multilocal
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Federal/Nacional
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Internacional Intergovernamental
            </MenuItem>
            <MenuItem key="l" value="l">
              l - Local (Municipal)
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Interestadual
            </MenuItem>
            <MenuItem key="o" value="o">
              o - Publica????o governamental
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Estado, prov??ncia, territ??rio, jurisdi????o, etc.
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Ignorado
            </MenuItem>
            <MenuItem key="z" value="z">
              z - Outro
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="29 Publica????o de Confer??ncia"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - N??o ?? publica????o de confer??ncia
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - ?? uma publica????o de confer??ncia
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="30 - Obra comemorativa"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - N??o ?? uma obra comemorativa
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - ?? uma colet??nea de homenagem
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="31 - ??ndice"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - Sem ??ndice
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - Inclui ??ndice
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="32 - Indefinido"
            size="small"
            name="008"
            defaultValue="#"
            sx={{ width: 210 }}
          />
          <TextField
            label="33 - Forma liter??ria"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - N??o ?? uma obra de fic????o
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - Fic????o
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Drama
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Romance
            </MenuItem>
            <MenuItem key="h" value="h">
              h - Humor, s??tira, etc.
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Cartas
            </MenuItem>
            <MenuItem key="j" value="j">
              j - Contos
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Mais de uma forma liter??ria
            </MenuItem>
            <MenuItem key="p" value="p">
              p - Poesia
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Discursos
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Desconhecida
            </MenuItem>
            <MenuItem key="|" value="|">
              | - N??o codificado
            </MenuItem>
          </TextField>
          <TextField
            label="34 - Biografia"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
            # - N??o h?? biogr??ficos
            </MenuItem>
            <MenuItem key="a" value="a">
            a - Autobiografia
            </MenuItem>
            <MenuItem key="b" value="b">
            b - Biografia individual
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Biografia coletiva
            </MenuItem>
            <MenuItem key="d" value="d">
            d - H?? biogr??ficos
            </MenuItem>
            <MenuItem key="|" value="|">
            | - N??o codificado
            </MenuItem>
            
          </TextField>
          <TextField
            label="35-37 Idioma"
            size="small"
            name="008"
            sx={{ width: 210 }}
            defaultValue={"por"}
            
          />
          <TextField
            label="38 - Registro modificado"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
            # - N??o modificado
            </MenuItem>
            <MenuItem key="s" value="s">
            s - Abreviado
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Informa????o omitida
            </MenuItem>
            <MenuItem key="x" value="x">
            x - Faltam caracteres
            </MenuItem>
            <MenuItem key="r" value="r">
            r - Fichas em escrita original
            </MenuItem>
            <MenuItem key="o" value="o">
            o - Fichas romanizadas
            </MenuItem>
            <MenuItem key="|" value="|">
            | - N??o codificado
            </MenuItem>
            
          </TextField>
          <TextField
            label="39 - Fonte de cataloga????o"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
            # - Ag??ncia bibliogr??fica nacional
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Cataloga????o Cooperativa
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Outra
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecida
            </MenuItem>
            <MenuItem key="|" value="|">
            | - N??o codificado
            </MenuItem> 
          </TextField>
        </Grid>
        }
        
      </Accordion>
    </Box>
  );
}
