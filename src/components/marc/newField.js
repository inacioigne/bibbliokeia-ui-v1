import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Subfield from "./newSubfield";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function FieldMarc(props) {
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
          <Typography variant="h7" component="div" gutterBottom>
            {props.meta.description}
          </Typography>
        </AccordionSummary>
        <Box sx={{p: 3}}>

        
        <Subfield meta={props.meta} repeatle={props.repeatle ? `r${props.repeatle}`: false} />
        { repeatle > 0 && <Subfield tag={props.tag} repeatle="r2" />}
        { repeatle > 1 && <Subfield tag={props.tag} repeatle="r3"/>}
        { repeatle > 2 && <Subfield tag={props.tag} repeatle="r4"/>}
        </Box>
        <Button 
        variant="contained"  
        onClick={handleClick} 
        sx={props.repeatle ? { display: "block", ml: 3, mb: 2} : { display: "none" }}    
        >Repetir Campo</Button>
       
      </Accordion>
    </Box>
  );
}
