import React, { useState } from "react";
import axios from "axios";
import "../../styles/search.css";
import { Howl } from "howler";

import myaudio from "../../audio.mp3";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [answer, setAnswer] = useState("");

  const my_audio = new Howl({
    src: [myaudio],
    html5: true,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const searchQues = {
      ques: searchValue,
    };

    console.log(searchQues);

    axios
      .post("http://127.0.0.1:5000/api/user/predict", searchQues)
      .then((res) => {
        console.log(res);
        setAnswer(res.data);
        // console.log(res.data.role);
        // console.log(res.data.access_token);
        // sessionStorage.setItem("token", res.data.access_token);
      })
      .catch((err) => console.log(err));
  }

  function texttospeech(event) {
    event.preventDefault();
    axios
      .get("http://127.0.0.1:5000/api/user/texttospeech")
      .then((res) => {
        console.log(res);
        my_audio.play();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="search_form_container">
        <div className="head_text">
          <h3>Hi, [User], what do you want to search?</h3>
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
        <div className="ans">
          <h3>
            <span>Answer:</span> {answer}
          </h3>
        </div>
      </form>
      <button onSubmit={texttospeech} type="submit">
        Text to Speech
      </button>
    </div>
  );
}

export default Search;
