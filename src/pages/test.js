import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import FieldMarc from "../components/marc/field";
import Button from "@mui/material/Button";
import Lider from "../components/marc/lider"
import Tag008 from "../components/marc/tag008"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



export default function Cataloguing() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log(value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const lider = formData.getAll('lider')
    {/**  Control Fields */}
    const tag008 = formData.getAll('008')
    const controfields = [{
      "003": "BR-MnINPA",
      //"005": CreateDate(),
      '008': tag008.join(""),

    }]
    
    
    const data = new Object();
    //const values = Object.fromEntries(formData.entries());


    for (const [k, v] of formData.entries()) {
      if (v != "") {
          
        let tag = k.split(".")[0];
        let code = k.split(".")[1];
        if (Object.keys(data).includes(tag)) {
          data[tag].push({ [code]: v });
        } else {
          data[tag] = [];
          data[tag].push({ [code]: v });
        }
      }
    }
    const datalist = [];
    Object.entries(data).forEach(([k, v]) => {
      if (k.includes("r")) {
        datalist.push({ [k.split("-")[1]]: v });
      } else {
        datalist.push({ [k]: v });
      }
    });
    const dataFields = { dataFields: datalist };
    const marc = {
        "leader": lider.join(""),
        "controlFields": controfields,
        "dataFields": datalist
    }
    console.log(marc);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tags 0XX" {...a11yProps(0)} />
        <Tab label="Tags 1XX" {...a11yProps(1)} />
        <Tab label="Tags 2XX" {...a11yProps(2)} />
        <Tab label="Tags 3XX" {...a11yProps(3)} />
        <Tab label="Tags 4XX" {...a11yProps(4)} />
        <Tab label="Tags 5XX" {...a11yProps(5)} />
        <Tab label="Tags 6XX" {...a11yProps(6)} />
      </Tabs>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={value == 0 ? { display: "block" } : { display: "none" }}>
          <Lider />
          <Tag008 />
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
          Tags 3XX
        </Box>
        <Box sx={value == 4 ? { display: "block" } : { display: "none" }}>
          Tags 4XX
        </Box>
        <Box sx={value == 5 ? { display: "block" } : { display: "none" }}>
          Tags 5XX
        </Box>
        <Box sx={value == 6 ? { display: "block" } : { display: "none" }}>
          <FieldMarc tag="650" repeatle="true" />
        </Box>
        <Button variant="contained" type="submit">
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
