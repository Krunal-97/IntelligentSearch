import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import signin from "../../images/signin.PNG";

function Signup() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("message:", password);
    console.log(role);
    const user = {
      name: name,
      email: email,
      role: role,
      password: password,
    };
    // console.log(user);

    axios
      .post("http://127.0.0.1:5000/api/user/signup", user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        console.log(res.data.user);
      })
      .then(navigate("/log-in"))
      .catch((err) => console.log(err));

    // fetch("http://127.0.0.1:5000/user/signup", {
    //   method: "POST",
    //   redirect: "manual",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  return (
    <form onSubmit={handleSubmit} className="form_container">
      <div className="form_left_side">
        <h3>Sign In</h3>
        <img src={signin}></img>
      </div>
      <div className="form_right_side">
        <div className="form_field">
          {/* <label htmlFor="name">Name: </label> */}
          <input
            id="name"
            type="text"
            placeholder="Enter your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="radio" className="form_field">
          <label className="radio_label">
            <input
              type="radio"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <span>Admin</span>
          </label>
        </div>
        <div className="radio" className="form_field">
          <label className="radio_label">
            <input
              type="radio"
              value="RegularUser"
              checked={role === "RegularUser"}
              onChange={(e) => setRole(e.target.value)}
            />
            <span>Regular User</span>
          </label>
        </div>

        <div className="radio" className="form_field">
          <label className="radio_label">
            <input
              type="radio"
              value="PremiumUser"
              checked={role === "PremiumUser"}
              onChange={(e) => setRole(e.target.value)}
            />
            <span>Premium User</span>
          </label>
        </div>

        <div className="form_field">
          {/* <label htmlFor="email">Email: </label> */}
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_field">
          {/* <label htmlFor="password">Password: </label> */}
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form_field">
          <button type="submit">Submit</button>
          <div>{user}</div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
