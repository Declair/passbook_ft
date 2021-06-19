import React from 'react'
import {useHistory} from 'react-router-dom'
import {useGlobalContext} from '../context'
import Accounts from '../components/Accounts'

function AccountList() {
  const {userInfo, userPassbook} = useGlobalContext();
  const history = useHistory();

  // check whether is signed in
  if(userInfo.logged !== true) {
    history.push('/signin');
    return 'not signed in';
  }

  return (
    <section className="section">
      <div>
        <h2 className="section-title">List of Accounts</h2>
      </div>
      <Accounts accounts={userPassbook} />
    </section>
  )
}

export default AccountList;