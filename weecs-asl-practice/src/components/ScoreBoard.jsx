//score, streak (optional), feedback, round you're on
import { POINTS_PER_CORRECT_ANSWER } from '../game/gameLogic'

function ScoreBoard({
  score,
  streak,
  round,
  totalRounds,
  feedback,
  roundCompleted
}) {
  return (
    <div className="scoreboard">
      <p>Score: {score} / {totalRounds * POINTS_PER_CORRECT_ANSWER}</p>

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