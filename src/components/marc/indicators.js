import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Indicators(props) {
  const formik = props.formik;
  const indicators = props.metadata;

  return (
    <Box >
      {indicators ? (
        <TextField
          select
          defaultValue={""}
          id={props.ind}
          label={props.ind}
          variant="outlined"
          size="small"
          style = {{width: 100}}
          name={`${props.tag}.${props.ind}`}          
          onChange={formik.handleChange}
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
          name={`${props.tag}.${props.ind}`} 
          value="#"
        />
      )}
    </Box>
  );
}
