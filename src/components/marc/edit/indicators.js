import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Indicators(props) {
    return (
      <Box style={{ width: 215 }}>
      {props.meta.indicators.Ind1 ? (
        <TextField
          name={`${props.meta.tag}.Ind1`}
          sx={{ mr: 1 }}
          select
          label="Ind1"
          size="small"
          style={{ width: 75 }}
          defaultValue=""
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          {props.meta.indicators.Ind1.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
        disabled
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
          defaultValue=""
        >
          <MenuItem value="">
            <em></em>
          </MenuItem>
          {props.meta.indicators.Ind2.options.map((option) => (
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
    )
}