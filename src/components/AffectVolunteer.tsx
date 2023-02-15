
    import React, { useState, useEffect } from "react";
    import Button from '@mui/material/Button';

    import List from "./List";
    import { getZone } from "../services/zone.service";
    import { getActivityAssignment } from "../services/activity_assignment.service";
    import DetailAffectVolunteer from "./DetailAffectVolunteer";

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
    const AffectVolunteer: React.FC<Props> = ({ parent }) => {
    const [state, setState] = useState<boolean>(true);
    const [list, setList] = useState<any[]>([]);
    const [assignedZones, setAssignedZones] = useState<any[]>([]);
    const [detail,setDetail] = useState<string>("")



    useEffect(() => {
      getActivityAssignment().then(
        (response) => {
          setAssignedZones(response)
          },        
        (error) => {
          window.location.reload()
        }
      );
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
      let value = elem.split(" :")[0]
      console.log(value)
      console.log(elem)
      setState(false)
      const save = list.filter((item:any) => item.nameZone === value)
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
              <List parent={change} content={assignedZones.sort((a:any, b:any) => a.Zone.nameZone.localeCompare(b.Zone.nameZone))
              /*Zone appear only once */
                .filter((item:any, index:any, self:any) => self.findIndex((t:any) => t.Zone.nameZone === item.Zone.nameZone) === index)
                .map((item:any) => item.Zone.nameZone)} />
            </article> 
            : 
            /* Display the detail of the zone */
            <article>
              <DetailAffectVolunteer parent={back} content={detail}/>
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
    div: {
      "white-space": "pre-wrap"
    },
    }

    export default AffectVolunteer;
