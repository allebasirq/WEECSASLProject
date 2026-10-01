//displays asking user to sign letter and letter from prop

export default function LetterPrompt({letter})
{
    return(
        <div class="letter-card">
        <h2 id="letter-display">{letter}</h2>
        <p>Sign the letter shown above.</p>
        </div>
    );
}