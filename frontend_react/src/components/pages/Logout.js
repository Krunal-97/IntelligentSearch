import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Logout() {
  const [val, setVal] = useContext(UserContext);

  // sessionStorage.removeItem("token");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("userName");

  useEffect(() => {
    setVal(sessionStorage.removeItem("token"));
  }, [val, setVal]);
  return (
    <div>
      <h1>You have logged out</h1>
    </div>
  );
}

export default Logout;
