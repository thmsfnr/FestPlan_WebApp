
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { createType, updateType } from "../services/type.service";
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

  Object.entries(fields).map(([key, value]) => (
    elem[key] = value
  ))

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
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={elem}
          onSubmit={(values) => {
            Object.entries(values).map(([key, value]) => {
              elem[key] = value;
            });
            handleAction();
          }}
        >
          {/* Form for the creation or the update of an element */}
          <Form>
            {/* Title of the form */}
            <h3>{action}</h3>
            {/* Fields of the form */}
            <div className="form-group">
              {/* if the key dont start with id */}
                {Object.keys(elem).filter(key => !key.startsWith("id")).map(key => (
                  <>
                  <label htmlFor={key}>{key}</label>
                  <Field name={key} type="text" className="form-control" />
                  <ErrorMessage
                    name={key}
                    component="div"
                    className="alert alert-danger" />
                  </>
                ))}
            </div>
            {/* Button to submit the form */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Valider</span>
              </button>
            </div>
            {/* Message to display if there is an error */}
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {}

export default CreationForm;
