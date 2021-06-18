import React, {useState, useEffect} from 'react'
import {useGlobalContext} from '../context'
import Loading from '../components/Loading'
import qs from 'qs'

function Home() {

  const {userInfo, userPassbook, setUserPassbook} = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const fetchPassbook = async () => {
    if(userInfo.logged === true) {
      setLoading(true);
      // fetch user's passbook
      const axios = require('axios').default;
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/getData',
        data: qs.stringify({uid: userInfo.uid})  // use qs to stringify data
      }).then(function (response) {
        const {data} = response
        if(data.code !== 100) {
          setLoading(false);
          alert(data.msg);
        }
        else {
          setLoading(false);
          setUserPassbook(data.accounts);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
    }
  }

  useEffect(() => {
    fetchPassbook()
  }, [])

  if(loading) {
    return (
      <section className="section">
        <Loading />
      </section>
    )
  }

  return (
    <section className="section">
      <h2 className="section-title">Passbook - a resolution for accounts</h2>
      <a href="#">link</a>
    </section>
  )
}

export default Home;