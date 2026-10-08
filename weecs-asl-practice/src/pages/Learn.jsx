import '../styling/learn.css'
import NavBar from '../components/NavBar'
import LetterCard from '../components/LetterCard'


function Learn()
{

    const lettersArr = ['B', 'C'];

   return(

    <main>
        <NavBar/>
        <h1>LEARN</h1>

        <p>click a card to learn more!</p>

        {/* cards for each letter */}
        <div>
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