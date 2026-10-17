import '../styling/learn.css'
import NavBar from '../components/NavBar'
import LetterCard from '../components/LetterCard'


function Learn()
{

    const lettersArr = [
       {
        letter: "A",
        practice: false,
        
       },
       {
        letter: "B",
        practice: true,
        
       },
       {
        letter: "C",
        practice: true,

       },
       {
        letter: "D",
        practice: false,
        
       },
       {
        letter: "E",
        practice: false,
        
       },
        {
        letter: "F",
        practice: true,

       },  
       {
        letter: "G",
        practice: false,
        
       },
       {
        letter: "H",
        practice: false,
        
       },
       {
        letter: "I",
        practice: false,

       },
       {
        letter: "J",
        practice: false,
        
       },
       {
        letter: "K",
        practice: false,
        
       },
       {
        letter: "L",
        practice: true,

       },
       {
        letter: "M",
        practice: false,
        
       },
       {
        letter: "N",
        practice: false,
        
       },
       {
        letter: "O",
        practice: true,

       },
       {
        letter: "P",
        practice: false,
        
       },
       {
        letter: "Q",
        practice: false,
        
       },
       {
        letter: "R",
        practice: false,
        
       },
       {
        letter: "S",
        practice: false,
        
       },
       {
        letter: "T",
        practice: false,
        
       },
       {
        letter: "U",
        practice: false,
        
       },
       {
        letter: "V",
        practice: true,

       },
       {
        letter: "W",
        practice: false,
        
       },
       {
        letter: "X",
        practice: false,
        
       },
       {
        letter: "Y",
        practice: true,

       },
       {
        letter: "Z",
        practice: false,
        
       },
    ];

    // const [nextLetter, setnextLetter] = useState(false);

    // function goPrev() {
    //     setnextLetter((i) => (i - 1 + letterList.length) % letterList.length);
    // }

    // function goNext() {
    //     setnextLetter((i) => (i + 1) % letterList.length);
    // }
    

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
                    lettersArray={lettersArr}
                />
            ))}
        </div>
        

    </main>

    );
}

export default Learn