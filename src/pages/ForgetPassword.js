import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FaUserAlt, FaQuestion, FaSignature} from 'react-icons/fa'
import qs from 'qs'

function ForgetPassword() {

  const [securityQuestion, setSecurityQuestion] = useState('');
  const [usern, setUsern] = useState('');
  const history = useHistory();

  const doGetQuestion = (e) => {
    e.preventDefault();
    const inputUsername = document.getElementById('username').value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/getQuestion',
      data: qs.stringify({username: inputUsername})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code !== 100) {
        alert(data.msg);
      }
      else {
        console.log(data);
        setSecurityQuestion(data.question);
        setUsern(data.username);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const doVerify = (e) => {
    e.preventDefault();
    const answer = document.getElementById('answer').value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/verification',
      data: qs.stringify({username: usern, answer})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code !== 100) {
        alert(data.msg);
      }
      else {
        history.push('/reset')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // hasn't know who is going to reset password yet
  // going to fetch the security question
  if(securityQuestion === '') {
    return <section className="section">
    <div className="form-box">
      <h2>Verification</h2>
      <form onSubmit={doGetQuestion}>
        <div className="form-item">
          <label><FaUserAlt/></label>
          <input type="text" id="username" placeholder="username" autoComplete="false" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
  }

  // the security question is fetched
  return <section className="section">
    <div className="form-box">
      <h2>Verification</h2>
      <form onSubmit={doVerify}>
        <div className="form-item">
          <label><FaQuestion/></label>
          <input type="text" value={securityQuestion} readOnly />
        </div>
        <div className="form-item">
          <label><FaSignature/></label>
          <input type="text" id="answer" autoComplete="false"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
}

export default ForgetPassword;