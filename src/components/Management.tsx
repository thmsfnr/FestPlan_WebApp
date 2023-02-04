
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CreationForm from "./CreationForm";

import { getType } from "../services/type.service";
import { getVolunteer } from "../services/volunteer.service";
import { getZone } from "../services/zone.service";
import { getActivity } from "../services/activity.service";

type Props = {
    name: string;
    parent: () => void
  }

const Management: React.FC<Props> = ({name, parent}) => {
const [elem, setElem] = useState<Record<string, string>>({});

const [list, setList] = useState<any[]>([]);

useEffect(() => {
    if (name == "type") {
        getType().then(
            (response) => {
                let save = [];
                for (let i = 0; i < response.length; i++) {
                    save.push([response[i].idType,response[i].nameType]);
                }
                setList(save);
                let temp: Record<string, string> = {
                    nameType: ""
                };
                setElem(temp);
            },
            (error) => {
                window.location.reload();
            }
        );
    }
    else if (name == "volunteer") {
        getVolunteer().then(
            (response) => {
                let save = [];
                for (let i = 0; i < response.length; i++) {
                    save.push([response[i].idVolunteer,response[i].name,response[i].surname,response[i].email]);
                }
                setList(save);
                let temp: Record<string, string> = {
                    name: "",
                    surname: "",
                    email: "",
                };
                setElem(temp);
            },
            (error) => {
                window.location.reload();
            }
        );
    }
    else if (name == "zone") {
        getZone().then(
            (response) => {
                let save = [];
                for (let i = 0; i < response.length; i++) {
                    save.push([response[i].idZone,response[i].nameZone]);
                }
                setList(save);
                let temp: Record<string, string> = {
                    nameZone: ""
                };
                setElem(temp);
            },
            (error) => {
                window.location.reload();
            }
        );
    }
    else if (name == "activity") {
        getActivity().then(
            (response) => {
                let save = [];
                for (let i = 0; i < response.length; i++) {
                    save.push([response[i].idActivity,response[i].nameActivity,response[i].type]);
                }
                setList(save);
                let temp: Record<string, string> = {
                    nameActivity: "",
                    type: ""
                };
                setElem(temp);
            },
            (error) => {
                window.location.reload();
            }
        );
    }
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <CreationForm parent={parent} name={name} fields={elem} action={"create"}/>
        <div>
            {list.map((item) => (
                <div>
                    {
                        item.map((subitem: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
                            <p>{subitem}</p>
                        ))
                    }
                </div>
            ))}
        </div>
        <Button variant="contained" color="primary" onClick={parent}>
            Retour
          </Button>
      </header>
    </div>
  );
};

export default Management;
