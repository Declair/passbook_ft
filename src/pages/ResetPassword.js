import React from 'react'
import {useHistory, useLocation} from "react-router-dom"
import {FaKey} from 'react-icons/fa'

function ResetPassword() {
  const history = useHistory();
  const location = useLocation();

  console.log(location.state.username)

  const checkIsMatch = () => {
    const p1 = document.getElementById("password").value;
    const p2 = document.getElementById("repeatPassword").value;
    if(p1 === p2) {
      document.getElementById("resetPassword").disabled = false;
    }
    else {
      document.getElementById("resetPassword").disabled = true;
    }
  }

  const doResetPassword = (e) => {
    e.preventDefault();
    const usernameForParam = location.state.username;
    const password = document.getElementById("password").value;
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/updateInfo',
      data:{
        opcode: 1,  // code of reset password
        username: usernameForParam,
        password: password,
        question: "nothing",
        answer: "nothing"
      }
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

  const doCancel = (e) => {
    e.preventDefault();
    history.push('/signin');
  }

  return <section className="section">
    <div className="form-box">
      <h2>Resty Password</h2>
      <form onSubmit={doResetPassword}>
        <div className="form-item">
          <label><FaKey/></label>
          <input type="password" id="password" placeholder="password" />
        </div>
        <div className="form-item">
          <label><FaKey/></label>
          <input type="password" id="repeatPassword" placeholder="repeat password"
            onChange={checkIsMatch} />
        </div>
        <button type="submit" id="resetPassword" >Reset Password</button>
        <button onClick={doCancel} >Cancel</button>
      </form>
    </div>
  </section>
}

export default ResetPassword;