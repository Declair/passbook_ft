import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../default.svg'
import {useGlobalContext} from '../context'

function NavBar() {
  const {openSubMenu, closeSubMenu, userInfo} = useGlobalContext();
  const {logged, username} = userInfo;

  const displaySubmenu = (e) => {
    const tempText = e.target.textContent;
    const tempRect = e.target.getBoundingClientRect();  // get the location
    const center = (tempRect.left + tempRect.right) / 2;
    const top = tempRect.bottom + 3;

    // define category to show corect submenu items
    // choose from [visitor, signed, passbook]
    var category = '';
    if(tempText === 'Passbook') {
      category = 'passbook';
    }
    else {
      if(!logged) {
        category = 'visitor';
      }
      else{
        category = 'signed';
      }
    }
    
    openSubMenu(category, {center, top});
  }

  return (
    <nav className="navbar" onClick={closeSubMenu} >
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="cocktail" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" onMouseOver={closeSubMenu}>Home</Link>
            <Link to="/" onMouseOver={displaySubmenu}>Passbook</Link>
            {/* if the text changed, ref in displaySubmenu() also needs to change  */}
            {
              logged ? <Link to="/" onMouseOver={displaySubmenu}>{username}</Link> :
              <Link to="/" onMouseOver={displaySubmenu}>Visitor</Link>
            }
            
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;