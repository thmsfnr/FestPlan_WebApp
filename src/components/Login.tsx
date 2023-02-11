
import React, { useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";

/**
 * Component for the login
 */
const Login: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Initial values of the form
  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  // Validation of the form
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/admin");
      window.location.reload();
    }
  }, [navigate]);

  /**
   * Manage the login of the user
   * @param formValue The values of the form
   */
  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;
    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/admin");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12">
      <section style={styles.page} className="card card-container">
        {/* Image of the login */}
        <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
        {/* Form for the login */}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
          <Form>
            {/* Username field */}
            <article className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage name="username" component="div" className="alert alert-danger"/>
            </article>
            {/* Password field */}
            <article className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="alert alert-danger"/>
            </article>
            {/* Submit button */}
            <article style={styles.button} className="form-group">
              <button type="submit" className="btn btn-secondary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Valider</span>
              </button>
            </article>
            {/* Message to display if there is an error */}
            {message && (
              <article className="form-group">
                <div className="alert alert-danger" role="alert">{message}</div>
              </article>
            )}
          </Form>
        </Formik>
      </section>
    </div>
  );
};

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  page: {
    "display": "flex",
    "justifyContent": "center",
    "text-align": "center",
  },
  button: {
    "marginTop": "40px",
  }
}

export default Login;
