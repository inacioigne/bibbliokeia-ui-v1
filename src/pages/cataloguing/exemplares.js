import Container from '@mui/material/Container';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Time from "@/function/time"

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

export default function Exemplares() {

    const controfields = {
        "003": "BR-MnINPA",
        "005": Time(),
       // '008': tag008.join(""),
      }

    return (
        <Container>
        <Tabs >
        <Tab label="Leader" {...a11yProps(0)} />
        

        </Tabs>
        <h1>Exemplares</h1>
            
        </Container>

    )
}