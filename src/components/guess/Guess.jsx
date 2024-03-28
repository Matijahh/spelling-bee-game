export function Guess({ guess, centerLetter, outerLetters }) {
  return (
    <section className="guess">
      {guess.length > 0 && (
        <p className="guess-letters">
          {guess.split("").map((l, index) => (
            <b
              key={index}
              className={
                "guess-letter " +
                (l === centerLetter
                  ? "guess-center"
                  : outerLetters.includes(l)
                  ? "guess-outer"
                  : null)
              }
            >
              {l}
            </b>
          ))}
        </p>
      )}
    </section>
  );
}
