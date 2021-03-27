import React, { useState, useContext, useEffect } from 'react'
import {FaSignInAlt, FaEject, FaLock, FaDeaf, FaSitemap} from 'react-icons/fa'

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
      { label: 'change password', icon: <FaLock />, url: '/change_password'},
      { label: 'sign out', icon: <FaDeaf />, url: '/signout'},
    ]
  },
  {
    page: 'passbook',
    links: [
      {label: 'map view', icon: <FaSitemap />, url: '/map_view'},
    ]
  }
]

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    logged: false, 
    username: 'NoReservedSeating', 
    question: 'What does my name mean>'});
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuLocation, setSubMenuLocation] = useState({});
  const [subMenuContent, setSubMenuContent] = useState({page: '123', links:[]});

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
      value={{userInfo, isSubMenuOpen, subMenuLocation, subMenuContent,
        setUserInfo, setSubMenuLocation, setSubMenuContent, 
        openSubMenu, closeSubMenu}}>
        {children}
    </AppContext.Provider>
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider }
