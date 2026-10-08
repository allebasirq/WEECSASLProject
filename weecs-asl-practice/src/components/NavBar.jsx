//header with links to pages project title(home), learn, practice, progress

import { NavLink } from 'react-router-dom'
import hero from "../assets/hero.png"
export default function NavBar()
{

    return (

        <nav class = "nav-bar">

            <NavLink id ="bar-title" to="/">
              <img src={hero} alt="Home" className="nav-logo" />
            </NavLink>
            <div class = "bar-link">
                <NavLink  to="/learn">Learn</NavLink>
                <NavLink  to="/practice">Practice</NavLink>
                <NavLink  to="/progress">Progress</NavLink>
            </div>

        </nav>
    );
}