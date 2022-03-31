import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Indicators(props) {
  const formik = props.formik;
  const indicators = props.metadata;
  //console.log("INDICATORS: ",props.meta)

  return (
    <Box 
    
     >
      {indicators ? (
        <TextField
          select
          defaultValue={props.meta?  props.meta : ""}
          id={props.ind}
          label={props.ind}
          variant="outlined"
          size="small"
          style = {{width: 100}}
          name={props.repeatle ? 
            `${props.repeatle}-${props.tag}.${props.ind}` :
            `${props.tag}.${props.ind}`}          
        >
        <MenuItem value="">
            
          </MenuItem>
          {indicators.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          style = {{width: 100}}
          id={props.ind}
          label={props.ind}
          size="small"
          name={props.repeatle ? 
            `${props.repeatle}-${props.tag}.${props.ind}` :
            `${props.tag}.${props.ind}`}
            value={"#"}
            //disabled
        />
      )}
    </Box>
  );
}
