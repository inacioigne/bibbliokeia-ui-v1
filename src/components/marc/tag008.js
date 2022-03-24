import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";



export default function Tag008() {
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
          <Typography variant="h6" component="div" gutterBottom>
            008 - CAMPO DE TAMANHO FIXO
          </Typography>
        </AccordionSummary>
        <Grid container spacing={2} gap={2} sx={{ p: 3, mt: 1 }}>
          <TextField
            label="00-05 - Data de entrada"
            size="small"
            name="008"
            defaultValue={CreateDate()}
            sx={{ width: 210 }}
          />
          <TextField
            label="06 - Tipo de data"
            select
            defaultValue={"s"}
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
          <TextField label="07-10 - Date 1" size="small" name="008" />
          <TextField label="11-14 - Date 2" size="small" defaultValue={"||||"} name="008" />
          <TextField
            label="15-17 Lugar de publicação"
            size="small"
            defaultValue={"bl "}
            name="008"
          />
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
          <TextField
            label="22 Público alvo"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Sem publico especifico
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Pré-escolar
            </MenuItem>
            <MenuItem key="b" value="b">
              b - Infantil (1o. ciclo)
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Pré-adolescente (2o. ciclo)
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
              | - Não codificado
            </MenuItem>
          </TextField>
          <TextField
            label="23 Forma do documento"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Nenhum dos códigos seguintes
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
              d - Impressão ampliada
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Braile
            </MenuItem>
            <MenuItem key="o" value="o">
              o – Online
            </MenuItem>
            <MenuItem key="q" value="q">
              q - Dispositivo eletrônico direto
            </MenuItem>
            <MenuItem key="r" value="r">
              r - Reprodução em impressão regular
            </MenuItem>
            <MenuItem key="s" value="s">
              s – Eletrônica
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
            </MenuItem>
          </TextField>
          <TextField
            label="24-27 Natureza do conteúdo"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Nenhum dos códigos seguintes
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Resumos
            </MenuItem>
            <MenuItem key="b" value="b">
              b - Bibliografias
            </MenuItem>
            <MenuItem key="c" value="c">
              c - Catálogos
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Dicionários
            </MenuItem>
            <MenuItem key="e" value="e">
              e - Enciclopédia
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Manuais
            </MenuItem>
            <MenuItem key="g" value="g">
              g - Artigos jurídicos
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Índices
            </MenuItem>
            <MenuItem key="j" value="j">
              j - Patentes
            </MenuItem>
            <MenuItem key="k" value="k">
              k - Discografias
            </MenuItem>
            <MenuItem key="l" value="l">
              l - Legislação
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Teses e dissertações
            </MenuItem>
            <MenuItem key="n" value="n">
              n - Revisão de literatura
            </MenuItem>
            <MenuItem key="o" value="o">
              o - Recensão
            </MenuItem>
            <MenuItem key="p" value="p">
              p - Textos programados
            </MenuItem>
            <MenuItem key="q" value="q">
              q - Filmografia
            </MenuItem>
            <MenuItem key="r" value="r">
              r - Diretórios
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Estatísticas
            </MenuItem>
            <MenuItem key="t" value="t">
              t - Relatórios técnicos
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Normas/Especificações
            </MenuItem>
            <MenuItem key="w" value="w">
              w - Relatório de legislação
            </MenuItem>
            <MenuItem key="y" value="y">
              y - Anuários
            </MenuItem>
            <MenuItem key="z" value="z">
              z - Tratados
            </MenuItem>
            <MenuItem key="2" value="2">
              2 - Separata
            </MenuItem>
            <MenuItem key="5" value="5">
              5 - Calendários
            </MenuItem>
            <MenuItem key="6" value="6">
              6 - História em quadrinhos
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
            </MenuItem>
          </TextField>
          <TextField
            label="28 Publicação governamental"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
              # - Publicação não oficial
            </MenuItem>
            <MenuItem key="a" value="a">
              a - Publicação de região autônoma
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
              o - Publicação governamental
            </MenuItem>
            <MenuItem key="s" value="s">
              s - Estado, província, território, jurisdição, etc.
            </MenuItem>
            <MenuItem key="u" value="u">
              u - Ignorado
            </MenuItem>
            <MenuItem key="z" value="z">
              z - Outro
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
            </MenuItem>
          </TextField>
          <TextField
            label="29 Publicação de Conferência"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - Não é publicação de conferência
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - É uma publicação de conferência
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
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
              0 - Não é uma obra comemorativa
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - É uma coletânea de homenagem
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
            </MenuItem>
          </TextField>
          <TextField
            label="31 - Índice"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - Sem índice
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - Inclui índice
            </MenuItem>
            <MenuItem key="|" value="|">
              | - Não codificado
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
            label="33 - Forma literária"
            select
            defaultValue={"0"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="0" value="0">
              0 - Não é uma obra de ficção
            </MenuItem>
            <MenuItem key="1" value="1">
              1 - Ficção
            </MenuItem>
            <MenuItem key="d" value="d">
              d - Drama
            </MenuItem>
            <MenuItem key="f" value="f">
              f - Romance
            </MenuItem>
            <MenuItem key="h" value="h">
              h - Humor, sátira, etc.
            </MenuItem>
            <MenuItem key="i" value="i">
              i - Cartas
            </MenuItem>
            <MenuItem key="j" value="j">
              j - Contos
            </MenuItem>
            <MenuItem key="m" value="m">
              m - Mais de uma forma literária
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
              | - Não codificado
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
            # - Não há biográficos
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
            d - Há biográficos
            </MenuItem>
            <MenuItem key="|" value="|">
            | - Não codificado
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
            # - Não modificado
            </MenuItem>
            <MenuItem key="s" value="s">
            s - Abreviado
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Informação omitida
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
            | - Não codificado
            </MenuItem>
            
          </TextField>
          <TextField
            label="39 - Fonte de catalogação"
            select
            defaultValue={"#"}
            size="small"
            sx={{ width: 210 }}
            name="008"
          >
            <MenuItem key="#" value="#">
            # - Agência bibliográfica nacional
            </MenuItem>
            <MenuItem key="c" value="c">
            c - Catalogação Cooperativa
            </MenuItem>
            <MenuItem key="d" value="d">
            d - Outra
            </MenuItem>
            <MenuItem key="u" value="u">
            u - Desconhecida
            </MenuItem>
            <MenuItem key="|" value="|">
            | - Não codificado
            </MenuItem> 
          </TextField>
        </Grid>
      </Accordion>
    </Box>
  );
}
