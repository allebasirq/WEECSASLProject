import '../styling/home.css'
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom'



function Home()
{
   return(

    <main>
        <NavBar/>
        
        <h1>Welcome To [project name]</h1>

        <div id="description">
            <p>[place holder for an image]</p>
            <p>DescriptionThis website is dedicated to help you learn ASL better
                (more description and explanation)</p>
        </div>

        <div>
            <Button/>

        </div>
    </main>

    );
}

function Button() {

    function handleClick()
    {
        
    }

  return (
    <button onClick={handleClick}>
      <Link  to="/learn">Learn</Link>
    </button>
  );
}

export default Home