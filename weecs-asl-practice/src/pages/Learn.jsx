import '../styling/learn.css'
import NavBar from '../components/NavBar'
import LetterCard from '../components/LetterCard'


function Learn()
{

    const lettersArr = [
       {
        letter: "A",
        practice: false,
        message: "Closed fist, thumb rests beside the curled index finger. Keep the thumb visible instead of hiding it behind the fingers.",
       },
       {
        letter: "B",
        practice: true,
        message: "Flat hand, fingers together and pointing up, thumb tucked across the palm. Avoid spreading the fingers or letting the thumb stick out.",
       },
       {
        letter: "C",
        practice: true,
        message: "Curved hand forming a clear C shape with the palm turned slightly forward. Leave enough space inside the curve so it does not collapse into O.",

       },
       {
        letter: "D",
        practice: false,
        message: "Index finger points up while the other fingertips meet the thumb. Think of a tall pointer above a small circle.",
        
       },
       {
        letter: "E",
        practice: false,
         message: "Fingertips fold toward the palm with the thumb tucked in front. Keep the hand compact instead of flattening it into an open shape.",
       
       },
        {
        letter: "F",
        practice: true,
        message: "Thumb and index finger form a circle while the other three fingers point up. Make the circle obvious so it does not resemble D.",

       },  
       {
        letter: "G",
        practice: false,
        message: "Index finger and thumb extend sideways in parallel, close together. Keep the hand horizontal instead of letting it tilt down.",
       
       },
       {
        letter: "H",
        practice: false,
        message: "Index and middle fingers extend together sideways, other fingers folded. Keep the two extended fingers aligned rather than splitting into V.",

       },
       {
        letter: "I",
        practice: false,
        message: "Pinky points up while the other fingers stay in a fist. Show one clear pinky line and keep the rest of the hand compact.",

       },
       {
        letter: "J",
        practice: false,
        message: "MOTION: Starts like I, then the pinky traces a J shape in the air. The path matters more than the starting pose.",
   
       },
       {
        letter: "K",
        practice: false,
        message: "Index and middle fingers point up in a V while the thumb rests between them. Keep the hand upright so it does not drift into P.",

       },
       {
        letter: "L",
        practice: true,
        message: "Index finger points up and thumb extends sideways to form an L. Keep the angle open and crisp rather than curling either line.",

       },
       {
        letter: "M",
        practice: false,
        message: "Three fingers fold over the thumb with the palm angled down or forward. The thumb should sit under three fingers, not two.",

       },
       {
        letter: "N",
        practice: false,
        message: "Two fingers fold over the thumb with the palm angled down or forward. Count two fingers over the thumb, not three like M.",
 
       },
       {
        letter: "O",
        practice: true,
        message: "All fingertips meet the thumb to form a clean round O. Make the shape round instead of collapsing it into a loose pinch.",

       },
       {
        letter: "P",
        practice: false,
        message: "Same base handshape as K, but tilted downward. Think of K rotated toward the floor.",

       },
       {
        letter: "Q",
        practice: false,
        message: "Same base handshape as G, but the fingers point downward. Let the direction do the work; the tilt is the key difference.",

       },
       {
        letter: "R",
        practice: false,
        message: "Index and middle fingers cross (middle over index) while pointing up. Keep the crossed fingers clear and avoid flattening into U.",

       },
       {
        letter: "S",
        practice: false,
        message: "Tight fist with the thumb crossing in front of the fingers. The thumb should stay across the front, not tucked away.",

       },
       {
        letter: "T",
        practice: false,
        message: "Thumb sits between the index and middle finger in a fist. Only a small part of the thumb should show.",

       },
       {
        letter: "U",
        practice: false,
        message: "Index and middle fingers point up together, side by side. Keep the two fingers close together instead of splitting them apart.",

       },
       {
        letter: "V",
        practice: true,
        message: "Index and middle fingers point up in a spread V shape. Open the gap clearly so it does not read as U.",

       },
       {
        letter: "W",
        practice: false,
        message: "Index, middle, and ring-3 fingers spread upward. Use three clear points and keep the thumb folded.",
    
       },
       {
        letter: "X",
        practice: false,
          message: "Index finger bends into a hook while the rest of the hand stays in a fist. The hooked index finger is the whole signal; keep it obvious.",
      
       },
       {
        letter: "Y",
        practice: true,
        message: "Thumb and pinky extend outward while the middle fingers stay folded. Stretch the two outer points cleanly without opening the whole hand.",

       },
       {
        letter: "Z",
        practice: false,
        message: "MOTION: Index finger points out and draws a Z shape in the air. Motion is crucial.",
       
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
        <p>TIP: Try to comfortably make your palm face the person you're signing to !</p>
        

        <p>Click a card to read more detailed descriptions !!</p>
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