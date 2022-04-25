import Field from "src/components/marc/field";
import { Box, Button } from "@mui/material/";
import { Add, Remove} from "@mui/icons-material";
import { useState } from "react";
export default function FieldSubject(props) {
  const [fields, setFields] = useState([{key: Date.now()}]);

  const addField = () => {
    setFields(prevState => [...prevState, {
        key: Date.now()
    }])
      console.log("ADD: ", fields)
  }
  const remove = (key) => {
      setFields(prevState => prevState.filter(field => field.key !== key))

  }
  return (
    <Box>
      {fields.map((e) => (
        <Box key={e.key} sx={{ display: "flex", justifyContent: "space-between", mt: 2}}>
          <Box sx={{ flexGrow: 1 }}>
            <Field meta={props.meta} index={e.key} dados={props.dados} />
          </Box>

          {/* <Button  
          onClick={addField}
          size="small" 
          variant="outlined" 
          >
            <Add color="primary"  />
          </Button>*/}
          <Button  
          onClick={() => remove(e.key)} 
          size="small" 
          variant="outlined" 
          sx={{ display: "flex"}}>
          <Remove color="primary" />
          </Button> 
        </Box>
      ))}
    </Box>
  );
}
