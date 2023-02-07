
import React, { useState } from "react";
import Button from '@mui/material/Button';

type Props = {
    parent: () => void
    content: any
}

const DetailAffectZone: React.FC<Props> = ({ parent, content }) => {

  return(
    <div className="container">
      <div>
        <p>{content.idZone}</p>
        <Button variant="contained" color="primary" onClick={parent}>
            Retour
          </Button>
      </div>
    </div>
  );
}

export default DetailAffectZone;
