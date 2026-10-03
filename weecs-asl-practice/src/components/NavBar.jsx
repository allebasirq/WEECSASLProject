//header with links to pages project title(home), learn, practice, progress

import { Link } from 'react-router-dom'

export default function NavBar()
{

    return (

        <nav class = "nav-bar">

            <Link id ="bar-title" to="/">Home</Link>
            <div class = "bar-link">
                <Link  to="/learn">Learn</Link>
                <Link  to="/practice">Practice</Link>
                <Link  to="/progress">Progress</Link>
            </div>

        </nav>
    );
}