import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
// import useHistory, { Link } from "use-history";
import { useNavigate } from "react-router-dom";
import login from "../../images/login.PNG";
import "../../styles/login.css";
import { UserContext } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");
  const userName = sessionStorage.getItem("userName");
  const navigate = useNavigate();

  const [val, setVal] = useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log("fetch user data start");
      const user = {
        email: email,
        password: password,
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/api/user/login",
        user
      );

      sessionStorage.setItem("token", res.data.access_token);
      sessionStorage.setItem("userType", res.data.role);
      sessionStorage.setItem("userName", res.data.user["name"]);

      const saveToken = () => setVal(res.data.access_token);
      saveToken();

      console.log({ val });
      console.log(sessionStorage.getItem("token"));
      console.log("fetch end");

      let resRole = res.data.role;
      if (resRole === "Admin") {
        navigate("/admindashboard");
      } else if (resRole === "RegularUser") {
        navigate("/search");
      } else if (resRole === "PremiumUser") {
        navigate("/search");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setVal(sessionStorage.getItem("token"));
    console.log({ val });
  }, [val, setVal]);

  return (
    <form onSubmit={handleSubmit} className="login_container">
      <div className="login_left_side">
        <h3>Log In</h3>

        <img src={login}></img>
      </div>

      <div className="login_right_side">
        <div className="form_field">
          <input
            id="email"
            name="email"
            value={email}
            placeholder="Enter your E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form_field">
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form_field">
          <button type="submit">LogIn</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
