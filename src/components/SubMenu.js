import React, {useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useGlobalContext} from '../context'

function SubMenu() {
  const {isSubMenuOpen, subMenuLocation, subMenuContent} = useGlobalContext();
  const container = useRef(null);

  // change the location of the submenu
  useEffect(()=> {
    const submenu = container.current;
    const {center, top} = subMenuLocation;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${top}px`;
  }, [subMenuLocation, subMenuContent])

  return <aside className={`${isSubMenuOpen?'submenu show':'submenu'}`} ref={container}>
    <div className={`submenu-center`}>
      {subMenuContent.links.map((link, index)=> {
        const {label, icon, url} = link;
        return <Link to={url} key={index} >{icon} &nbsp; {label}</Link>
      })}
    </div>
  </aside>
}

export default SubMenu;