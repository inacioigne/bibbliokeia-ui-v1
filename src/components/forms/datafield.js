import {
  Accordion,
  AccordionSummary,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export default function Datafield(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="content"
        id="header"
        sx={{ borderBottom: 1 }}
      >
        <Typography variant="h7" component="div" gutterBottom>
          ISBN
        </Typography>
      </AccordionSummary>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box>
            {/**INDICADORES */}
            <Box style={{ width: 215 }}>
              <Controller
                name={`datafields[${props.tag}].indicators.Ind1`}
                control={props.control}
                defaultValue={`datafields[${props.tag}].indicators.Ind1`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ind1"
                    variant="outlined"
                    size="small"
                    sx={{ width: 170 }}
                  />
                )}
              />
              <Controller
                name={`datafields[${props.tag}].indicators.Ind2`}
                control={props.control}
                defaultValue={`datafields[${props.tag}].indicators.Ind2`}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ind1"
                    variant="outlined"
                    size="small"
                    sx={{ width: 170 }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 2,
              gridTemplateColumns: "repeat(2, 1fr)",
              mb: 4,
            }}
            style={{ width: "100%" }}
          >
            <Controller
              name={`datafields[${props.tag}].subfields.a`}
              control={props.control}
              defaultValue={`datafields[${props.tag}].subfields.a`}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ISBN"
                  variant="outlined"
                  size="small"
                  sx={{ width: 170 }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    </Accordion>
  );
}
