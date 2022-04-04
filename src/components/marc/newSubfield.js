import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Indicators from "./indicators";

export default function Subfield(props) {
    
  return (
    <Box  sx={{
        display: 'flex',
       

        
      }}>
      <Box style = {{width: 200}}>
      <TextField sx={{mr: 2}}
          size="small"
          style = {{width: 70}}
      />
      <TextField 
          size="small"
          style = {{width: 70}}
      />
      </Box>
      <Box sx={{
    display: 'grid',
    columnGap: 3,
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  }}
  style = {{width: "100%"}}
  >
      {props.meta.subfields.map((e) => (
        <TextField 
        name={`${props.meta.tag}.${e.value}`}
        key={e.value}
        label={e.label}
        size="small"
        fullWidth
         />
      ))}
      </Box>
    </Box>
  );
}
