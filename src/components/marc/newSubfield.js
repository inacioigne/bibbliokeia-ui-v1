import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Indicators from "./newIndicators"
import Button from "@mui/material/Button";

export default function Subfield(props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
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
          e.required ? (
            <TextField
         required
            name={`${props.meta.tag}.${e.value}`}
            key={e.value}
            label={e.label}
            size="small"
            defaultValue={e.defaultValue ? e.defaultValue : ''}
            fullWidth
          />
          ) : (
            <TextField
         
            name={`${props.meta.tag}.${e.value}`}
            key={e.value}
            label={e.label}
            size="small"
            defaultValue={e.defaultValue ? e.defaultValue : ''}
            fullWidth
          />
          )
          
        ))}
      </Box>
    </Box>
  );
}
