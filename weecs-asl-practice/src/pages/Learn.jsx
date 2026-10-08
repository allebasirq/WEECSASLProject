import '../styling/learn.css'
import NavBar from '../components/NavBar'
import LetterCard from '../components/LetterCard'


function Learn()
{

    const lettersArr = [
       {
        letter: "B",
        practice: true,
        
       },
       {
        letter: "C",
        practice: true,

       },
        {
        letter: "F",
        practice: true,

       },  
       {
        letter: "I",
        practice: true,

       },
       {
        letter: "L",
        practice: true,

       },
       {
        letter: "O",
        practice: true,

       },
       {
        letter: "V",
        practice: true,

       },
       {
        letter: "Y",
        practice: true,

       },
    ];

   return(

    <main>
        <NavBar/>
        
        <div class="learn-title">
        <h1>LEARN</h1>

        <p>click a card to learn more!</p>
        </div>

        {/* cards for each letter */}
        <div class="letter-card-container">
            {lettersArr.map((currLetter) => (
                <LetterCard
                    key={currLetter.letter}
                    currLetter={currLetter}
                />
            ))}
        </div>
        

    </main>

    );
}

export default Learn