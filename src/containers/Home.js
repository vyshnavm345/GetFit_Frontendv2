import Layout from 'components/Layout'
import React from 'react'
import Main from 'components/Main'
import HomeFooter from 'components/HomeFooter'
import HomeBottomarea from 'components/HomeBottomarea'
import HomeMidArea from 'components/HomeMidArea'
import HomeTopArea from 'components/HomeTopArea'
const Home = () => {
  return (
    <Layout title='Get-Fit | Home' content='Home Page'>
      <Main/>
        <HomeTopArea />
        <HomeMidArea />
        <HomeBottomarea />
      </Layout>
  )
}

export default Home