import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
// import Subfield from "./newSubfield";
// import Button from "@mui/material/Button";
// import { useState } from "react";
// import Indicators from "./newIndicators";
import TextField from "@mui/material/TextField";

export default function FieldMarc(props) {
  //console.log("090: ", props)


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
            090 - NÚMERO DE CHAMDA
          </Typography>
        </AccordionSummary>

        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/**INDICADORES */}
            <Box style={{ width: 215 }}>
              <TextField
                name="090.Ind1"
                sx={{ mr: 1 }}
                style={{ width: 75 }}
                label="Ind1"
                size="small"
                defaultValue="#"
                InputProps={{
                  readOnly: true,
                }}
                key="ind1"
              />

              {/** IND2 */}
              <TextField
                name="090.Ind2"
                sx={{ mr: 1 }}
                style={{ width: 75 }}
                label="Ind1"
                size="small"
                defaultValue="#"
                InputProps={{
                  readOnly: true,
                }}
                key="ind2"
              />
            </Box>
            {props.dados &&
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 2,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
              style={{ width: "100%" }}
            >
              {/* <TextField
                required
                name="090.a"
                key="090.a"
                label="a - Classificação"
                size="small"
                defaultValue=""
                fullWidth
              /> */}
              <TextField
                required
                name="090.b"
                key="090.b"
                label="b - Cutter"
                size="small"
                defaultValue={props.dados?.subfields?.b}
                fullWidth
              />
               {/* <TextField
                required
                name="090.c"
                key="090.c"
                label="c - Ano"
                size="small"
                defaultValue=""
                fullWidth
              /> */}
            </Box>}
          </Box>
        </Box>
      </Accordion>
    </Box>
  );
}
