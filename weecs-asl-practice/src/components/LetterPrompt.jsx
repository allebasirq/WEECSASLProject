//displays asking user to sign letter and letter from prop
import '../styling/practice.css'


export default function LetterPrompt({letter, gameState})
{
    return(
        <div class="letter-card">
        {(gameState.status === "completed" || gameState.status ==="not_started") && (
              <h2 id="start-title">Press Start</h2>
            )}
        {(gameState.status === "active" || gameState.status === "paused") && (
              <h2 id="letter-display">{letter}</h2>
            )}
        {(!gameState.roundCompleted && (gameState.status === "active" || gameState.status === "paused")) && (
              <p>Sign the letter above.</p>
            )}
        {gameState.roundCompleted && (
              <p class = "signed-correct">Correct !!!</p>
            )}
        </div>
    );
}