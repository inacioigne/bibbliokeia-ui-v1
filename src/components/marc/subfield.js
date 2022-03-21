import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Subfield(props) {
    return (
        <Box>
        <TextField 
            label={props.sub}
            fullWidth
            size="small"
        />

        </Box>


    )
}