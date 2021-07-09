import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useGlobalContext } from '../context';

function AddAccount() {
  const {userInfo, userPassbook} = useGlobalContext();
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [fixedPropertyList, setFixedPropertyList] = useState([]);
  const history = useHistory();

  function gatherFixedProperties() {
    if(!userPassbook) { return; }
    var temp = []
    userPassbook.map(function (account) {
      account.properties.map((property) => {
        if(property.prime === 1 && property.fixed === 1) {
          temp.push(property)
        }
      });
    });
    console.log(temp);
    setFixedPropertyList(temp);
    setSelectedProperties([]);
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
        select: 
        <select>
          {fixedPropertyList.map((property) => {
            return <option key={property.pid}>
              {property.name} : {property.value}
            </option>
          })}
        </select>
        <ul>
          {selectedProperties.map((property) => {
            return <li key={property.pid}>
              {property.name} : {property.value}
            </li>
          })}
        </ul>
        <h3>Properties of its own</h3>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default AddAccount;