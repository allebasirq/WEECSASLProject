//header with links to pages project title(home), learn, practice, progress

export default function NavBar()
{

    return (

        // LINKS ARE PLACEHOLDERS FOR NOW
        <nav class = "nav-bar">
            {/* home page, will be the title */}
            <a href="/">Title</a>

            <ul>
                {/* learn page , practice page, progress page, */}
                <li><a href="/learn">Learn</a></li>
                <li><a href="/practice">Practice</a></li>
                <li><a href="/about">Progress</a></li>
            </ul>
        </nav>
    );
}