import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FaUserAlt, FaQuestion, FaSignature} from 'react-icons/fa'
import {useGlobalContext} from '../context'
import qs from 'qs'

function ForgetPassword() {

  const {userInfo} = useGlobalContext();
  const [seqq, setSeqq] = useState('');
  const [usern, setUsern] = useState('');
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const doGetQuestion = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/getQuestion',
      data: qs.stringify({username})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code != 100) {
        alert(data.msg);
      }
      else {
        setUsern(username)
        setSeqq(data.question)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const doSubmit = (e) => {
    e.preventDefault();
    const answer = document.getElementById('answer').value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/userForgetPassword',
      data: qs.stringify({usern, answer})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code != 100) {
        alert(data.msg);
      }
      else {
        setValidated(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const doChangePassword = (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('passwordNew').value
    const axios = require('axios').default;
    axios({
      method: 'post',
      url: 'http://localhost:8080/userResetPassword',
      data: qs.stringify({usern, newPassword})  // use qs to stringify data
    }).then(function (response) {
      const {data} = response
      if(data.code != 100) {
        alert(data.msg);
      }
      else {
        history.push('/signin')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  if(seqq === '') {
    return <section className="section">
    <div className="form-box">
      <h2>Validation</h2>
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

  if(validated) {
    return <section className="section">
    <div className="form-box">
      <h2>Validation</h2>
      <form onSubmit={doChangePassword}>
        <div className="form-item">
          <label><FaUserAlt/></label>
          <input type="text" id="newPassword" placeholder="new password" autoComplete="false" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </section>
  }

  return <section className="section">
    <div className="form-box">
      <h2>Validation</h2>
      <form onSubmit={doSubmit}>
        <div className="form-item">
          <label><FaQuestion/></label>
          <input type="text" value={userInfo.question} readOnly value={seqq} />
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