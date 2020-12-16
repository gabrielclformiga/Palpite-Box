import React from 'react'
import '../css/styles.css'
import Layout from '../components/Layout'

// _app é a primeira aplicação que abre

const MyApp = ({ Component, pageProps }) => {
  return (
    <div key="MyApp">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;