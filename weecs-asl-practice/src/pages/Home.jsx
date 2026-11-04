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
  

function pickRandom(n) {
    const arr = [...letters];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
}

function Home()
{


    const [round, setRound] = useState(0);
    const [shown, setShown] = useState(() => pickRandom(3));


     useEffect(() => {
        const id = setInterval(() => {
            setShown(pickRandom(3));
            setRound((r) => r + 1);

        }, 4000);
        return () => clearInterval(id);
    }, []);


   return(

    <main>
        <NavBar/>
        
    <div class="bigger-container">
        <div class = "home-container">
        <h1 id="home-title">Welcome To WEECS ASL</h1>

        <div id="description">
             <div className="image-row">
                        {shown.map((letter) => (
                            <div className="image-box" key={`${round}-${letter.name}`}>
                                <img
                                    src={letter.url}
                                    alt={`ASL sign for ${letter.name}`}
                                />
                            </div>
                        ))}
                    </div>
            <p id="home-stars">✦✦✦</p>
            <p id="description-text">WEECS ASL can help you learn ASL in a fun and immersive way. 
                Click learn and check out various tips and tricks to signing the alphabet.
                Hit the practice button once you feel ready to test yourself.
            </p>
        </div>

        <div>
            <Button/>

        </div>
        <p class="extra-home">Duolingo but better.</p>
        </div>

        <div class = "references">
            <h2>References</h2>
            <p>Want to learn more? Feel free to check out the references used below</p>
            <ul>
                <li>pic</li>
                <li>tips</li>
                <li>training</li>
                <li>dataset</li>
            </ul>
        </div>
    </div>
        
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