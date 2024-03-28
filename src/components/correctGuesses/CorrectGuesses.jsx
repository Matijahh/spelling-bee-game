import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export function CorrectGuesses({ correctGuesses }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGuesses = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeGuesses = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <section className="correct-guesses">
      {isOpen ? (
        <ul>
          {correctGuesses &&
            correctGuesses.map((g) => (
              <li key={g} className="open-guesses-item">
                {g}
              </li>
            ))}
        </ul>
      ) : (
        <p>{(correctGuesses && correctGuesses.length) || 0} words found.</p>
      )}
      {isOpen ? (
        <a className="openclose" href="#" onClick={closeGuesses}>
          <FontAwesomeIcon
            icon={faCircleArrowUp}
            size="2x"
            className="openclose-icon"
          />
        </a>
      ) : correctGuesses && correctGuesses.length > 0 ? (
        <a className="openclose" href="#" onClick={openGuesses}>
          <FontAwesomeIcon
            icon={faCircleArrowDown}
            size="2x"
            className="openclose-icon"
          />
        </a>
      ) : null}
    </section>
  );
}
