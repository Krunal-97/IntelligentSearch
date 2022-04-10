import React, { useContext, useEffect, useState } from "react";
import homeImg from "../../images/homeImg.PNG";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

function Home() {
  const val = useContext(UserContext);
  return (
    <div>
      <div className="main-container">
        <div className="main-left-container">
          <div className="left-text">
            <h3>The most Personalized Search-Engine Ever!</h3>
          </div>

          <div className="main-left-button-container">
            <button>
              <Link to="/sign-up" className="home_btn_link">
                Sign In
              </Link>
            </button>
            <button>
              <Link to="/log-in" className="home_btn_link">
                Log In
              </Link>
            </button>
          </div>

          <div className="main-bottom-text">
            <h3>Made with ❤️ in Canada</h3>
          </div>
        </div>

        <div className="main-right-container">
          <img src={homeImg}></img>
        </div>
      </div>

      <div className="home-info-container">
        <div className="home-info-card">
          <div className="home-info-image">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="home-info-text">
            <h3>Easy to Search 👨‍💻</h3>
          </div>
        </div>

        <div className="home-info-card">
          <div className="home-info-image">
            <i class="fa-brands fa-searchengin"></i>
          </div>
          <div className="home-info-text">
            <h3>Fast to Retrive ⚡</h3>
          </div>
        </div>

        <div className="home-info-card">
          <div className="home-info-image">
            <i class="fa-solid fa-microphone"></i>
          </div>
          <div className="home-info-text">
            <h3>Text to Voice 🎙️</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
