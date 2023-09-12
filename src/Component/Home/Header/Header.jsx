import React from 'react'
import pngwing from "../../../pngwing.com.png"
import { Link } from 'react-router-dom'
import  search  from '../../../search.png'
const Header = () => {
  return (

    <nav className='header'>
<img src={pngwing} alt='logo'/>
    
    <div>
        <Link to="/tv show">TV SHOW</Link>
        <Link to="/movie">MOVIES</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/list">My List</Link>
        </div>
    <img src={search} alt='search icon'/>  
        </nav>
  )
}

export default Header
