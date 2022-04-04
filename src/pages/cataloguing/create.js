import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import FieldMarc from "../../components/marc/field";
import Button from "@mui/material/Button";
import Lider from "../../components/marc/lider";
import Tag008 from "../../components/marc/tag008";
import { useRouter } from "next/router";
import api from "../../services/api";
import Container from "@mui/material/Container";
import Time from "../../function/time";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cataloguing() {
  const router = useRouter();
  const [value, setValue] = useState(0);

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

    const data = new Object();
    data["040"] = { a: "BR-MnINPA", b: "por" };

    for (const [k, v] of formData.entries()) {
      if ((v != "") & (k != "lider") & (k != "008")) {
        
        let tag = k.split(".")[0];
        let code = k.split(".")[1];
        
        if (Object.keys(data).includes(tag)) {
      
          data[tag][code] = v;
        } else {
 
          data[tag] = new Object();
          data[tag][code] = v;
        }
      }
    }
 
    const rep = new Object()

    Object.entries(data).map(([k, v]) => {
      if (k.includes('r')) {
        let rtag = k.split('-')[1]
        if (Object.keys(rep).includes(rtag)) {
          rep[rtag].push(v)
        } else {
          rep[rtag] = []
          rep[rtag].push(v)
         
        }
        delete data[k]
      }
    })

    Object.entries(rep).forEach(([k, v]) => {
      data[k] = v
    })




    const marc = {
      leader: "    " + lider.join("").replaceAll("|", " "),
      controlfield: controfields,
      datafield: data,
     
    };
    
    api.post(
      "/cataloguing/create",
      marc
    ).then(function (response) {
      //alert(response.data.msg)
      router.push(`/item?id=${response.data.id}`)
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Container>
      <Box>
        <Tabs
          sx={{
            position: "fixed",
            top: "0%",
            zIndex: "tooltip",
            backgroundColor: "white",
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab label="Tags 0XX" {...a11yProps(0)} />
          <Tab label="Tags 1XX" {...a11yProps(1)} />
          <Tab label="Tags 2XX" {...a11yProps(2)} />
          <Tab label="Tags 3XX" {...a11yProps(3)} />
          <Tab label="Tags 4XX" {...a11yProps(4)} />
          <Tab label="Tags 5XX" {...a11yProps(5)} />
          <Tab label="Tags 6XX" {...a11yProps(6)} />
          <Tab label="Tags 7XX" {...a11yProps(7)} />
          <Tab label="Tags 8XX" {...a11yProps(8)} />
        </Tabs>
        <Box
          sx={{
            mt: 5,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box sx={value == 0 ? { display: "block" } : { display: "none" }}>
            <Lider />
            <Tag008 />
            <FieldMarc tag="020" />
            <FieldMarc tag="082" />
          </Box>
          <Box sx={value == 1 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="100" />
          </Box>
          <Box sx={value == 2 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="245" />
            <FieldMarc tag="250" />
            <FieldMarc tag="260" />
          </Box>
          <Box sx={value == 3 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="300" />
          </Box>
          <Box sx={value == 4 ? { display: "block" } : { display: "none" }}>
            Tags 4XX
          </Box>
          <Box sx={value == 5 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="520" />
          </Box>
          <Box sx={value == 6 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="650" repeatle="true" />
          </Box>
          <Box sx={value == 7 ? { display: "block" } : { display: "none" }}>
            TAGS 7XX
          </Box>
          <Box sx={value == 8 ? { display: "block" } : { display: "none" }}>
            <FieldMarc tag="856" />
          </Box>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
