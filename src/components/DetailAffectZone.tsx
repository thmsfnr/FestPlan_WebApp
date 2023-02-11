
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import { getActivityAssignment, createActivityAssignment, deleteActivityAssignment } from "../services/activity_assignment.service";
import { getActivity } from "../services/activity.service";

/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

/**
 * Component to display the details of a zone and to affect an activity to it
 * @param parent A function to return to the parent component
 * @param content The content of the zone
 */
const DetailAffectZone: React.FC<Props> = ({ parent, content }) => {
  const [list, setList] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    // Activities assigned to the zone
    getActivityAssignment(undefined, content.idZone).then(
      (response) => {
        setList(response);
        activities.forEach((item) => {
          let found = false;
          response.forEach((item2: { idActivity: any; }) => {
            if (item.idActivity === item2.idActivity) {
              found = true;
            }
          });
          if (!found) {
            setActivities([...activities, item]);
          }
        }
        );
      },
      (error) => {
        window.location.reload();
      }
    );
    // All activities
    getActivity().then(
      (response) => {
        setActivities(response);
      },
      (error) => {
        window.location.reload();
      }
    );
  }, []);

  /**
   * Manage the click on the create button
   * @param idActivity Id of the activity to assign
   * @param idZone Id of the zone to assign
   */
  const createAssignment = (idActivity: number, idZone: number) => {
    createActivityAssignment(idActivity, idZone).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  /**
   * Manage the click on the delete button
   * @param idActivity Id of the activity to delete
   * @param idZone Id of the zone to delete
   */
  const removeAssignment = (idActivity: number, idZone: number) => {
    deleteActivityAssignment(idActivity, idZone).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  return(
    <div className="container">
      {/* Back button */}
      <section style={styles.back}>
        <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
      </section>
      {/* Management */}
      <section style={styles.page}>
        {/* Assign a new activity to the zone */}
        <article style={styles.assign}>
          <select style={styles.select} value={selected} onChange={e => {setSelected(parseInt(e.target.value))}}>
            {activities.map((item) => (
              <option value={item.idActivity}>{item.nameActivity}</option>
            ))}
          </select>
          <Button style={styles.button} variant="contained" color="primary" onClick={() => {
            if (selected !== undefined) {
              createAssignment(selected, content.idZone)
            }
          }}>Ajouter</Button>
        </article>
        {/* List of activities assigned to the zone */}
        <article>
          {list.map((item) => (
            <div style={styles.tile}>
              <p>{item.Activity.nameActivity}</p>
              <Button variant="contained" color="error" onClick={() => {
                removeAssignment(item.ActivityIdActivity, content.idZone)
              }}>🗑️</Button>
            </div>
          ))}
        </article>
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
  page: {
    "display": "flex",
    "flex-direction": "column",
    "backgroundColor": "#E6E6E6",
    "padding": "30px",
    "borderRadius": "30px",
  },
  assign: {
    "display": "flex",
    "flex-direction": "column",
    "margin": "30px",
  },
  list: {
    "display": "flex",
    "flex-wrap": "wrap",
    "justifyContent": "center",
    "margin": "30px",
  },
  tile: {
    "backgroundColor": "#FFFFFF",
    "padding": "20px",
    "borderRadius": "10px",
    "text-align": "center",
    "margin": "20px",
  },
  select : {
    "margin": "20px",
    "border": "none",
    "fontSize": "17px",
    "padding": "10px",
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "borderRadius": "10px",
    "fontWeight": "bold",
  },
  button: {
    "marginRight": "30px",
    "marginLeft": "30px",
  }  
}

export default DetailAffectZone;
