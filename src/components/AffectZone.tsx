
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import List from "./List";
import DetailAffectZone from "./DetailAffectZone";
import { getZone } from "../services/zone.service";

/**
 * Props of the component
 */ 
type Props = {
    parent: () => void
}

/**
 * Component to affect an activity to a zone
 * @param parent A function to return to the parent component 
 */
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

  /**
   * Manage the click on a list element
   * @param elem The name of the element clicked
   */
  const change=(elem : string) => {
    setState(false)
    const save = list.filter((item:any) => item.nameZone === elem)
    setDetail(save[0])
  }

  /**
   * Manage the click on the back button
   */
  const back= () => {
    setState(true)
  }

  return(
    <div className="container">
      <section>
        {state ? 
          /* Display the list of zones */
          <article>
            <div style={styles.back} className="jumbotron">
              <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
            </div>
            <List parent={change} content={list.map((elem:any) => elem.nameZone)}/>
          </article> 
          : 
          /* Display the detail of the zone */
          <article>
            <DetailAffectZone parent={back} content={detail}/>
          </article>
        }
      </section>
    </div>
  );
}

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  back: {
      "margin": "30px",
      "marginBottom": "30px",
      "text-align": "center"
  },
}

export default AffectZone;
