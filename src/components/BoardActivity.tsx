
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  const [list, setList] = useState<any[]>([]);
  const [type, setType] = useState<any[]>([]);
  const [saveList, setSaveList] = useState<any[]>([]);
  const [seachTerm, setSearchTerm] = useState<string>("")
  const [tagType, setTagType] = useState('0');
  const [tagZone, setTagZone] = useState('0');
  const [zone, setZone] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Activity
      const activity = await getActivity().then(
        (response) => {
          return response},
        (error) => {
          window.location.reload()
        }
      );
      // Type
      await getType().then(
        (response) => {
          setType(response)
        },
        (error) => {
          window.location.reload()
        }
      );
      // Zone
      await getZone().then(
        (response) => {
          setZone(response)
        },
        (error) => {
          window.location.reload()
        }
      );
      // ActivityAssignment
      const activityAssignment = await getActivityAssignment().then(
        (response) => {
          return response
        },
        (error) => {
          window.location.reload()
        }
      );

      // Merge activity and activity assignment
      console.log(activityAssignment)
      let save = []
      for (let i = 0; i < activity.length; i++) {
        for (let j = 0; j < activityAssignment.length; j++) {
          if (activity[i].idActivity === activityAssignment[j].ActivityIdActivity) {
            let temp = activity[i]
            temp.zone = activityAssignment[j].ZoneIdZone
            temp.nameZone = activityAssignment[j].Zone.nameZone
            save.push(temp)
          }
        }
      }
      save = save.filter((elem:any, index:any, self:any) => index === self.findIndex((t:any) => (t.nameActivity === elem.nameActivity)))
      setSaveList(save)
      setList(save)
    }
    fetchData();
  }, []);

  /**
   * Manage the filter
   * @param zone The value of the zone
   * @param type The value of the type
   * @param search The value of the search
   */
  const filter = (zone?: string, type?: string, search?: string) => {
    let result = saveList

    // Filter by zone
    if (zone !== undefined) {
      setTagZone(zone)
      if (tagType !== "0"){
        result = result.filter((elem:any) => elem.type === tagType)
      }
      if (zone !== "0"){
        result = result.filter((elem:any) => elem.zone === zone)
      }
      result = result.filter((elem:any) => elem.nameActivity.toLowerCase().includes(seachTerm.toLowerCase()))
    }

    // Filter by type
    else if (type !== undefined) {
      setTagType(type)
      if (type !== "0"){
        result = result.filter((elem:any) => elem.type === type)
      }
      if (tagZone !== "0"){
        result = result.filter((elem:any) => elem.zone === tagZone)
      }
      result = result.filter((elem:any) => elem.nameActivity.toLowerCase().includes(seachTerm.toLowerCase()))
    }

    // Filter by search
    else if (search !== undefined) {
      setSearchTerm(search)
      if (tagType !== "0"){
        result = result.filter((elem:any) => elem.type === tagType)
      }
      if (tagZone !== "0"){
        result = result.filter((elem:any) => elem.zone === tagZone)
      }
      result = result.filter((elem:any) => elem.nameActivity.toLowerCase().includes(search.toLowerCase()))
    }

    result = result.filter((elem:any, index:any, self:any) => index === self.findIndex((t:any) => (t.nameActivity === elem.nameActivity)))
    setList(result)
  }

  return(
    <div className="container">
      {/* Back button */}
      <header style={styles.header} className="jumbotron">
        <Button variant="outlined" color="primary" onClick={backMenu}>Retour</Button>
      </header>
      {/* Page */}
      <section className="searchBar" style={styles.page}>
        {/* Filter bar */}
        <article style={styles.filter}>
          {/* Search bar */}
          <input style={styles.search} type="text" placeholder="Rechercher" onChange={(event) => filter(undefined, undefined, event.target.value)}/>
          {/* Type filter */}
          <Box sx={{ maxWidth: 150 }} style={styles.box}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={tagType} label="Type" onChange={(event) => filter(undefined, event.target.value)}>
                <MenuItem value={"0"}>Tous</MenuItem>
                {type.map((elem:any) => 
                  <MenuItem value={elem.idType}>{elem.nameType}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          {/* Zone filter */}
          <Box sx={{ maxWidth: 150 }} style={styles.box}>
            <FormControl fullWidth>
              <InputLabel>Zone</InputLabel>
              <Select value={tagZone} label="Zone" onChange={(event) => filter(event.target.value)}>
                <MenuItem value={"0"}>Tous</MenuItem>
                {zone.map((elem:any) => 
                  <MenuItem value={elem.idZone}>{elem.nameZone}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </article>
        {/* List of elements */}
        <article style={styles.list}>
          {list.map((item) => (
            <div style={styles.element}>
              <h5>{item.nameActivity}</h5>
              <p>Type: {item.Type.nameType}</p>
            </div>
          ))}
        </article>
      </section>
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
  list: {
      "margin": "30px",
      "display": "flex",
      'flex-wrap': 'wrap',
      "justifyContent": "center",
      "padding": "10px",
  },
  element: {
      "backgroundColor": "#FFFFFF",
      "borderRadius": "10px",
      "margin": "10px",
      "padding": "10px  ",
      "text-align": "center"
  },
  page: {
    "backgroundColor": "#E6E6E6",
    "borderRadius": "30px",
  },
  title: {
    "padding": "30px",
    "paddingBottom": "0px",
    "text-align": "center"
  },
  main: {
    "display": "flex",
    "flex-direction": "column",
    "padding": "30px",
  },
  filter: {
    "display": "flex",
    "justifyContent": "center",
    "flx-direction": "row",
    "padding": "10px",
  },
  box: {
    "backgroundColor": "#FFFFFF",
    "margin": "10px",
  },
  search: {
    "border": "none",
    "margin": "10px",
    "text-align": "center",
  }
}

export default BoardActivity;
