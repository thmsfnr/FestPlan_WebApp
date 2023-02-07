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
  

  return(
    <div className="container">
      <div>
        {state ? <List parent={parent} content={list.map((elem:any) => elem.nameZone)}/> : <div></div>}
      </div>
    </div>
  );
}

export default ZoneBoard;