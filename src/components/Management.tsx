
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import CreationForm from "./CreationForm";
import { getType, deleteType } from "../services/type.service";
import { getVolunteer, deleteVolunteer } from "../services/volunteer.service";
import { getZone, deleteZone } from "../services/zone.service";
import { getActivity, deleteActivity } from "../services/activity.service";

/**
 * Props of the component
 */
type Props = {
    display: string,
    name: string;
    parent: () => void
}

/**
 * Component for the management of a type, a volunteer, a zone or an activity
 * @param name The name of the element to manage
 * @param parent A function to return to the parent component
 */
const Management: React.FC<Props> = ({display, name, parent}) => {
    const [elem, setElem] = useState<Record<string, string>>({});
    const [list, setList] = useState<any[]>([]);
    const [action, setAction] = useState<string>("create");
    
    useEffect(() => {
        // Type
        if (name === "type") {
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
        // Volunteer
        else if (name === "volunteer") {
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
        // Zone
        else if (name === "zone") {
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
        // Activity
        else if (name === "activity") {
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
    });

    /**
     * Remove an element
     * @param elem An array corresponding to the element to remove
     */
    const remove = (elem: any[]) => {
        // Type
        if (name === "type") {
            deleteType(elem[0]).then(
                (response) => {
                    setList(list.filter((value) => value !== elem))
                },
                (error) => {
                    window.location.reload();
                }
            );
        }
        // Volunteer
        else if (name === "volunteer") {
            deleteVolunteer(elem[0]).then(
                (response) => {
                    setList(list.filter((value) => value !== elem))
                },
                (error) => {
                    window.location.reload();
                }
            );
        }
        // Zone
        else if (name === "zone") {
            deleteZone(elem[0]).then(
                (response) => {
                    setList(list.filter((value) => value !== elem))
                },
                (error) => {
                    window.location.reload();
                }
            );
        }
        // Activity
        else if (name === "activity") {
            deleteActivity(elem[0]).then(
                (response) => {
                    setList(list.filter((value) => value !== elem))
                },
                (error) => {
                    window.location.reload();
                }
            );
        }
    }

    return (
        <div className="container">
            {/* Back button */}
            <header style={styles.header} className="jumbotron">
                <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
            </header>
            {/* Management page */}
            <section style={styles.page}>
                {/* Title */}
                <article style={styles.title}>
                    <h4>Gestion des {display}</h4>
                </article>
                {/* Main management elements */}
                <article style={styles.main}>
                    {/* Creation or update form */}
                    <div style={styles.form}>
                        <CreationForm parent={parent} name={name} fields={elem} action={action}/>
                    </div>
                    {/* List of elements */}
                    <div style={styles.list}>
                        {list.map((item) => (
                            <div> {
                                <div style={styles.element}>
                                    <p>{item[1]}</p>
                                    <Button style={styles.button} variant="contained" color="error" onClick={() => { remove(item) }}>🗑️</Button>
                                    <Button style={styles.button} variant="contained" color="primary" onClick={() => {
                                        setAction("update");
                                        // Type
                                        if (name === "type") {
                                            setElem({idType: item[0], nameType: item[1]})
                                        }
                                        // Volunteer
                                        else if (name === "volunteer") {
                                            setElem({idVolunteer: item[0], name: item[1], surname: item[2], email: item[3]})
                                        }
                                        // Zone
                                        else if (name === "zone") {
                                            setElem({idZone: item[0], nameZone: item[1]})
                                        }
                                        // Activity
                                        else if (name === "activity") {
                                            setElem({idActivity: item[0], nameActivity: item[1], type: item[2]})
                                        }
                                    }}>🔄</Button>
                                </div>
                            } </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    header: {
        "margin": "30px",
        "margin-bottom": "30px",
        "text-align": "center"
    },
    page: {
        "backgroundColor": "#E6E6E6",
        "border-radius": "30px",
    },
    title: {
        "padding": "30px",
        "padding-bottom": "0px",
        "text-align": "center"
    },
    main: {
        "display": "flex",
        "flex-direction": "column",
        "padding": "30px",
    },
    list: {
        "margin": "30px",
        "display": "flex",
        'flex-wrap': 'wrap',
        "justify-content": "center",
    },
    form: {
        "margin": "30px",
        "marginTop": "0px",
        "display": "flex",
        "justify-content": "center",
    },
    element: {
        "backgroundColor": "#FFFFFF",
        "border-radius": "10px",
        "margin": "10px",
        "padding": "10px",
        "text-align": "center"
    },
    button: {
        "margin": "10px"
    }
}

export default Management;
