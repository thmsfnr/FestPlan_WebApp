
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

/**
 * Props of the component
 */ 
 type Props = {
  backMenu: () => void
}

/**
 * Component to list volunteers and zones of a slot
 * @param backMenu A function to return to the parent component
 * @returns 
 */
const BoardVolunteer: React.FC<Props> = ({ backMenu }) => {

  return(
    <div className="container">
      {/* Back button */}
      <header style={styles.header} className="jumbotron">
        <Button variant="outlined" color="primary" onClick={backMenu}>Retour</Button>
      </header>
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

export default BoardVolunteer;
