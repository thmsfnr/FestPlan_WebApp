
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import { getActivityAssignment, createActivityAssignment, deleteActivityAssignment } from "../services/activity_assignment.service";
import { getActivity } from "../services/activity.service";

type Props = {
    parent: () => void
    content: any
}

const DetailAffectZone: React.FC<Props> = ({ parent, content }) => {
  const [list, setList] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [selected, setSelected] = useState<number>();

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

  useEffect(() => {
    getActivityAssignment(undefined, content.idZone).then(
      (response) => {
        setList(response);
        console.log(response);
      },
      (error) => {
        window.location.reload();
      }
    );
    getActivity().then(
      (response) => {
        setActivities(response);
      },
      (error) => {
        window.location.reload();
      }
    );

  }, []);


  return(
    <div className="container">
      <div>
        <Button variant="contained" color="primary" onClick={parent}>
            Retour
          </Button>
          <select value={selected} onChange={e => {console.log("ok")
        setSelected(parseInt(e.target.value))}}>
            {activities.map((item) => (
              <option value={item.idActivity}>{item.nameActivity}</option>
            ))}
          </select>
          <p>{selected}</p>
          <Button variant="contained" color="primary" onClick={() => {
            if (selected !== undefined) {
              createAssignment(selected, content.idZone)
            }
          }}>Créer</Button>
          <div>
            {list.map((item) => (
              <div>
                <p>{item.Activity.nameActivity}</p>
                <Button variant="contained" color="primary" onClick={() => {
                  removeAssignment(item.ActivityIdActivity, content.idZone)
                }}>Supprimer</Button>
          </div>

        ))}
        </div>
      </div>
    </div>
  );
}

export default DetailAffectZone;
