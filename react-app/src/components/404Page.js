import React from "react";
import { useHistory } from "react-router-dom";

function PageNotFound() {
  const history = useHistory();
  return (
    <div className="page__not__found__background">
      <div className="NotFound"></div>
      <button onClick={() => history.push("/home")}>Go Back</button>
    </div>
  );
}

export default PageNotFound;
