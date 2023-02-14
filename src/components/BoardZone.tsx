import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import List from "./List";
import { getZone } from "../services/zone.service"

 /**
     * Props of the component
     */ 
 type Props = {
  backMenu: () => void
}

const BoardZone: React.FC<Props> = ({ backMenu }) => {
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
      {/* Back button */}
      <header style={styles.header} className="jumbotron">
        <Button variant="outlined" color="primary" onClick={backMenu}>Retour</Button>
      </header>
      <div>
        {state ? <List parent={parent} content={list.map((elem:any) => elem.nameZone)}/> : <div></div>}
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

export default BoardZone;