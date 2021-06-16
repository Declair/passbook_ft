import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useGlobalContext} from '../context'

function Signout() {
  const {setUserInfo, setUserPassbook} = useGlobalContext();

  const doSignout = () => {
    setUserPassbook({});
    setUserInfo({logged: false, username: 'default username', question: 'default question'});
  }

  useEffect(()=> {
    doSignout();
  }, []);

  return <section className="section">
    <h2>You have successfully signed out.</h2>
    <Link to='/'>Back to Home</Link>
  </section>
}

export default Signout;