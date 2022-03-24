import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import FieldMarc from "../components/marc/field";
import Button from "@mui/material/Button";
import Lider from "../components/marc/lider"
import Tag008 from "../components/marc/tag008"
import axios from "axios";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Time = () => {
  const date = new Date()
  const year = date.getFullYear()
  const m = date.getMonth()+1
  const month = (m < 10) ? '0'+m.toString() : m.toString()
  const day = (date.getDate() < 10) ? '0'+date.getDate().toString() : date.getDate().toString()
  const hours = (date.getHours() < 10) ? 
  '0'+date.getHours().toString() : 
  date.getHours().toString()
  const minutes = (date.getMinutes() < 10) ? 
  '0'+date.getMinutes().toString() : 
  date.getMinutes().toString()
  const seconds = (date.getSeconds() < 10) ? 
  '0'+date.getSeconds().toString() : 
  date.getSeconds().toString()
  const mils = date.getMilliseconds()
  const time = year+month+day+hours+minutes+seconds+".0"
  return time
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
    let lider = formData.getAll('lider')
    
    {/**  Control Fields */}
    const tag008 = formData.getAll('008')
    //console.log(tag008)
    const controfields = [{
      "003": "BR-MnINPA",
      "005": Time(),
      '008': tag008.join(""),

    }]
    
    const data = new Object();
    data['040'] = [{'a': "BR-MnINPA"}, {"b": "por"}]

    for (const [k, v] of formData.entries()) {
      if (v != "" & k != 'lider' & k != "008") {
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
    
    const marc = {
        "leader": "    "+lider.join("").replaceAll("|", " "),
        "controlfield": controfields,
        "datafield": datalist
    }
    //alert(JSON.stringify(marc))
    const json = JSON.stringify(marc)
    //console.log(json)
    axios.post(
      "http://localhost:8000/cataloguing/create",
      marc
    ).then(function (response) {
      alert(response.data.msg)
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
   //console.log(marc);
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
