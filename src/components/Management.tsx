
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CreationForm from "./CreationForm";

import { getType, deleteType } from "../services/type.service";
import { getVolunteer, deleteVolunteer } from "../services/volunteer.service";
import { getZone, deleteZone } from "../services/zone.service";
import { getActivity, deleteActivity } from "../services/activity.service";

type Props = {
    name: string;
    parent: () => void
  }

const Management: React.FC<Props> = ({name, parent}) => {

const [elem, setElem] = useState<Record<string, string>>({});

const [list, setList] = useState<any[]>([]);

const [action, setAction] = useState<string>("create");

const remove = (elem: number) => {
    if (name == "type") {
        deleteType(elem).then();
    }
    else if (name == "volunteer") {
        deleteVolunteer(elem).then();
    }
    else if (name == "zone") {
        deleteZone(elem).then();
    }
    else if (name == "activity") {
        deleteActivity(elem).then();
    }
}

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
        <CreationForm parent={parent} name={name} fields={elem} action={action}/>
        <div>
            {list.map((item) => (
                <div>
                    {
                        item.map((subitem: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined) => (
                            <div>
                                <p>{subitem}</p>
                                <Button variant="contained" color="primary" onClick={() => {
                                    setList(list.filter((value) => value != item))
                                    remove(item[0])
                                }}>
                                    Supprimer
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => {
                                    setAction("update");
                                    if (name === "type") {
                                        setElem({idType: item[0], nameType: item[1]})
                                    }
                                    else if (name === "volunteer") {
                                        setElem({idVolunteer: item[0], name: item[1], surname: item[2], email: item[3]})
                                    }
                                    else if (name === "zone") {
                                        setElem({idZone: item[0], nameZone: item[1]})
                                    }
                                    else if (name === "activity") {
                                        setElem({idActivity: item[0], nameActivity: item[1], type: item[2]})
                                    }
                                }}>
                                    Modifier
                                </Button>
                            </div>

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
