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
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function FieldMarc(props) {
  const metadata = marc.dataFields[props.tag];
  const [repeatle, setRepeatle] = useState(0)

  const handleClick = () => {
    setRepeatle(repeatle + 1)
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
          <Grid item xs={12}>
            <Typography variant="h6" component="div" gutterBottom>
              {metadata.description}
            </Typography>
          </Grid>
        </AccordionSummary>
        <Subfield tag={props.tag} meta={props.meta} repeatle={props.repeatle ? `r${props.repeatle}`: false} />
        { repeatle > 0 && <Subfield tag={props.tag} repeatle="r2" />}
        { repeatle > 1 && <Subfield tag={props.tag} repeatle="r3"/>}
        { repeatle > 2 && <Subfield tag={props.tag} repeatle="r4"/>}

        
        <Button 
        variant="contained"  
        onClick={handleClick} 
        sx={props.repeatle ? { display: "block", ml: 3, mb: 2} : { display: "none" }}    
        >Repetir Campo</Button>
      </Accordion>
    </Box>
  );
}
