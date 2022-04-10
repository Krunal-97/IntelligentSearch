import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userType");
  sessionStorage.removeItem("userName");
  return <div>You have logged out</div>;
}

export default Logout;
