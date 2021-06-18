import React from 'react';

const Accounts = ({ accounts }) => {
  return (
    <section>
      <div>
        <h2 className="section-title">List of Accounts</h2>
      </div>
      <div>
        {accounts.map((account) => {
          return <Tour key={account.aid} {...account} />;
        })}
      </div>
    </section>
  );
};

const Account = ({ aid, name, password, continueWith, properties }) => {
  return <div>
    password
  </div>
}

export default Accounts;