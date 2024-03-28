import { useEffect, useState } from "react";

import { Header } from "./components/header/Header";
import { Honeycomb } from "./components/honeycomb/Honeycomb";
import { Guess } from "./components/guess/Guess";
import { CorrectGuesses } from "./components/correctGuesses/CorrectGuesses";
import { Score } from "./components/score/Score";
import { Message } from "./components/message/Message";

import "./App.css";

function App() {
  const [data, setData] = useState();
  const [guess, setGuess] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [message, setMessage] = useState(null);

  const addLetter = (letter) => {
    setGuess((g) => g + letter);
  };

  const removeLetter = (letter) => {
    setGuess(guess.slice(0, -1));
  };

  const checkGuess = () => {
    if (correctGuesses && correctGuesses.includes(guess)) {
      setMessage("Word is already found.");
    } else if (data.answers && data.answers.includes(guess)) {
      addCorrectGuess(guess);
      if (data.pangrams.includes(guess)) {
        setMessage("Great job! You found a pangram word.");
      } else {
        setMessage("Good job! You found a word.");
      }
    } else {
      if (guess.length < 4) {
        setMessage("Word needs to contain 4 letters or more.");
      } else if (!guess.toLowerCase().includes("b")) {
        setMessage("Seems like word doesn't contain letter B.");
      } else {
        setMessage("Ops. Wrong word.");
      }
    }
    setGuess("");
  };

  const addCorrectGuess = () => {
    setCorrectGuesses([...(correctGuesses || []), guess]);
    localStorage.setItem("correctGuesses", [...(correctGuesses || []), guess]);
  };

  async function fetchData() {
    const result = await fetch("/api/data.json", {
      headers: { "Content-Type": "application/json" },
    });

    const json = await result.json();
    setData(json.data.today);
  }

  useEffect(() => {
    console.log("correctGuesses", localStorage.getItem("correctGuesses"));
    setCorrectGuesses(
      localStorage.getItem("correctGuesses") &&
        localStorage.getItem("correctGuesses").split(",")
    );
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Header />
          <section className="score-correct-guesses">
            <Score correctGuesses={correctGuesses} pangrams={data.pangrams} />
            <CorrectGuesses correctGuesses={correctGuesses} />
          </section>
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess
                  guess={guess}
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                />
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  validLetters={data.validLetters}
                  addLetter={addLetter}
                  removeLetter={removeLetter}
                  checkGuess={checkGuess}
                />
              </div>
            </div>
          </section>
          <div className="info-wrapper">
            <p className="info-title">Info</p>
            <p className={"date"}>Date: {data.displayDate}</p>
            <p className={"editor"}>Editor: {data.editor}</p>
          </div>
          {message && <Message text={message} setMessage={setMessage} />}
        </>
      ) : (
        <p>...Loading</p>
      )}
    </>
  );
}

export default App;
