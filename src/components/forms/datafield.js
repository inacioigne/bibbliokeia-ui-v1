import {
  Accordion,
  AccordionSummary,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
  ButtonGroup,
  Button,
} from "@mui/material/";
import { ExpandMore } from "@mui/icons-material/";
import { Controller } from "react-hook-form";
import Indicators from "src/components/forms/indicators";
import { Add, Remove } from "@mui/icons-material";

export default function Datafield(props) {
  if (props.metadata.repeatable) {
    return (
      <Box>
        {props.fields.map((field, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
            }}
          >
            <Box style={{ flexGrow: 1 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="content"
                  id="header"
                  sx={{ borderBottom: 1 }}
                >
                  <Typography variant="h7" component="div" gutterBottom>
                    {props.metadata.description}
                  </Typography>
                </AccordionSummary>
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    {/**INDICADORES */}
                    <Box>
                      <Box style={{ width: 215 }}>
                        <Indicators
                          metadata={props.metadata.indicators.Ind1}
                          control={props.control}
                          label="Ind1"
                          name={`datafields[${props.metadata.tag}][${index}].indicators.Ind1`}
                        />

                        <Indicators
                          metadata={props.metadata.indicators.Ind2}
                          control={props.control}
                          label="Ind2"
                          name={`datafields[${props.metadata.tag}][${index}].indicators.Ind2`}
                        />
                      </Box>
                    </Box>
                    {/** SUBFIELDS */}
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
                      {props.metadata.subfields.map((subfield, subindex) => (
                        <Controller
                          key={subindex}
                          name={`datafields[${props.metadata.tag}][${index}].subfields.${subfield.value}`}
                          control={props.control}
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label={subfield.label}
                              variant="outlined"
                              size="small"
                              sx={{ width: 170 }}
                            />
                          )}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Accordion>
            </Box>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={() => props.append({})}>
                <Add color="primary" />
              </Button>
              <Button onClick={() => props.remove(index)}>
                <Remove color="primary" />
              </Button>
            </ButtonGroup>
            {/*          
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: 1
              }}
            >
              <Add color="primary" onClick={() => props.append({})} />
            </Box> */}
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="content"
          id="header"
          sx={{ borderBottom: 1 }}
        >
          <Typography variant="h7" component="div" gutterBottom>
            {props.metadata.description}
          </Typography>
        </AccordionSummary>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/**INDICADORES */}
            <Box>
              <Box style={{ width: 215 }}>
                <Indicators
                  metadata={props.metadata.indicators.Ind1}
                  control={props.control}
                  label="Ind1"
                  name={`datafields[${props.metadata.tag}].indicators.Ind1`}
                />

                <Indicators
                  metadata={props.metadata.indicators.Ind1}
                  control={props.control}
                  label="Ind2"
                  name={`datafields[${props.metadata.tag}].indicators.Ind2`}
                />
              </Box>
            </Box>
            {/** SUBFIELDS */}
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
              {props.metadata.subfields.map((subfield, index) => (
                <Controller
                  key={index}
                  name={`datafields[${props.metadata.tag}].subfields.${subfield.value}`}
                  control={props.control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={subfield.label}
                      variant="outlined"
                      size="small"
                      sx={{ width: 170 }}
                    />
                  )}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Accordion>
    );
  }
}
