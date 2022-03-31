import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Lider from "../components/marc/newLider";
import Tag008 from "../components/marc/tag008";
import FieldMarc from "../components/marc/field";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabCataloguing(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const datafield = {
    tag0: [],
    tag1: [],
    tag2: [],
    tag3: [],
    tag4: [],
    tag5: [],
    tag6: [],
    tag7: [],
    tag8: [],
  };

  try {
    Object.entries(props.meta.datafield).forEach(([k, v]) =>
      datafield[`tag${k[0]}`].push([k, v])
      //console.log(k, v)
    );
    //console.log(datafield["0"])
    // datafield.tag6.map(([k, v]) => 
    // (v.map((y, i) => console.log(y, i))));
  } catch (e) {
    console.log(e);
  }


  return (
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
        component="form" onSubmit={handleSubmit}
      >
        <Box sx={value == 0 ? { display: "block" } : { display: "none" }}>
          <Lider meta={props.meta?.leader} />
          <Tag008 meta={props.meta?.controlfield["008"]} />
          {
          datafield?.tag0.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 1 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag1.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 2 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag2.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 3 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag3.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 4 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag4.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 5 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag5.map(([k, v]) => (
            <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 6 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag6.map(([k, v]) => (
            v.map((a, i) => (
              <FieldMarc key={i} tag={k} meta={a} />
            ))
          )) }
        </Box>
        <Box sx={value == 7 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag7.map(([k, v]) => (
              <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        <Box sx={value == 8 ? { display: "block" } : { display: "none" }}>
        {
          datafield?.tag8.map(([k, v]) => (
              <FieldMarc key={k} tag={k} meta={v} />
          )) }
        </Box>
        
      </Box>
    </Box>
  );
}
