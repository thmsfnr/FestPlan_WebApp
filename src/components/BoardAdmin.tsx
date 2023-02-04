
import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Management from "./Management";
import { getAdminBoard } from "../services/test.service";

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
  }, []);

  const back = () => {
    setState("");
  }


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Admin Board</h3>
        {state == "" ?
        <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" onClick={() => {
            setState("type")
          }}>
            Gestion des types de jeux
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            setState("activity")
          }}>
            Gestion des jeux
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            setState("volunteer")
          }}>
            Gestion des bénévoles
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            setState("zone")
          }}>
            Gestion des zones
          </Button>
        </Stack></div>:
        <div>
          {state == "type" ? <Management name={"type"} parent={back} /> : <div></div>}
          {state == "activity" ? <Management name={"activity"} parent={back} /> : <div></div>}
          {state == "volunteer" ? <Management name={"volunteer"} parent={back} /> : <div></div>}
          {state == "zone" ? <Management name={"zone"} parent={back} /> : <div></div>}
        </div>
        }
      </header>
    </div>
  );
};

export default BoardAdmin;
