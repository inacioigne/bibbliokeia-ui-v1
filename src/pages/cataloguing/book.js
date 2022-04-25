import Layout from "src/admin/layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useRef } from "react";
import Lider from "../../components/marc/lider";
import Tag008 from "../../components/marc/tag008";
import Tag090 from "../../components/marc/tag090";
import marc from "src/schema/marc_book.json";
//import Field from "../../components/marc/newField";
import Field from "src/components/marc/field";
import FieldNote from "../../components/marc/fieldNote";
import FieldSubject from "src/components/cataloguing/fieldSubject"
import Button from "@mui/material/Button";
import Time from "../../function/time";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Add, Close } from "@mui/icons-material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cataloguing_Book() {
  const tags0 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "0";
  });
  const tags1 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "1";
  });
  const tags2 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "2";
  });
  const tags3 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "3";
  });
  const tags4 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "4";
  });
  const tags5 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "5";
  });
  const tags6 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "6";
  });
  {/** Assunto */}
  const [metaAssunto] = marc.datafields.filter(function (currentValue) {
    return currentValue.tag == "650";
  });
  console.log("ASSUNTO: ", metaAssunto)
  const tags7 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "7";
  });
  const tags8 = marc.datafields.filter(function (currentValue) {
    return currentValue.tag[0] == "8";
  });

  const router = useRouter();
  const [value, setValue] = useState(0);
  const cdd = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    let lider = formData.getAll("lider");
    {
      /**  Control Fields */
    }
    const tag008 = formData.getAll("008");
    const controfields = {
      "003": "BR-MnINPA",
      "005": Time(),
      "008": tag008.join(""),
    };
    {
      /** Datafiels - Subfields */
    }

    const datafields = new Object();

    for (const [k, v] of formData.entries()) {
      let tag = k.split(".")[0];
      let code = k.split(".")[1];
      if ((v != "") & (k != "lider") & (k != "008") & !k.includes("Ind")) {
        if (Object.keys(datafields).includes(tag)) {
          datafields[tag]["subfields"][code] = v;
        } else {
          datafields[tag] = { subfields: { [code]: v } };
          datafields[tag]["indicators"] = {
            Ind1: formData.get(tag + ".Ind1"),
            Ind2: formData.get(tag + ".Ind2"),
          };
        }
      }
    }

    Object.entries(datafields).map(([k, v]) => {
      if (k.includes("r")) {
        let tag = k.split("_")[1];
        if (Object.keys(datafields).includes(tag)) {
          datafields[tag].push(v);
          delete datafields[k];
        } else {
          datafields[tag] = [v];
          delete datafields[k];
        }
      }
    });

    const marc = {
      leader: "    " + lider.join("").replaceAll("|", " "),
      controlfields: controfields,
      datafields: datafields,
    };
    {
      /** POST ITEM */
    }
    api
      .post("/cataloging/item/create", marc)
      .then(function (response) {
        if (response.status == 201) {
          router.push(`/cataloguing/item/${response.data.item_id}`);
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Box>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
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
        <form onSubmit={handleSubmit}>
          <Box>
            <Box
              sx={
                value == 0
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              <Lider />
              <Tag008 />
              {tags0.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
              <Tag090 />
            </Box>
            <Box
              sx={
                value == 1
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              {tags1.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
            <Box
              sx={
                value == 2
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              {tags2.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
            <Box
              sx={
                value == 3
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              {tags3.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
            <Box
              sx={
                value == 4
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              {tags4.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
            <Box
              sx={
                value == 5
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            >
              {tags5.map((e, i) => (
                <FieldNote key={i} meta={e} />
              ))}
            </Box>
            <Box
              sx={
                value == 6
                  ? { display: "grid", rowGap: 3 }
                  : { display: "none" }
              }
            > 
            <FieldSubject meta={metaAssunto} />
            {/* 
            <Box>
            <Field key={1} meta={metaAssunto} />
            <Add color="primary" />
            </Box>
          
             {tags6.map((e, i) => (
                <Field key={i} meta={e} />
              ))} */}
            </Box>
            <Box sx={value == 7 ? { display: "block" } : { display: "none" }}>
              {tags7.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
            <Box sx={value == 8 ? { display: "block" } : { display: "none" }}>
              {tags8.map((e, i) => (
                <Field key={i} meta={e} />
              ))}
            </Box>
          </Box>
          <Button variant="outlined" sx={{ m: 2 }} type="submit">
            Salvar
          </Button>
        </form>
      </Box>
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
