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

const Account = ({ aid, name, password, continueWithAid, continueWithName, properties }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        {name}
      </div>
      <div className='card-container' id={`${'account-'+aid}`}>
        <table><tbody>
          <tr>
            <td>Account Name</td>
            <td>{name}</td>
          </tr>
          {  // if it's continued with another account, then show a link to anchor of that account
            continueWithAid &&
            (<tr>
              <td>continueWith</td>
              <td><a href={`${'#account-'+continueWithAid}`}>{continueWithName}</a></td>
            </tr>)
          }
          {  // if it doesn't have continueWithAid, then it should have a password
            !continueWithAid &&
            (<tr>
              <td>Password</td>
              <td><span className="shady">{password}</span></td>
            </tr>)
          }
          {properties.map((property) => {
            return (
              <tr key={property.pid} 
                className={`${property.fixed ? 'fixed-property':''}`}>
                <td>{property.name}</td>
                <td>{property.value}</td>
              </tr>
            )
          })}
        </tbody></table>
      </div>
    </div>
  )
}

export default Accounts;