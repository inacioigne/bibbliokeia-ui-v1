import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useState } from "react";
import FieldMarc from "../components/marc/field";
import Button from "@mui/material/Button";
import { useFormik } from "formik";

function Panel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const formik = useFormik({
    initialValues: {
      "100": {a: ""}

    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log('HEIIIIE!')
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const datalist = []
    const data = new Object()
    //data['100'] = []
    const formData = new FormData(event.target)
    
    const value = Object.fromEntries(formData.entries());
    //console.log(JSON.stringify(Object.fromEntries(formData)));
    for (const [k, v] of formData.entries()) {
        
      let tag = k.split(".")[0]
      let code = k.split(".")[1]
      if (v != "") {
        if (Object.keys(data).includes(tag)) {
          data[tag].push({[code]:v})
         
        } else {
          data[tag] = []
          data[tag].push({[code]:v})
        }
      }
     }
     console.log(data)
  }

return (
      <>
      
    <Box 
    component="form"
    onSubmit={formik.handleSubmit}
    sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tags 0XX"  />
          <Tab label="Tags 1XX"  />
          <Tab label="Tags 2XX"  />
        </Tabs>
      </Box>
      <Box xs={{}}>
      <FieldMarc
        tag="100"
        formik={formik}
        />
        </Box>
     {/** 
      <Panel value={value} index={0}>
        Tag 0XX
      </Panel>
      <Panel value={value} index={1}>
      <FieldMarc
        tag="100"
        formik={formik}
        />
      </Panel>
      <Panel value={value} index={2}>
      <FieldMarc
        tag="245"
        formik={formik}
        />
      </Panel>*/}

      <Button type="submit">Salvar</Button>

    </Box>
    

    </>
  );
}
