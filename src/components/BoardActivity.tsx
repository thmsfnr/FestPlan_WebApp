import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';


import List from "./List";
import { getActivity } from "../services/activity.service"
import { valueToPercent } from "@mui/base";

const BoardActivity: React.FC = () => {
  const [state, setState] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);
  const [detail,setDetail] = useState<string>("")
  const [seachTerm, setSearchTerm] = useState<string>("")


  useEffect(() => {
    getActivity().then(
      (response) => {setList(response)},
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
  }
  
  const handleSearch = (event: any) => {
    let value = event.target.value
    setSearchTerm(value)
  }

  console.log(seachTerm)

  return(
    <div className="container">
      { state ? 
          <div className="searchBar">
            <input type="text" 
            placeholder="Rechercher"
            onChange={handleSearch}
            
            />
            <List parent={parent} content={list.map((elem:any) => elem.nameActivity).filter((val:any) => {
                if(seachTerm == ""){
                  return val
                }else if(val.toLowerCase().includes(seachTerm.toLowerCase())){
                  return val
                }
              })}
            />

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

export default BoardActivity;