import { useState } from "react";
import { Link } from 'react-router-dom'
import arrowLeft from "../assets/arrowLeft.png"
import arrowRight from "../assets/arrowRight.png"



// letter cards for the learn page 
export default function LetterCard({currLetter, lettersArray})
{
    const letters = import.meta.glob(
        "../assets/letterimg/*",
        { eager: true, query: "?url", import: "default" }
    );

    const [selected, setSelected] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(
        lettersArray.findIndex((item) => item.letter === currLetter.letter)
    );

    const currentLetter = lettersArray[currentIndex];

    function handleClick(state)
    {
        setSelected(state);

    }   

    function handleArrow(mode)
    {
        setCurrentIndex((prevIndex) =>
        {
            if(mode == 1)
            {
                return (prevIndex - 1 + lettersArray.length) % lettersArray.length;
            }
            if(mode == 2)
            {
                return (prevIndex + 1 ) % lettersArray.length;
            }
        });
    }

    const {letter} = currentLetter;
    const {practice} = currentLetter;


    return(
        <div>
            <div class = "letter-learn-card" onClick={() => handleClick(true)}>
                <h2 id = "letter-piece">{currLetter.letter}</h2>
                <img src={letters[`../assets/letterimg/letter${currLetter.letter}.png`]}></img>
            </div>
            
            {selected && (
                <div class = "big-card-container">
            
                    <img src={arrowLeft} alt="learn button" class="learn-nav-button" onClick={() => handleArrow(1)}/>
                   
                    <div class = "letter-big-card" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleClick(false)}> X
                        </button>
                        <div class="letter-in-card">
                            <h2>HEKOOO {letter} </h2>
                            <img src={letters[`../assets/letterimg/letter${letter}.png`]}></img>
                            <h2>avialable for practice {practice ? "yes" : "no"} avialable for practice
                                avialable for practiceavialable for practiceavialable for practiceavialable for practiceavialable for practiceavialable 
                                avialable for practice
                            </h2>
                            {practice &&  <Button/>}
                        </div>
                        
                    </div>
                    
                    <img src={arrowRight} alt="learn button" class="learn-nav-button" onClick={() => handleArrow(2)}/>
                
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