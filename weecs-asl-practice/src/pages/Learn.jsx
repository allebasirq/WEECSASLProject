import '../styling/learn.css'
import NavBar from '../components/NavBar'
import LetterCard from '../components/LetterCard'


function Learn()
{

    const lettersArr = ['B', 'C','B', 'C','B', 'C','B', 'C','B', 'C',];

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
                    key={currLetter}
                    letter={currLetter}
                />
            ))}
        </div>
        

    </main>

    );
}

export default Learn