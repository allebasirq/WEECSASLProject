import { useState } from "react";

// letter cards for the learn page 
export default function LetterCard({currLetter})
{
    const letters = import.meta.glob(
        "../assets/letterimg/*",
        { eager: true, query: "?url", import: "default" }
    );

    const [selected, setSelected] = useState(false);

    function handleClick(state)
    {
        setSelected(state);

    }   

    const {letter} = currLetter;
    const {practice} = currLetter;


    return(
        <div>
            <div class = "letter-learn-card" onClick={() => handleClick(true)}>
                <h2 id = "letter-piece">{letter}</h2>
                <img src={letters[`../assets/letterimg/letter${letter}.png`]}></img>
            </div>
            {selected && (
                <div class = "big-card-container">
                    <div class = "letter-big-card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleClick(false)}> X
                        </button>
                        <h2>HEKOOO {letter} </h2>
                        <h2>avialable for practice {practice ? "yes" : "no"} </h2>
                    </div>
                </div>
            )}
        </div>
    );
}

