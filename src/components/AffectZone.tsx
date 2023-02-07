
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import List from "./List";
import DetailAffectZone from "./DetailAffectZone";
import { getZone } from "../services/zone.service";

type Props = {
    parent: () => void
}

const AffectZone: React.FC<Props> = ({ parent }) => {
  const [state, setState] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);
  const [detail,setDetail] = useState<string>("")

  useEffect(() => {
    getZone().then(
      (response) => {
        setList(response)
      },
      (error) => {
        window.location.reload()
      }
    );
  }, []);

  const change=(elem : string) => {
    setState(false)
    const save = list.filter((item:any) => item.nameZone === elem)
    setDetail(save[0])
  }

  const back= () => {
    setState(true)
  }

  return(
    <div className="container">
      <div>
        {state ? <div><List parent={change} content={list.map((elem:any) => elem.nameZone)}/><Button variant="contained" color="primary" onClick={parent}>
            Retour
          </Button></div> : <DetailAffectZone parent={back} content={detail}/>}
        
      </div>
    </div>
  );
}

export default AffectZone;
