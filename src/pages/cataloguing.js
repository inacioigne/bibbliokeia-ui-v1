import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import FieldMarc from "../components/marc/field";
import marc from "@/marcSchema";
import MenuItem from "@mui/material/MenuItem";

export default function Cataloguing() {
  const fields = Object.keys(marc.dataFields);
  const formik = useFormik({
    initialValues: {
      "100": {a: ""}

    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault()
    const datalist = []
    const data = new Object()
    data['100'] = []
    const formData = new FormData(event.target)
    const value = Object.fromEntries(formData.entries());
    //console.log(JSON.stringify(Object.fromEntries(formData)));
    for (const [k, v] of formData.entries()) {
      let tag = k.split(".")[0]
      let code = k.split(".")[1]
      if (v != "") {
        if (Object.keys(data).includes(tag)) {
          data[tag].push({[code]:v})
          console.log(data)
        } else {
          data[tag] = []
          data[tag].push({[code]:v})
        }
      }
     }
  } 


  

  return (
    <Container>
      <Typography variant="h5" component="div" gutterBottom>
        Catalogação
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FieldMarc
        formik={formik}
        tag="100"
        />
        
        <FieldMarc
        formik={formik}
        tag="245"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
