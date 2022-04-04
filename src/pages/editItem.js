import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import api from "../services/api";
//import TabCataloguing from "../components/tabCataloguing"
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Lider from "../components/marc/newLider";
import Tag008 from "../components/marc/tag008";
import FieldMarc from "../components/marc/field";
import Time from "../function/time"


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


export default function EditItem() {
  const router = useRouter();
  const [meta, setMeta] = useState()
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
    Object.entries(meta.datafield).forEach(([k, v]) =>
      datafield[`tag${k[0]}`].push([k, v])
      //console.log(k, v)
    );
    //console.log(datafield["0"])
    // datafield.tag6.map(([k, v]) => 
    // (v.map((y, i) => console.log(y, i))));
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const url = `/cataloguing/item/${id}/json`;

      const getData = async () => {
        const res = await api.get(url);
        const data = await res.data
        setMeta(data)
        //console.log(meta)
      };

      getData().catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    }
  }, [router.isReady]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let lider = formData.getAll('lider')
    
     {/**  Control Fields */}
     const tag008 = formData.getAll('008')
     const controfields = {
       "003": "BR-MnINPA",
       "005": Time(),
       '008': tag008.join(""),
     }
     
     
     const data = new Object();
     data['040'] = {'a': "BR-MnINPA", "b": "por"}
 
     for (const [k, v] of formData.entries()) {
       if (v != "" & k != 'lider' & k != "008") {
         let tag = k.split(".")[0];
         let code = k.split(".")[1];
         if (Object.keys(data).includes(tag)) {
           //data[tag].push({ [code]: v });
           data[tag][code] = v
         } else {
           //data[tag] = [];
           //data[tag].push({ [code]: v });
           data[tag] = new Object();
           data[tag][code] = v
 
         }
       }
     }
     
     const subjects = []
 
   if (data['650']) {
     subjects.push(data['650'])
     
     Object.entries(data).forEach(([k, v]) => {
       if (k.includes("r") & k.includes("650")) {
         subjects.push(data[k])
         delete data[k]
       }
     })
   }
 data[650] = subjects

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
         "datafield": data
     }

     const { id } = router.query;

     const requestsData = {
       'id': id,
       'marc': marc
     }

     api.put(
      "/cataloguing/update",
      requestsData
    ).then(function (response) {
      //alert(response.data.msg)
      router.push(`/item?id=${id}`)
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });  

  }



  return (
    <Container fixed>
    {/*<TabCataloguing meta={meta && meta}  />*/}
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
          <Lider meta={meta?.leader} />
          <Tag008 meta={meta?.controlfield["008"]} />
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
              <FieldMarc key={i} tag={k} meta={a} repeatle={i}/>
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
              <FieldMarc key={k} tag={k} meta={v}  />
          )) }
        </Box>
        <Button variant="contained" type="submit" onSubmit={handleSubmit} >
          Salvar
    </Button>
        
      </Box>
    </Box>
    
    </Container>

  )}
