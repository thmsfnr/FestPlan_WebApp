
import React, { useState, useEffect } from "react";

import { getPublicContent } from "../services/test.service";
import { getZone } from "../services/zone.service";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        //setContent(_content);
      }
    );
    getZone().then(
      (response) => {
        setContent(response);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
