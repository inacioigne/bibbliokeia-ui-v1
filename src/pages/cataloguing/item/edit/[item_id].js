import Layout from "src/admin/layout";
import { parseCookies } from "nookies";
import { Container, Box, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import Lider from "src/components/marc/lider"
import { api } from "src/services/api";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ItemEdit() {
    const [metadata, setMetadata] = useState(null)

    useEffect(() => {
        let isSubscribed = true;
        api.get(`http://localhost:8000/cataloging/item/16`)
        .then((response) => {
            
            isSubscribed ? setMetadata(response.data) :
            null
            })
            return () => (isSubscribed = false)

    }, [])
  
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
}
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
              <Lider metadata={metadata?.leader}/>
              {metadata?.leader[18]}
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

ItemEdit.getLayout = function getLayout(page) {
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
