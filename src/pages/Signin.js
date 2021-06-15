import React, {useRef} from 'react'
import {useHistory} from "react-router-dom"
import {FaUserAlt, FaKey} from 'react-icons/fa'
import {useGlobalContext} from '../context'
import qs from 'qs'

function Signin() {

  const {setUserInfo} = useGlobalContext();

  const history = useHistory();

  const inputUsername = useRef(null);
  const inputPassword = useRef(null);

  const doSignin = (e) => {
    e.preventDefault();
    const username = inputUsername.current.value
    const password = inputPassword.current.value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/login',
      data: qs.stringify({username, password})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code !== 100) {
        alert(data.msg);
      }
      else {
        setUserInfo({logged: true, 
          username: data.username, 
          question: data.question})
        history.push('/')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const gotoSignup = (e) => {
    e.preventDefault();
    history.push('/signup');
  }

  const gotoForgetPassword = (e) => {
    e.preventDefault();
    history.push('/forget');
  }

  return <section className="section">
    <div className="form-box">
      <h2>Sign in</h2>
      <form onSubmit={doSignin}>
        <div className="form-item">
          <label><FaUserAlt/></label>
          <input type="text" ref={inputUsername} placeholder="username" autoComplete="false" />
        </div>
        <div className="form-item">
          <label><FaKey/></label>
          <input type="password" ref={inputPassword} placeholder="password"/>
        </div>
        <button type="submit">Sign in</button>
        <button onClick={gotoSignup} >Sign up</button>
        <br/>
        <button onClick={gotoForgetPassword}>Forget Password</button>
      </form>
    </div>
  </section>
}

export default Signin;