
import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Management from "./Management";
import { getAdminBoard } from "../services/test.service";
import AffectZone from "./AffectZone";
import AffectVolunteer from "./AffectVolunteer";

/**
 * Component for the admin board
 */
const BoardAdmin: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const [state, setState] = useState<string>("");

  useEffect(() => {
    getAdminBoard().then(
      (response) => {},
      (error) => {
        navigate("/login");
      }
    );
  });

  /**
   * Go back to the base page of the admin board
   */
  const back = () => {
    setState("");
  }

  return (
    <div style={styles.page} className="container">
      {state === "" ?
        /* Selection Menu */
        <section style={styles.container}>
          {/* Title of the section */}
          <header style={styles.header} className="jumbotron">
            <h4>Admin Menu</h4>
          </header>
          {/* List of buttons */}
          <article>
            <Stack spacing={5} direction="column" justifyContent="center" alignItems="center">
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("type") }}>Gestion des types de jeux</Button>
              <Button style={styles.button} variant="contained" size="large" color="primary" onClick={() => { setState("activity") }}>Gestion des jeux</Button>
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("volunteer") }}>Gestion des bénévoles</Button>
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("zone") }}>Gestion des zones</Button>
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("affectZone") }}>Affectation des zones</Button>
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("affectSlot") }}>Affectation des créneaux</Button>
            </Stack>
          </article>
        </section>
        :
        /* Action selected */
        <section>
          {state === "type" ? <Management display={"types"} name={"type"} parent={back}/> : <div></div>}
          {state === "activity" ? <Management display={"jeux"} name={"activity"} parent={back}/> : <div></div>}
          {state === "volunteer" ? <Management display={"bénévoles"} name={"volunteer"} parent={back}/> : <div></div>}
          {state === "zone" ? <Management display={"zones"} name={"zone"} parent={back}/> : <div></div>}
          {state === "affectZone" ? <AffectZone parent={back}/>: <div></div>}
          {state === "affectSlot" ? <AffectVolunteer parent={back}/>: <div></div>/* To complete with the corresponding action */}
        </section>
      }
    </div>
  );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  button: {
    "padding": "20px",
    "paddingTop": "20px",
    "width": "300px",
  },
  header: {
    "display": "flex",
    "justifyContent": "center",
    "margin": "30px",
  },
  container: {
    "backgroundColor": "#E6E6E6",
    "marginTop": "50px",
    "marginBottom": "50px",
    "padding": "10px",
    "paddingBottom": "40px",
    "width": "500px",
    [`@media (maxWidth: 768px)`]: {
      "width": "380px",
    },
    "borderRadius": "30px",
  },
  page: {
    "display": "flex",
    "justifyContent": "center",
  }
}

export default BoardAdmin;
