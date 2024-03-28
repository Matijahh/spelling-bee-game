import { useState } from "react";
import { Letter } from "../letter/Letter";

export function Honeycomb({
  centerLetter,
  outerLetters,
  validLetters,
  addLetter,
  removeLetter,
  checkGuess,
}) {
  const [randomArray, setRandomArray] = useState([0, 1, 2, 3, 4, 5]);

  const shuffle = () => {
    setRandomArray([...randomArray].sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <article className="honeycomb">
        <Letter letter={centerLetter} addLetter={addLetter} isCenter={true} />
        {randomArray.map((index) => {
          return (
            <Letter
              key={index}
              addLetter={addLetter}
              letter={outerLetters[randomArray[index]]}
              isCenter={false}
            />
          );
        })}
      </article>
      <section className="buttons">
        <button className="button" onClick={removeLetter}>
          Delete
        </button>
        <button className="button" onClick={shuffle}>
          Shuffle
        </button>
        <button className="button" onClick={checkGuess}>
          Enter
        </button>
      </section>
    </>
  );
}
