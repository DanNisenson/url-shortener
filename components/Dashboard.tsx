import { GetServerSideProps } from 'next'
import { getUserUrls } from '../frontHelpers/apiHelpers'
import { useEffect } from 'react'

type Res = {}

const Dashboard = () => {
  useEffect(() => {
    const req = async () => {
      const res = await getUserUrls()
      console.log(res)
    }
    req()
  }, [])
  return <div>Dashboard</div>
}

export default Dashboard
