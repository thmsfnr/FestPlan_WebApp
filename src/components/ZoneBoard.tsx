import React, { useState, useEffect } from "react";

import List from "./List";
import { getZone } from "../services/zone.service"

const ZoneBoard: React.FC = () => {
  const [state, setState] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);
  const [detail,setDetail] = useState<string>("")

  useEffect(() => {
    getZone().then(
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
  }
  

  return(
    <div className="container">
      <div>
        {state ? <List parent={parent} content={list.map((elem:any) => elem.nameZone)}/> : <div></div>}
        {detail ? <div>
          <button onClick={back}>Retour</button>
          <h3>{detail}</h3>
          <p>Informations</p>
        </div> 
        : <div></div>}
      </div>
    </div>
  );
}

export default ZoneBoard;