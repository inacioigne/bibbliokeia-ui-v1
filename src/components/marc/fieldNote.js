import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Subfield from "./newSubfield";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Indicators from "./newIndicators";
import TextField from "@mui/material/TextField";

export default function FieldNote(props) {
  // const [repeatle, setRepeatle] = useState(0)

  // const handleClick = () => {
  //     setRepeatle(repeatle + 1)
  //   }

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
            {props.meta.description}
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
            <Indicators meta={props.meta} />
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                rowGap: 2,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
              style={{ width: "100%" }}
            >
              {props.meta.subfields.map((e) => (
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder={e.label}
                  style={{ width: 500, height: 100 }}
                  name={`${props.meta.tag}.${e.value}`}
                  key={e.value}
                  maxRows={4}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {/* <Button 
        variant="contained"  
        onClick={handleClick} 
        sx={props.repeatle ? { display: "block", ml: 3, mb: 2} : { display: "none" }}    
        >Repetir Campo</Button>
        */}
      </Accordion>
    </Box>
  );
}
