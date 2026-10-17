import { useState } from "react";
import { Link } from 'react-router-dom'
import arrowLeft from "../assets/arrowLeft.png"
import arrowRight from "../assets/arrowRight.png"



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

    function handleArrow(state)
    {

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
            
                    <img src={arrowLeft} alt="learn button" class="learn-nav-button"/>
                   
                    <div class = "letter-big-card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleClick(false)}> X
                        </button>
                        <h2>HEKOOO {letter} </h2>
                        <h2>avialable for practice {practice ? "yes" : "no"} </h2>
                        {practice &&  <Button/>}
                    </div>
                    
                    <img src={arrowRight} alt="learn button" class="learn-nav-button"/>
                
                </div>
            )}
        </div>
    );
}

function Button() {

    function handleClick()
    {
        
    }

  return (
    <button>
      <Link  to="/practice">Practice</Link>
    </button>
  );
}