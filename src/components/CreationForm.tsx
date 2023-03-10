
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { createType, updateType, getType } from "../services/type.service";
import { createVolunteer, updateVolunteer } from "../services/volunteer.service";
import { createZone, updateZone } from "../services/zone.service";
import { createActivity, updateActivity } from "../services/activity.service";

/**
 * Props of the component
 */
type Props = {
  parent: () => void
  name: string;
  fields: { [key: string]: any };
  action: string;
}

/**
 * Component for the creation and the update of a type, a volunteer, a zone or an activity
 * @param parent A function to inform the parent component that the creation or the update is done
 * @param name The name of the element to create or update
 * @param fields The fields of the element to create or update
 * @param action The action to do (create or update)
 */
const CreationForm: React.FC<Props> = ({ parent, name, fields, action }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [elem] = useState<Record<string, any>>({});
  const [types, setTypes] = useState<any[]>([]);

  Object.entries(fields).map(([key, value]) => (
    elem[key] = value
  ))

  useEffect(() => {
    if (name === "activity") {
      getType().then(
        (response) => {
          setTypes(response);
        },
        (error) => {
          window.location.reload();
        }
      );
    }
  }, [name]);

  /**
   * Manage the error of the creation or the update
   * @param error The error to manage
   * @returns Set the message and the loading
   */
  const manageError = (error: any) => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    setLoading(false);
    setMessage(resMessage);
  }

  /**
   * Choose the function to call according to the action
   * @returns Call the function to create or update the element
  */
  const handleAction = () => {
    // To update an element
    if (action === "update") {
      handleUpdate();
    }
    // To create an element
    else if (action === "create") {
      handleCreate();
    }
  }

  /**
   * Handle the creation
   * @returns Inform the parent component that the creation is done or manage the error
   */
  const handleCreate = () => {
    // Type
    if (name === "type") {
      createType(elem.nameType).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      );
    }
    // Volunteer
    else if (name === "volunteer") {
      createVolunteer(elem.name, elem.surname, elem.email).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
    // Zone
    else if (name === "zone") {
      createZone(elem.nameZone).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
    // Activity
    else if (name === "activity") {
      createActivity(elem.nameActivity, elem.type).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
  }

  /**
   * Handle the update
   * @returns Inform the parent component that the update is done or manage the error
   */
  const handleUpdate = () => {
    // Type
    if (name === "type") {
      updateType(elem.idType, elem.nameType).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      );
    }
    // Volunteer
    else if (name === "volunteer") {
      updateVolunteer(elem.idVolunteer, elem.name, elem.surname, elem.email).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
    // Zone
    else if (name === "zone") {
      updateZone(elem.idZone, elem.nameZone).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
    // Activity
    else if (name === "activity") {
      updateActivity(elem.idActivity, elem.nameActivity, elem.type).then(
        () => {
          parent();
        },
        (error) => {
          manageError(error);
        }
      )
    }
  }

  return (
    <div style={styles.page} className="col-md-12 card card-container">
      <Formik initialValues={elem} onSubmit={(values) => {
        // eslint-disable-next-line
        Object.entries(values).map(([key, value]) => {
          elem[key] = value;
        });
        handleAction();
      }}>
        {/* Form for the creation or the update of an element */}
        <Form>
          {/* Title of the form */}
          <h3>{action.charAt(0).toUpperCase() + action.slice(1)}</h3>
          {/* Fields of the form */}
          <section style={styles.input} className="form-group">
            {/* if the key dont start with id */
            Object.keys(elem).filter(key => !key.startsWith("id")).map(key => (
              <article>{key === "type" ?
                <div>
                  {/* Dropdown of types */}
                  <label htmlFor={key}>{key}</label>
                  <Field as="select" name={key} className="form-control">
                    {types.map((type: any) => (
                      <option value={type.idType}>{type.nameType}</option>
                    ))}
                  </Field>
                  <ErrorMessage name={key} component="div" className="alert alert-danger" />
                </div>
                : 
                <div>
                  <label htmlFor={key}>{key}</label>
                  <Field name={key} type="text" className="form-control" />
                  <ErrorMessage name={key} component="div" className="alert alert-danger" />
                </div>
              }</article>
            ))}
          </section>
          {/* Button to submit the form */}
          <section style={styles.button} className="form-group">
            <button type="submit" className="btn btn-secondary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Valider</span>
            </button>
          </section>
          {/* Message to display if there is an error */
          message && (
            <section className="form-group">
              <article className="alert alert-danger" role="alert">{message}</article>
            </section>
          )}
        </Form>
      </Formik>
    </div>
  );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  page: {
    "marginTop": "10px",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "text-align": "center",
  },
  input: {
    "marginTop": "20px",
  },
  button: {
    "marginTop": "30px",
  }
}

export default CreationForm;
