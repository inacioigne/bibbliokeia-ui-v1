import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import marc from "../src/marcJson";

export default function Cataloguing() {
  console.log(marc.dataFields[100]);
  const formik = useFormik({
    initialValues: {
      100: {
        ind1: "",
        ind2: "",
        a: "",
        d: "",
      },
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container>
      <br />
      <Typography variant="h1" component="div" gutterBottom>
        h1. Heading
      </Typography>
     

      <form>
        <TextField
          select
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </form>
    </Container>
  );
}
