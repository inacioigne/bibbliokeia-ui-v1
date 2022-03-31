import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Indicators from "./indicators";
import marc from "@/marcSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Grid from "@mui/material/Grid";

export default function Subfield(props) {
  const metadata = marc.dataFields[props.tag];
  const [subList, setSubList] = useState(() => {
    let subList = {};
    subList["a"] = true;
    return subList;
  });

  const handleChange = (event) => {
    const { id, checked } = event.target;
    setSubList((prevState) => ({
      ...prevState,
      [id[0]]: checked,
    }));
  };

  return (
    <Grid container>
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Indicators
            tag={props.tag}
            meta={props.meta?.Ind1}
            repeatle={props.repeatle}
            ind="Ind1"
            metadata={metadata.indicators.Ind1}
          />
          <Indicators
            tag={props.tag}
            meta={props.meta?.Ind2}
            repeatle={props.repeatle}
            ind="Ind2"
            metadata={metadata.indicators.Ind2}
          />
        </Stack>
        <Accordion sx={{ mt: 2, width: 205 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Campos disponiveis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup sx={{ pl: 2 }}>
              {metadata.subfields.map((subfield) => (
                <FormControlLabel
                  key={subfield.value}
                  control={
                    <Checkbox id={subfield.value} onChange={handleChange} />
                  }
                  label={subfield.value}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: 3,
            rowGap: 2,
          }}
        >
          {metadata.subfields.map((subfield) =>
            subfield["required"] ? (
              <TextField
                required
                defaultValue={props.meta ? props.meta[`${subfield.value}`] : ""}
                name={
                  props.repeatle
                    ? `${props.repeatle}-${props.tag}.${subfield.value}`
                    : `${props.tag}.${subfield.value}`
                }
                key={subfield.value}
                fullWidth
                label={subfield.label}
                size="small"
                sx={
                  subList[subfield.value]
                    ? { display: "block", width: 500 }
                    : { display: "none" }
                }
              />
            ) : (
              <TextField
                defaultValue={props.meta ? props.meta[`${subfield.value}`] : ""}
                name={
                  props.repeatle
                    ? `${props.repeatle}-${props.tag}.${subfield.value}`
                    : `${props.tag}.${subfield.value}`
                }
                key={subfield.value}
                fullWidth
                label={subfield.label}
                size="small"
                sx={
                  subList[subfield.value]
                    ? { display: "block", width: 500 }
                    : { display: "none" }
                }
              />
            )
          )}
        </Box>
      </Box>
    </Grid>
  );
}
