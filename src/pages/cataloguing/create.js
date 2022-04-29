import Layout from "src/admin/layout";
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import marc from "./json_marc.json"
import schema from "src/schema/marc_book.json"
import Lider from "src/components/forms/lider"
import Tag008 from "src/components/forms/tag008"
import Datafield from "src/components/forms/datafield";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cataloguing_Book() {
  console.log("MARC: ", schema.datafields)
  const [value, setValue] = useState(0);
  const { control, register, handleSubmit } = useForm({
    defaultValues: marc
   
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "datafields[650]",
    }
  );
  //fields.map((field, index) => console.log("FIELD: ", field));

  const onSubmit = (data) => console.log("SUBMIT: ", data);
  return (
    <Container>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        variant="fullWidth"
      >
        <Tab label="Tags 0XX" {...a11yProps(0)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 1XX" {...a11yProps(1)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 2XX" {...a11yProps(2)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 3XX" {...a11yProps(3)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 4XX" {...a11yProps(4)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 5XX" {...a11yProps(5)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 6XX" {...a11yProps(6)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 7XX" {...a11yProps(7)} sx={{ borderRight: 1 }} />
        <Tab label="Tags 8XX" {...a11yProps(8)} sx={{ borderRight: 1 }} />
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={value == 0 ? { display: "block" } : { display: "none" }}>
        <Box> 
        <Lider control={control}/>
        <Tag008 control={control}/>
        <Datafield control={control} tag="020"/>
        </Box>
       
        <Box>
        <Controller
            name={"datafields[020].indicators.Ind1"}
            control={control}
            defaultValue={"datafields[020].indicators.Ind1"}
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
            name={"datafields[020].indicators.Ind2"}
            control={control}
            defaultValue={"datafields[020].indicators.Ind2"}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ind2"
                variant="outlined"
                size="small"
                sx={{ width: 170 }}
              />
            )}
          />
        <Controller
            name={"datafields[020].subfields.a"}
            control={control}
            defaultValue={"datafields[020].subfields.a"}
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
        <Box>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: "flex", gap: 1 }}>
            <Controller
                name={`datafields[650][${index}].subfields.a`}
                control={control}
                //defaultValue={field.subfields.a}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Assunto"
                    variant="outlined"
                    size="small"
                    sx={{ width: 170 }}
                  />
                )}
              />

            </Box>
          ))}
        </Box>
        </Box>
        
        <Button variant="outlined" sx={{ m: 2 }} type="submit">
          Salvar
        </Button>
      </form>
    </Container>
  );
}

Cataloguing_Book.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  const { ["bibliokeia.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
