import Layout from "src/admin/layout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useRef } from "react";
import Lider from "../../components/marc/lider";
import Tag008 from "../../components/marc/tag008";
import Tag090 from "../../components/marc/tag090"
import marc from "src/schema/marc_book.json";
import Field from "../../components/marc/newField";
//import Typography from "@mui/material/Typography";
//import TextareaAutosize from '@mui/material/TextareaAutosize';
import FieldNote from "../../components/marc/fieldNote"
import Button from "@mui/material/Button";
import Time from "../../function/time";
import api from "../../services/api";
import { useRouter } from "next/router";
import { useContext } from 'react';
import { AuthContext } from 'src/admin/contexts/AuthContext';
import { parseCookies } from 'nookies'

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
    event.preventDefault()
    const formData = new FormData(event.target)
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

    const data = new Object()
    for (const [k, v] of formData.entries()) {
      let tag = k.split(".")[0];
      let code = k.split(".")[1];
      if ((v != "") & (k != "lider") & (k != "008")
     // code != "Ind1" & code != "Ind2" 
      ) {
        //console.log(tag, code)
        if (Object.keys(data).includes(tag) 
        ) {      
          data[tag][code] = v;
        } else {
 
          data[tag] = new Object();
          data[tag][code] = v;
        }
      }
    }

    const rep = new Object()

    Object.entries(data).map(([k, v]) => {
      //console.log(k, v)
      if (k.includes('r')) {
        
        let rtag = k.split('_')[1]
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
    
    Object.entries(data).forEach(([k, v]) => {
      
      if (! Array.isArray(v) & Object.keys(v).length <= 2) {
        delete data[k]
      }
    })
    data["090"]['a'] = data["082"].a


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
      router.push(`/cataloguing/item?id=${response.data.id}`)
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    //console.log(marc)

}
// const { user } = useContext(AuthContext);
//     console.log("BOOK: ", user)

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
        <form onSubmit={handleSubmit}  >        
        <Box>
          <Box
            sx={
              value == 0 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
          {/* <h1>{user?.name}</h1> */}
            <Lider />
            <Tag008 />
            {tags0.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
            <Tag090  />
          </Box>
          <Box
            sx={
              value == 1 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags1.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
          </Box>
          <Box
            sx={
              value == 2 ? { display: "grid", rowGap: 3 } : { display: "none" }
            }
          >
            {tags2.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
          </Box>
          <Box sx={value == 3 ? { display: "grid", rowGap: 3} : { display: "none" }}>
          {tags3.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
          </Box>
          <Box sx={value == 4 ? { display: "grid", rowGap: 3 } : { display: "none" }}>
          {tags4.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
          </Box>
          <Box sx={value == 5 ? { display: "grid", rowGap: 3 } : { display: "none" }}>
          {tags5.map((e, i) => (
              <FieldNote key={i} meta={e} />
            ))}
          </Box>
          <Box sx={value == 6 ? { display: "grid", rowGap: 3 } : { display: "none" }}>
          {tags6.map((e, i) => (
              <Field key={i} meta={e} />
            ))}
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
        <Button variant="outlined" sx={{m: 2 }} type="submit">Salvar</Button>
        </form>
      </Box>
     
    </Container>
  );
}

Cataloguing_Book.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  
  // const apiClient = getAPIClient(ctx);
   const { ['bibliokeia.token']: token } = parseCookies(ctx)
   //console.log("TOKEN: ", token)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  // await apiClient.get('/users')

  return {
    props: {}
  }
}
