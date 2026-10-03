//score, streak (optional), feedback, round you're on
function ScoreBoard({
  score,
  streak,
  round,
  totalRounds,
  feedback,
  roundCompleted
}) {
  return (
    <div>
      <p>Score: {score}</p>

      <p>Streak: {streak}</p>

      <p>
        Round: {round} / {totalRounds}
      </p>

      <p>Recognized: {feedback}</p>

      {roundCompleted && <p>Game Complete!</p>}
    </div>
  );
}

export default ScoreBoard;