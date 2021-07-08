import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useGlobalContext } from '../context';

function AddAccount() {
  const {userInfo, userPassbook} = useGlobalContext();
  const history = useHistory();

  var fixedPropertyList = [];

  function gatherFixedProperties() {
    if(!userPassbook) { return; }
    userPassbook.map(function (account) {
      account.properties.map(function (property) {
        if(property.fixed === 1) {
          fixedPropertyList.push(property)
        }
      });
    });
  }

  useEffect(()=>{gatherFixedProperties()},[])

  const doAddAccount = (e) => {
    e.preventDefault();
    
  }

  // check whether is signed in
  if(userInfo.logged !== true) {
    history.push('/signin');
    return 'not signed in';
  }

  return (
    <section className="section">
      <div>
        <h2 className="section-title">Add a new Account into your Passbook</h2>
      </div>
      <form onSubmit={doAddAccount}>
        <h3>Basic Information</h3>
        <input id="account_name" placeholder="Account Name" autoComplete="false" />
        <h3>Password</h3>
        
        <h3>Properties from Other Accounts</h3>
        <h3>Properties of its own</h3>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default AddAccount;