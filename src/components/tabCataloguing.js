import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

export default function TabCataloguing() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} variant="fullWidth">
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
  )

}