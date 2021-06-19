import React from 'react';

const Accounts = ({ accounts }) => {
  return (
      <div>
        {accounts.map((account) => {
          return <Account key={account.aid} {...account} />;
        })}
      </div>
  );
};

const Account = ({ aid, name, password, continueWith, properties }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        {name}
      </div>
      <div className='card-container'>
        <p>password: {password}</p>
        <p>continueWith: {continueWith}</p>
        {properties.map((property) => {
          return (
            <div key={property.pid}>
              {property.name} : {property.value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Accounts;