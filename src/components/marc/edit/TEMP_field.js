import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Subfield from "src/components/marc/edit/subfield";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { ItemContext } from "src/admin/contexts/itemContext";

import MenuItem from "@mui/material/MenuItem";
import {
  ConnectingAirportsOutlined,
  ConstructionOutlined,
} from "@mui/icons-material";

export default function FieldMarc(props) {
  console.log("FILED: ", props)
  

  const [repeatle, setRepeatle] = useState(0);
  const [fields, setFields] = useState([
    {
      meta: props.meta,
      key: Date.now(),
    },
  ]);

  const addField = () => {
    setFields((prevState) => [
      ...prevState,
      {
        meta: props.meta,
        key: Date.now(),
        subfield: {},
      },
    ]);
  };
  const remove = (key) => {
    setFields((prevState) => prevState.filter((field) => field.key !== key));
  };

  const handleClick = () => {
    setRepeatle(repeatle + 1);
  };

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
        {props?.dados ? (
          <Box sx={{ p: 3 }}>
            {fields.map((field, i) => (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
                key={field.key}
              >
                {/**INDICADORES */}
                <Box>
                  <Box style={{ width: 215 }}>
                    {props.meta.indicators.Ind1 ? (
                      <TextField
                        name={
                          props.meta.repeatable
                            ? `r${i}_${props.meta.tag}.Ind1`
                            : `${props.meta.tag}.Ind1`
                        }
                        sx={{ mr: 1 }}
                        select
                        label="Ind1"
                        size="small"
                        style={{ width: 75 }}
                        //defaultValue={props.meta.indicators.Ind1.defaultValue}
                        defaultValue={props.dados?.indicators?.Ind1}
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
                        name={
                          props.meta.repeatable
                            ? `r${i}_${props.meta.tag}.Ind2`
                            : `${props.meta.tag}.Ind2`
                        }
                        sx={{ mr: 1 }}
                        select
                        label="Ind2"
                        size="small"
                        style={{ width: 75 }}
                        defaultValue={props.dados?.indicators?.Ind2}
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
                        // disabled
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

                  <Button
                    onClick={() => remove(field.key)}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    Remover
                  </Button>
                </Box>

                {/**INDICADORES */}
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
                  {props.meta.subfields.map((e) =>
                    e.required ? (
                      <TextField
                        required
                        name={
                          props.meta.repeatable
                            ? `r${i}_${props.meta.tag}.${e.value}`
                            : `${props.meta.tag}.${e.value}`
                        }
                        key={`${e.value}`}
                        label={e.label}
                        size="small"
                        //defaultValue={e.defaultValue ? e.defaultValue : ""}
                        defaultValue={props?.dados?.subfields[e.value]}
                        fullWidth
                      />
                    ) : (
                      <TextField
                        name={
                          props.meta.repeatable
                            ? `r${props.index}-${i}_${props.meta.tag}.${e.value}`
                            : `${props.meta.tag}.${e.value}`
                        }
                        key={`${e.value}`}
                        label={e.label}
                        size="small"
                        //defaultValue={e.defaultValue ? e.defaultValue : ""}
                        defaultValue={props?.dados?.subfields[e.value]}
                        fullWidth
                      />
                    )
                  )}
                </Box>
              </Box>
            ))}

            <Button
              variant="contained"
              onClick={addField}
              sx={
                props.meta.repeatable
                  ? { display: "block", mb: 2, mt: 2 }
                  : { display: "none" }
              }
            >
              Adicionar
            </Button>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
          {fields.map((field, i) => (
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
              key={field.key}
            >
          
              <Box>
                {/**INDICADORES */}
                <Box style={{ width: 215 }}>
                  {props.meta.indicators.Ind1 ? (
                    <TextField
                      name={ props.meta.repeatable ? 
                        `r${i}_${props.meta.tag}.Ind1`:
                        `${props.meta.tag}.Ind1`
                        }
                      sx={{ mr: 1 }}
                      select
                      label="Ind1"
                      size="small"
                      style={{ width: 75 }}
                      defaultValue={props.meta.indicators.Ind1.defaultValue}
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
                      name={ props.meta.repeatable ? 
                        `r${i}_${props.meta.tag}.Ind2`:
                        `${props.meta.tag}.Ind2`
                        }
                      sx={{ mr: 1 }}
                      select
                      label="Ind2"
                      size="small"
                      style={{ width: 75 }}
                      defaultValue={props.meta.indicators.Ind2.defaultValue}
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
                   // disabled
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

                <Button 
                onClick={() => remove(field.key)}
                variant="outlined" 
                sx={{ mt: 2 }}>
                  Remover
                </Button>
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
                {props.meta.subfields.map((e) =>
                  e.required ? (
                    <TextField
                      required
                      name={ props.meta.repeatable ? 
                        `r${i}_${props.meta.tag}.${e.value}`:
                        `${props.meta.tag}.${e.value}` 
                        }
                      key={`${e.value}`}
                      label={e.label}
                      size="small"
                      defaultValue={e.defaultValue ? e.defaultValue : ""}
                      fullWidth
                    />
                  ) : (
                    <TextField
                      name={ props.meta.repeatable ? 
                        `r${i}_${props.meta.tag}.${e.value}`:
                        `${props.meta.tag}.${e.value}` 
                        }
                      key={`${e.value}`}
                      label={e.label}
                      size="small"
                      defaultValue={e.defaultValue ? e.defaultValue : ""}
                      fullWidth
                    />
                  )
                )}
              </Box>
              
            </Box>
          ))}
          </Box>
        )}
      </Accordion>
    </Box>
  );
}
