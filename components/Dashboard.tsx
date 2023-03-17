import { GetServerSideProps } from 'next'
import { getUserUrls } from '../frontHelpers/apiHelpers'
import { useEffect, useState } from 'react';

type Res = {}

const Dashboard = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const req = async () => {
      const res = await getUserUrls()
      if (res.length > 0) {
        let linkarr = []
        for (let x of res) {
          console.log('first')
          linkarr.push(<div className='dashboard__link' key={x._id}>
            <h4>{x.longUrl}</h4>
            <h4>http://localhost:3000/{x.shortUrl}</h4>
            </div>)
        }
        setLinks(linkarr)
      }
    }
    req()
  }, [])

  return <div>
    {links.length === 0 ? <div>You have no links!</div> : null}
    {links.length !== 0 ? <>{links}</> : null}
    </div>
}

export default Dashboard
