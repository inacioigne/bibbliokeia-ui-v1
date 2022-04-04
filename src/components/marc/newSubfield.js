import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Subfield(props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
      }}
    >
      {/**INDICADORES */}
      <Box style={{ width: 215 }}>
        {props.meta.indicators.Ind1 ? (
          <TextField
          name={`${props.meta.tag}.Ind1`}
            sx={{ mr: 1 }}
            select
            label="Ind1"
            size="small"
            style={{ width: 75 }}
          >
            {props.meta.indicators.Ind1.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
          name={`${props.meta.tag}.Ind1`}
          sx={{ mr: 1 }}
          style={{ width: 75 }}
          label="Ind1"
          size="small"
          defaultValue="#"
          InputProps={{
            readOnly: true,
          }}
           />
        )}
        {/** IND2 */}
        {props.meta.indicators.Ind2 ? (
          <TextField
          name={`${props.meta.tag}.Ind2`}
            sx={{ mr: 1 }}
            select
            label="Ind2"
            size="small"
            style={{ width: 75 }}
          >
            {props.meta.indicators.Ind2.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
          name={`${props.meta.tag}.Ind2`}
          sx={{ mr: 1 }}
          style={{ width: 75 }}
          label="Ind2"
          size="small"
          defaultValue="#"
          InputProps={{
            readOnly: true,
          }}
           />
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
        style={{ width: "100%" }}
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
