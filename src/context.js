import React, { useState, useContext, useEffect } from 'react'
import {FaSignInAlt, FaEject, FaLock, FaDeaf, FaSitemap, FaClipboardList} from 'react-icons/fa'

const AppContext = React.createContext()

const subMenuItems = [
  {
    page: 'visitor',
    links: [
      { label: 'sign in', icon: <FaSignInAlt />, url: '/signin'},
      { label: 'sign up', icon: <FaEject />, url: '/signup'},
    ]
  },
  {
    page: 'signed',
    links: [
      { label: 'change password', icon: <FaLock />, url: '/reset'},
      { label: 'sign out', icon: <FaDeaf />, url: '/signout'},
    ]
  },
  {
    page: 'passbook',
    links: [
      { label: 'map view', icon: <FaSitemap />, url: '/map_view'},
      { label: 'list view', icon: <FaClipboardList />, url: '/list_view'},
    ]
  }
]

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    logged: false, 
    username: 'default username', 
    uid: -1});
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuLocation, setSubMenuLocation] = useState({});
  const [subMenuContent, setSubMenuContent] = useState({page: '123', links:[]});
  const [userPassbook, setUserPassbook] = useState({});

  const openSubMenu = (category, location) => {
    const content_ = subMenuItems.find((item) => item.page === category);
    setSubMenuContent(content_);
    setSubMenuLocation(location);
    setIsSubMenuOpen(true);
  }

  const closeSubMenu = () => {
    setIsSubMenuOpen(false);
  }

  return <AppContext.Provider 
      value={{userInfo, isSubMenuOpen, subMenuLocation, subMenuContent, userPassbook,
        setUserPassbook, setUserInfo, setSubMenuLocation, setSubMenuContent, 
        openSubMenu, closeSubMenu}}>
        {children}
    </AppContext.Provider>
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider }
