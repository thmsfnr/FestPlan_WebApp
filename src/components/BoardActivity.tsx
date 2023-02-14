import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import List from "./List";
import { getActivity } from "../services/activity.service"
import { getType } from "../services/type.service";

 /**
     * Props of the component
     */ 
 type Props = {
  backMenu: () => void
}

const BoardActivity: React.FC<Props> = ({backMenu}) => {
const [state, setState] = useState<boolean>(true);
const [list, setList] = useState<any[]>([]);
const [type, setType] = useState<any[]>([]);
const [saveList, setSaveList] = useState<any[]>([]);

const [detail,setDetail] = useState<string>("")
const [seachTerm, setSearchTerm] = useState<string>("")
const [tagType, setTagType] = useState('0');


useEffect(() => {
  getActivity().then(
    (response) => {setList(response)
    setSaveList(response)},
    (error) => {
      window.location.reload()

    }
  );
  getType().then(
    (response) => {setType(response)},
    (error) => {
      window.location.reload()

    }
  );
}, []);


const parent=(elem : string) => {
  setState(false)
  setDetail(elem)

}

const back = () => {
  setState(true)
  setDetail("")
  setSearchTerm("")
  setTagType("")
}

const handleSearch = (event: string) => {
  let value = event
  setSearchTerm(value)
  let result = saveList.filter((elem:any) => elem.nameActivity.toLowerCase().includes(value.toLowerCase()))
  if (tagType !== "0"){
    result = result.filter((elem:any) => elem.type === tagType)
  }
  setList(result)

}

const filterType = (type: string) => {
  let value = type
  setTagType(value)
  let result = saveList
  if (value === "0") {
    setList(saveList)
  }
  else{
    result = saveList.filter((elem:any) => elem.type === value)
  }
  result = result.filter((elem:any) => elem.nameActivity.toLowerCase().includes(seachTerm.toLowerCase()))
  setList(result)
}




return(
  <div className="container">
    {/* Back button */}
    <header style={styles.header} className="jumbotron">
        <Button variant="outlined" color="primary" onClick={backMenu}>Retour</Button>
      </header>
    { state ? 
        <div className="searchBar">
          <input type="text" 
          placeholder="Rechercher"
          onChange={(event) => handleSearch(event.target.value)}
          />

        <Box sx={{ maxWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel>Type d'activité</InputLabel>
            <Select
              value={tagType}
              label="Type"
              onChange={(event) => filterType(event.target.value)}

              >
              <MenuItem value={"0"}>Tous</MenuItem>
              {type.map((elem:any) => <MenuItem value={elem.idType}>{elem.nameType}</MenuItem>)}

            </Select>
          </FormControl>
        </Box>
        
        <List parent={parent} content={list.map((elem:any) => elem.nameActivity)}/>
          </div>
    : <div></div>
    }

    {detail ? <div>
        <Button variant="contained" color="primary" onClick={back}>
          Retour
        </Button>
        <br></br>
        <br></br>
        <h3>{detail}</h3>
        <br></br>
        <p>Informations</p>
      </div> 
      : <div></div>}
      
  </div>
);
}

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  header: {
    "display": "flex",
    "justifyContent": "center",
    "margin": "30px",
  },
}

export default BoardActivity;