import React, { useState } from "react";
import axios from "axios";
import "../../styles/search.css";
import { Howl } from "howler";
import HashLoader from "react-spinners/HashLoader";
import myaudio from "../../assets/audio.mp3";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");
  const userName = sessionStorage.getItem("userName");

  const my_audio = new Howl({
    src: [myaudio],
    html5: true,
  });

  const texttospeech = () => {
    my_audio.play();
  };

  const texttospeechStop = () => {
    my_audio.stop();
  };
  function handleSubmit(event) {
    event.preventDefault();

    const searchQues = {
      ques: searchValue,
    };

    console.log(searchQues);

    axios
      .post("http://127.0.0.1:5000/api/user/predict", searchQues)
      .then(setLoading(true))
      .then((res) => {
        console.log(res);
        setAnswer(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search_form_container">
        <div className="head_text">
          <h3>Hi, {userName}, what do you want to search?</h3>
        </div>
        <div className="search_input">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="🔍 Search"
            size="100"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Get the Result</button>
        </div>

        {loading ? (
          <center>
            <div className="loadingBar">
              <HashLoader color="#e07a5f" size={80} loading={loading} />
            </div>
          </center>
        ) : (
          <div className="ans">
            <h3>
              <span>Answer:</span> {answer}
            </h3>
          </div>
        )}
      </form>

      {userType == "PremiumUser" ? (
        <center>
          <button className="speechBtn" onClick={texttospeech}>
            Text to Speech 🎙️
          </button>
          <button className="speechBtn" onClick={texttospeechStop}>
            Stop
          </button>
        </center>
      ) : (
        ""
      )}
    </div>
  );
}

export default Search;
