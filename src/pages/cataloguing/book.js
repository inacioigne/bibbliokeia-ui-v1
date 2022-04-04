import Layout from "src/admin/layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Lider from "../../components/marc/lider";
import Tag008 from "../../components/marc/tag008";
import marc from "src/schema/marc_book.json";
import Field from "../../components/marc/newField";
import Typography from '@mui/material/Typography';


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Cataloguing_Book() {

    const tags0 = marc.datafields.filter(function(currentValue) {
        return currentValue.tag[0] == "0"
    })
    const tags1 = marc.datafields.filter(function(currentValue) {
        return currentValue.tag[0] == "1"
    })
    //console.log(tags1)
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

  return (
    <Container>
      <Box>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        variant="fullWidth"
        
        >
          <Tab label="Tags 0XX" {...a11yProps(0)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 1XX" {...a11yProps(1)} sx={{ borderRight: 1 }} />
          <Tab label="Tags 2XX" {...a11yProps(2)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 3XX" {...a11yProps(3)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 4XX" {...a11yProps(4)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 5XX" {...a11yProps(5)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 6XX" {...a11yProps(6)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 7XX" {...a11yProps(7)} sx={{ borderRight: 1 }}/>
          <Tab label="Tags 8XX" {...a11yProps(8)} sx={{ borderRight: 1 }}/>
        </Tabs>
        <Box>
        <Box sx={value == 0 ? { display: 'grid', rowGap: 3} : { display: "none" }}>
        <Lider />
        <Tag008 />
        {
            tags0.map((e) => (
                <Field meta={e}/>
             
            ))
        }
   

        </Box>
        <Box sx={value == 1 ? { display: 'grid', rowGap: 3}  : { display: "none" }}>
        {
            tags1.map((e) => (
                <Field meta={e}/>
             
            ))
        }
        </Box>
        <Box sx={value == 2 ? { display: "block" } : { display: "none" }}>
            Tag1
        </Box>
        <Box sx={value == 3 ? { display: "block" } : { display: "none" }}>
            Tag2
        </Box>
        <Box sx={value == 4 ? { display: "block" } : { display: "none" }}>
            Tag1
        </Box>
        <Box sx={value == 5 ? { display: "block" } : { display: "none" }}>
            Tag2
        </Box>
        <Box sx={value == 6 ? { display: "block" } : { display: "none" }}>
            Tag1
        </Box>
        <Box sx={value == 7 ? { display: "block" } : { display: "none" }}>
            Tag2
        </Box>
        <Box sx={value == 8 ? { display: "block" } : { display: "none" }}>
            Tag2
        </Box>
        </Box>
      </Box>
    </Container>
  );
}

Cataloguing_Book.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
