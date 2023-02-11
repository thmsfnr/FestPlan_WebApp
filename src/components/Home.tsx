
import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/test.service";
import BoardZone from "./BoardZone"
import BoardActivity from "./BoardActivity"
import BoardVolunteer from "./BoardVolunteer"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [lister, setLister] = React.useState('Zones');



  const handleChange = (event: SelectChangeEvent) => {
    setLister(event.target.value as string);
  };

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <Box sx={{ maxWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel>Lister</InputLabel>
            <Select
              value={lister}
              label="Lister"
              onChange={handleChange}
              >
              <MenuItem value={"Zones"}>Zones</MenuItem>
              <MenuItem value={"Jeux"}>Jeux</MenuItem>
              <MenuItem value={"Bénévoles"}>Bénévoles</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <br></br>
        <div>
          {lister === "Zones" ? <BoardZone></BoardZone> : <div></div>}
          {lister === "Jeux" ? <BoardActivity></BoardActivity> : <div></div>}
          {lister === "Bénévoles" ? <BoardVolunteer></BoardVolunteer> : <div></div>}
        </div>
      </header>
    </div>
  );
};

export default Home;
