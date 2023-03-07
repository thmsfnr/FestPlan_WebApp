
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { getVolunteerAssignment, createVolunteerAssignment, deleteVolunteerAssignment } from "../services/volunteer_assignment.service";
import { getVolunteer } from "../services/volunteer.service";
import { createSlot } from "../services/slot.service";
import { TextField } from "@mui/material";

/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

/**
 * Component to display the details of a zone and to affect a volunteer to it
 * @param parent A function to return to the parent component
 * @param content The content of the zone
 */
const DetailAffectVolunteer: React.FC<Props> = ({ parent, content }) => {
  const [list, setList] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selected, setSelected] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [startDateSelected, setStartDate] = useState(new Date());
  const [endDateSelected, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
    // Volunteers assigned to the zone
    getVolunteerAssignment(undefined, content.idSlot, content.idZone).then(
      (response) => {
        setList(response);
        volunteers.forEach((item) => {
          let found = false;
          response.forEach((item2: { idVolunteer: any; }) => {
            if (item.idVolunteer === item2.idVolunteer) {
              found = true;
            }
          });
          if (!found) {
            setVolunteers([...volunteers, item]);
          }
        }
        );
      },
      (error) => {
        window.location.reload();
      }
    );
    // All volunteers
    getVolunteer().then(
      (response) => {
        setVolunteers(response);
        setSelected(response[0].idVolunteer);
      },
      (error) => {
        window.location.reload();
      }
    );
    setIsLoading(false);
    }
    fetchData();
  }, []);


  /**
   * Manage the click on the create button
   * @param idVolunteer Id of the volunteer to assign
   * @param idZone Id of the zone to assign
   * @param idSlot Id of the slot to assign
   */
  const createAssignment = (idVolunteer: number, idSlot: number, idZone: number, ) => {
    createVolunteerAssignment(idVolunteer, idSlot, idZone).then(
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
   * @param idVolunteer Id of the volunteer to delete
   * @param idSlot Id of the slot to delete
   */
  const removeAssignment = (idVolunteer: number, slot: number) => {
    deleteVolunteerAssignment(idVolunteer, slot).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  /**
   * Create a slot
   * @param startDate Start date of the slot
   * @param startDate Start date of the slot
   * @param endDate End date of the slot
   */
  const creationSlotThenAssigment = (selected: number, startDate: Date, endDate: Date) => {
    createSlot(startDate, endDate).then(
      (response) => {
        createAssignment(selected, response.idSlot, content.idZone);
      },
      (error) => {
        window.location.reload();
      }
    );
  }
  
  const cleanDate = (date: Date) => {
    // Convert the date to a string
    let newDate = new Date(date);
    let dateString = newDate.toString();
    dateString = dateString.substring(4, dateString.length - 46);
    // Convert the date to the format dd/mm/yyyy
    dateString = dateString.substring(4, 6) + "/"+ dateString.substring(0, 3) + "/"+ dateString.substring(7, 11) + " : " + dateString.substring(12, 17);

    return dateString;
  }

  //Verify if input are in the correct format
  const checkInput = (startDate: string, startTime: string, endDate: string, endTime: string ) => {
    //Check if the date is in the correct format
    let ProblemFound = false;
    let checkFinish = false;
    while (!ProblemFound && !checkFinish) {
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(startDate)) {
        alert("La date de début doit être au format jj/mm/aaaa");
        ProblemFound = true;
      }
      else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(endDate)) {
        alert("La date de fin doit être au format jj/mm/aaaa");
        ProblemFound = true;
      }
      //Check if the time is in the correct format
      else if (!/^\d{2}:\d{2}$/.test(startTime)) {
        alert("L'heure de début doit être au format hh:mm");
        ProblemFound = true;
      }
      else if (!/^\d{2}:\d{2}$/.test(endTime)) {
        alert("L'heure de fin doit être au format hh:mm");
        ProblemFound = true;
      }
      if (!ProblemFound) {
        checkFinish = true;
      }
    }

    if (!ProblemFound) {
    //Invert the date month and day
    startDate = startDate.substring(3, 5) + "/" + startDate.substring(0, 2) + "/" + startDate.substring(6, 10);
    endDate = endDate.substring(3, 5) + "/" + endDate.substring(0, 2) + "/" + endDate.substring(6, 10);


    //Check if the start date is before the end date
    let start = new Date(startDate + " " + startTime);
    let end = new Date(endDate + " " + endTime);
    if (start > end) {
      alert("La date de début doit être inférieure à la date de fin");
    }
  
    let dates = [start, end];
    return dates;
    }
    else {
      return null;
    }
  }


  return(
    <div className="container">
      {/* Back button */}
      <section style={styles.back}>
        <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
      </section>
      {/* Management */}
      <section style={styles.page}>
        {/* Assign a new volunteer to the zone */}
        <article style={styles.assign}>
          <h4>Affectation de volontaires à {content.nameZone}</h4>
        </article>
        { isLoading ?
          /* Loading */
          <article>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
              <CircularProgress />
            </Box>
          </article>
          :
          /* Main content */
          <article>
            {/* Assign a new volunteer to the zone */}
            <div style={styles.assign}>
              <select style={styles.select} value={selected} onChange={e => {setSelected(parseInt(e.target.value))}}>
              {volunteers.map((item) => (
                <option value={item.idVolunteer}>{item.name + " "+ item.surname}</option>
              ))}
            </select>
            <p>Debut : {content.startDate}</p>
            <TextField id="fieldStartDate" placeholder="DD/MM/YYYY" />
            <TextField id="fieldStartTime" placeholder="HH:MM" />
            <p>Fin : {content.endDate}</p>
            <TextField id="fieldEndDate" placeholder="DD/MM/YYYY" />
            <TextField id="fieldEndTime" placeholder="HH:MM" />

            <Button style={styles.button} variant="contained" color="primary" onClick={() => {
              if (selected !== undefined) {
                //get the element in the text field verify if it's not empty and in the right format
                let startDate = document.getElementById("fieldStartDate") as HTMLInputElement;
                let startTime = document.getElementById("fieldStartTime") as HTMLInputElement;
                let endDate = document.getElementById("fieldEndDate") as HTMLInputElement;
                let endTime = document.getElementById("fieldEndTime") as HTMLInputElement;
                //Check if the input are not empty
                if (startDate.value === "" || startTime.value === "" || endDate.value === "" || endTime.value === "") {
                  alert("Veuillez remplir tous les champs");
                }
                else{
                  let dates = checkInput(startDate.value, startTime.value, endDate.value, endTime.value);
                  if (dates !== undefined && dates !== null) {
                    creationSlotThenAssigment(selected, dates[0], dates[1]);
                  }

                }
              }
            }}>Ajouter</Button>
          </div>
          {/* List of volunteers assigned to the zone */}
          <div>
            {list.map((item) => (
              <div style={styles.tile}>
                <p>{item.Volunteer.name + " " + item.Volunteer.surname}</p>
                <p>{cleanDate(item.Slot.startDate) + " - " + cleanDate(item.Slot.endDate)}</p>
                <Button variant="contained" color="error" onClick={() => {
                  removeAssignment(item.VolunteerIdVolunteer, item.Slot.idSlot)
                }}>🗑️</Button>
              </div>
            ))}
            </div>
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
  },  
  title: {
    "padding": "30px",
    "paddingBottom": "0px",
    "text-align": "center"
  }
}

export default DetailAffectVolunteer;
