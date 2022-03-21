import marc from "@/marcSchema";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Indicators from "./indicators";
import Subfield from "./subfield";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function FieldMarc(props) {
  const metadata = marc.dataFields[props.tag];
  const formik = props.formik;
  const [subList, setSubList] = useState(() => {
    let subList = {};
    subList["a"] = true;
    return subList;
  });

  const handleChange = (event) => {
    //setChecked(event.target.checked);
    const { id, checked } = event.target;
    setSubList((prevState) => ({
      ...prevState,
      [id[0]]: checked,
    }));
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="content"
          id="header"
        >
          <Grid item xs={12}>
            <Typography variant="h6" component="div" gutterBottom>
              {metadata.description}
            </Typography>
          </Grid>
        </AccordionSummary>
        {/** Side Box */}
        <Grid container>
          <Grid item xs={3}>
          
            <Box>
            
            
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
              >
                <Indicators
                  tag={props.tag}
                  ind="Ind1"
                  formik={formik}
                  metadata={metadata.indicators.Ind1}
                />
              
                <Indicators
                tag={props.tag}
                  ind="Ind2"
                  formik={formik}
                  metadata={metadata.indicators.Ind2}
                />
              </Stack>
              <Accordion>
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
                          <Checkbox
                            id={subfield.value}
                            onChange={handleChange}
                          />
                        }
                        label={subfield.value}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>

          {/** Subfield Box */}
          <Grid item xs={9}>
            <Box>
            <Stack
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
              {metadata.subfields.map((subfield) => (
                
                  <TextField 
                    name= {`${props.tag}.${subfield.value}`}
                   
                    key={subfield.value}                  
                    fullWidth
                    label={subfield.label}
                    size="small"
                    style={{ width: "100%" }}
                    sx={
                      subList[subfield.value]
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    
                  />
              
              ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Accordion>
    </Box>
  );
}
