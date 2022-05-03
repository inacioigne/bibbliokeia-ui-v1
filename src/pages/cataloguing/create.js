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
import marc from "./json_marc.json";
import schema from "src/schema/marc_book.json";
import Lider from "src/components/forms/lider";
import Tag008 from "src/components/forms/tag008";
import Datafield from "src/components/forms/datafield";
import Indicators from "src/components/forms/indicators";
import { Add, Close } from "@mui/icons-material";
import Time from "src/function/time";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cataloguing_Book() {
  const [value, setValue] = useState(0);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      datafields: {
        650: [{}],
        700: [{}],
        856: [{}],
      },
    },
  });

  const {
    fields: Fields650,
    append: Append650,
    remove: Remove650,
  } = useFieldArray({ control, name: "datafields[650]" });

  const {
    fields: Fields700,
    append: Append700,
    remove: Remove700,
  } = useFieldArray({ control, name: "datafields[700]" });
  const {
    fields: Fields856,
    append: Append856,
    remove: Remove856,
  } = useFieldArray({ control, name: "datafields[856]" });

  const [tag650] = schema.datafields.filter((field) => {
    return field.tag == "650";
  });
  const [tag700] = schema.datafields.filter((field) => {
    return field.tag == "700";
  });
  const [tag856] = schema.datafields.filter((field) => {
    return field.tag == "856";
  });
  const tags0 = schema.datafields.filter((field) => {
    return field.tag[0] == "0";
  });
  const tags1 = schema.datafields.filter((field) => {
    return field.tag[0] == "1";
  });
  const tags2 = schema.datafields.filter((field) => {
    return field.tag[0] == "2";
  });
  const tags3 = schema.datafields.filter((field) => {
    return field.tag[0] == "3";
  });
  const tags4 = schema.datafields.filter((field) => {
    return field.tag[0] == "4";
  });
  const tags5 = schema.datafields.filter((field) => {
    return field.tag[0] == "5";
  });

  const onSubmit = (data) => {
    const lider = Object.values(data.lider);
    const tag008 = Object.values(data.tag008);
    const marc = {
      lider: lider.join(""),
      controlfields: {
        "003": "BR-MnINPA",
        "005": Time(),
        "008": tag008.join(""),
      },
      datafields: data.datafields
    };
    for (const [k, v] of Object.entries(data.datafields)) {
      if (!Array.isArray(v)) {
        // for (let [k, v] of Object.entries(v.subfields)) {
        //   console.log(k, v)

        // }
        for (let [sk, sv] of Object.entries(v.subfields)) {
          console.log(data.datafields[k].subfields[sk])

        }
        
        
        //console.log(k, Object.values(v.subfields));

      }
      

    }
    
  };
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
          <Lider control={control} />
          <Tag008 control={control} />
          {tags0.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 1 ? { display: "block" } : { display: "none" }}>
          {tags1.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 2 ? { display: "block" } : { display: "none" }}>
          {tags2.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 3 ? { display: "block" } : { display: "none" }}>
          {tags3.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 4 ? { display: "block" } : { display: "none" }}>
          {tags4.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 5 ? { display: "block" } : { display: "none" }}>
          {tags5.map((field, index) => (
            <Datafield key={index} control={control} metadata={field} />
          ))}
        </Box>
        <Box sx={value == 6 ? { display: "block" } : { display: "none" }}>
          <Datafield
            control={control}
            metadata={tag650}
            fields={Fields650}
            append={Append650}
            remove={Remove650}
          />
        </Box>

        <Box sx={value == 7 ? { display: "block" } : { display: "none" }}>
          <Datafield
            control={control}
            metadata={tag700}
            fields={Fields700}
            append={Append700}
            remove={Remove700}
          />
        </Box>
        <Box sx={value == 8 ? { display: "block" } : { display: "none" }}>
          <Datafield
            control={control}
            metadata={tag856}
            fields={Fields856}
            append={Append856}
            remove={Remove856}
          />
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
