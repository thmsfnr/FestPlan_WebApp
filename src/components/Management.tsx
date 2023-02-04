
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CreationForm from "./CreationForm";

type Props = {
    name: string;
    parent: () => void
  }

const Management: React.FC<Props> = ({name, parent}) => {
const elem: Record<string, any> = {};

  return (
    <div className="container">
      <header className="jumbotron">
        <CreationForm parent={parent} name={name} fields={elem} action={"create"}/>
        <Button variant="contained" color="primary" onClick={parent}>
            Retour
          </Button>
      </header>
    </div>
  );
};

export default Management;
