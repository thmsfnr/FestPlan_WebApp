
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import BoardZone from "./BoardZone"
import BoardActivity from "./BoardActivity"
import BoardVolunteer from "./BoardVolunteer"

const Home: React.FC = () => {
  const [state, setState] = useState<string>("");

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
            <h4>Home Menu</h4>
          </header>
          {/* List of buttons */}
          <article>
            <Stack spacing={5} direction="column" justifyContent="center" alignItems="center">
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("zone") }}>Consultation des zones</Button>
              <Button style={styles.button} variant="contained" size="large" color="primary" onClick={() => { setState("activity") }}>Consultation des jeux</Button>
              <Button style={styles.button} variant="contained" color="primary" onClick={() => { setState("volunteer") }}>Consultation des bénévoles</Button>
            </Stack>
          </article>
        </section>
        :
        /* Action selected */
        <section>
          {state === "zone" ? <BoardZone backMenu={back}></BoardZone> : <div></div>}
          {state === "activity" ? <BoardActivity backMenu={back}></BoardActivity>  : <div></div>}
          {state === "volunteer" ? <BoardVolunteer backMenu={back}></BoardVolunteer> : <div></div>}
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

export default Home;
