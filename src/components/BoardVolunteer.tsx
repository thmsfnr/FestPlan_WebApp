import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import List from "./List";
import { getVolunteer } from "../services/volunteer.service"

const BoardVolunteer: React.FC = () => {
  const [state, setState] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);
  const [detail,setDetail] = useState<string>("")

  useEffect(() => {
    getVolunteer().then(
      (response) => {setList(response)},
      (error) => {
        window.location.reload()

      }
    );
  }, []);


  const parent=(elem : string) => {
    setState(false)
    setDetail(elem)
    console.log(elem)

  }

  const back = () => {
    setState(true)
    setDetail("")
  }
  

  return(
    <div className="container">
      <div>
        {state ? <List parent={parent} content={list.map((elem:any) => elem.name)}/> : <div></div>}
        {detail ? <div>
          <Button variant="contained" color="primary" onClick={back}>
            Retour
          </Button>
          <br></br>
          <br></br>
          <h3>{detail}</h3>
          <br></br>
          <p>{list.map((elem:any) =>  elem.name + "\n" + elem.surname +"\n" + elem.email)}</p>
        </div> 
        : <div></div>}
      </div>
    </div>
  );
}

export default BoardVolunteer;