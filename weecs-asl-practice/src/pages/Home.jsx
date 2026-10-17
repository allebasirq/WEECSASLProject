import '../styling/home.css'
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

  const letterModules = import.meta.glob(
    "../assets/letterimg/*",
    { eager: true, query: "?url", import: "default" }
);

 // [["../assets/letterimg/a.png", url], ...] sorted so the order is A to Z
const letters = Object.entries(letterModules)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, url]) => ({ url, name: path.split('/').pop().split('.')[0] }));
  

function Home()
{

    const [flash, setFlash] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setFlash((prev) => (prev + 1) % letters.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

   return(

    <main>
        <NavBar/>
        
        <div class = "home-container">
        <h1 id="home-title">Welcome To [project name]</h1>

        <div id="description">
            <div className="image-box">
                <img
                    key={flash}
                    src={letters[flash].url}
                    alt={`ASL sign for ${letters[flash].name}`}
                />
            </div>
            <p id="home-stars">✦✦✦</p>
            <p id="description-text">[namename] can help you learn ASL in a fun and immersive way. 
                Click learn and check out various tips and tricks to signing the alphabet.
                Hit the practice button once you feel ready to test yourself.
            </p>
        </div>

        <div>
            <Button/>

        </div>
        </div>
        <p class="extra-home">Duolingo but better.</p>
    </main>

    );
}

function Button() {

    function handleClick()
    {
        
    }

  return (
    <button class = "home-button" onClick={handleClick}>
      <Link  to="/learn">Learn</Link>
    </button>
  );
}

export default Home