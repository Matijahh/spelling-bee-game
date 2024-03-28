export function Score({ correctGuesses, pangrams }) {
  let score = 0;
  correctGuesses &&
    correctGuesses.map((g) => {
      if (g.length === 4) {
        score++;
      } else if (pangrams.includes(g)) {
        score = score + g.length + 7;
      } else {
        score = score + g.length;
      }
    });

  return <p className="score">Score: {score}</p>;
}
