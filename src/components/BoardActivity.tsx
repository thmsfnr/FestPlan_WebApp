import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import List from "./List";
import { getActivity } from "../services/activity.service"
import { getType } from "../services/type.service";
import { getZone } from "../services/zone.service";
import { getActivityAssignment } from "../services/activity_assignment.service";

/**
 * Props of the component
 */ 
type Props = {
  backMenu: () => void
}

/**
 * Component to consult activities
 * @param backMenu A function to return to the parent component
 */
const BoardActivity: React.FC<Props> = ({backMenu}) => {
  const [state, setState] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);
  const [type, setType] = useState<any[]>([]);
  const [saveList, setSaveList] = useState<any[]>([]);
  const [detail,setDetail] = useState<string>("")
  const [seachTerm, setSearchTerm] = useState<string>("")
  const [tagType, setTagType] = useState('0');
  const [tagZone, setTagZone] = useState('0');
  const [zone, setZone] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const activity = await getActivity().then(
        (response) => {
          return response},
        (error) => {
          window.location.reload()

        }
      );
      await getType().then(
        (response) => {setType(response)},
        (error) => {
          window.location.reload()
        }
      );
      await getZone().then(
        (response) => {setZone(response)},
        (error) => {
          window.location.reload()
        }
      );
      const activityAssignment = await getActivityAssignment().then(
        (response) => {
          return response
        },
        (error) => {
          window.location.reload()
        }
      );
      let save = []
      for (let i = 0; i < activity.length; i++) {
        for (let j = 0; j < activityAssignment.length; j++) {
          if (activity[i].idActivity === activityAssignment[j].ActivityIdActivity) {
            let temp = activity[i]
            temp.zone = activityAssignment[j].ZoneIdZone
            save.push(temp)
          }
        }
      }
      setAssignment(activityAssignment)
      setSaveList(save)
      setList(save)
    }
    fetchData();
  }, []);

  /**
   * To detect the click on a list element
   * @param elem The name of the element clicked
   */
  const parent=(elem : string) => {
    setState(false)
    setDetail(elem)
  }

  /**
   * To return to this component
   */
  const back = () => {
    setState(true)
    setDetail("")
    setSearchTerm("")
    setTagType("")
  }

  /**
   * Manage the search bar
   * @param event The value of the search bar
   */
  const handleSearch = (event: string) => {
    let value = event
    setSearchTerm(value)
    let result = saveList.filter((elem:any) => elem.nameActivity.toLowerCase().includes(value.toLowerCase()))
    if (tagType !== "0"){
      result = result.filter((elem:any) => elem.type === tagType)
    }
    setList(result)
  }

  /**
   * Manage the filter by type
   * @param type The value of the filter
   */
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

  /**
   * Manage the filter
   * @param zone The value of the zone
   * @param type The value of the type
   */
  const filter = (zone?: string, type?: string) => {

    let result = saveList

    if (zone !== undefined) {
      setTagZone(zone)
      if (tagType === "0" && zone === "0"){
        result = result
      }
      else if (tagType === "0"){
        result = result.filter((elem:any) => elem.zone === zone)
      }
      else if (zone === "0"){
        result = result.filter((elem:any) => elem.type === type)
      }
      else{
        result = result.filter((elem:any) => elem.zone === zone && elem.type === type)
      }
    }

    if (type !== undefined) {
      setTagType(type)
      if (tagZone === "0" && type === "0"){
        result = result
      }
else if (type === "0"){
        result = result.filter((elem:any) => elem.zone === zone)
      }
      else if (tagZone === "0"){
        result = result.filter((elem:any) => elem.type === type)
      }
      else{
        result = result.filter((elem:any) => elem.zone === zone && elem.type === type)
      }
    }
    result = result.filter((elem:any, index:any, self:any) => index === self.findIndex((t:any) => (t.nameActivity === elem.nameActivity)))
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
                onChange={(event) => filter(undefined, event.target.value)}

                >
                <MenuItem value={"0"}>Tous</MenuItem>
                {type.map((elem:any) => <MenuItem value={elem.idType}>{elem.nameType}</MenuItem>)}

              </Select>
            </FormControl>
          </Box>

          <Box sx={{ maxWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel>Zone</InputLabel>
              <Select
                value={tagZone}
                label="Zone"
                onChange={(event) => filter(event.target.value, undefined)}

                >
                <MenuItem value={"0"}>Tous</MenuItem>
                {zone.map((elem:any) => <MenuItem value={elem.idZone}>{elem.nameZone}</MenuItem>)}

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
