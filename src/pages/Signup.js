import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import {FaUserAlt, FaKey, FaQuestion, FaSignature} from 'react-icons/fa'
import qs from 'qs'

function Signup() {
  const [isMatch, setIsMatch] = useState(true);
  const history = useHistory();

  const checkIsMatch = () => {
    const p1 = document.getElementById("password").value;
    const p2 = document.getElementById("repeatPassword").value;
    if(p1 === p2) {
      document.getElementById("signup").disabled = false;
      setIsMatch(true);
    }
    else {
      document.getElementById("signup").disabled = true;
      setIsMatch(false);
    }
    
  }

  const doSignup = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/userSignUp',
      data: qs.stringify({username, password, question, answer})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code !== 100) {
        alert(data.msg);
      }
      else {
        alert('success')
        history.push('/signin')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return <section className="section">
    <div className="form-box">
      <h2>Sign up</h2>
      <form onSubmit={doSignup}>
        <div className="form-item">
          <label><FaUserAlt/></label>
          <input type="text" id="username" placeholder="username" autoComplete="false" />
        </div>
        <div className="form-item">
          <label><FaKey/></label>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className="form-item">
          <label><FaKey/></label>
          <input type="password" id="repeatPassword" placeholder="repeat password"
            onChange={checkIsMatch} />
        </div>
        <div className="form-item">
          <label><FaQuestion/></label>
          <input type="text" id="question" placeholder="security question" />
        </div>
        <div className="form-item">
          <label><FaSignature/></label>
          <input type="text" id="answer" placeholder="answer" />
        </div>
        <button type="submit" id="signup" >Sign up</button>
      </form>
    </div>
  </section>
}

export default Signup;