import { Link, Outlet } from 'react-router-dom'
import './rootLayout.css'

const RootLayout = () => {
  return (
    <div className='rootLayout'>
        <header>
            <Link to="/">
                <img src={"/logo.png"} alt=''></img>
                <span>FilmSpace</span>
            </Link>
            <div className="user">User</div>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout