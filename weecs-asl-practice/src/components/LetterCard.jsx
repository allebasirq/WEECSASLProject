import { useState } from "react";

// letter cards for the learn page 
export default function LetterCard({letter})
{
    const letters = import.meta.glob(
        "../assets/letterimg/*",
        { eager: true, query: "?url", import: "default" }
    );

    return(
        <div class="letter-card-container">
            <div class = "letter-card">
                <h2 id = "letter-piece">{letter}</h2>
                <img src={letters[`../assets/letterimg/letter${letter}.png`]}></img>
            </div>
        </div>
    );
}