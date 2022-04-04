import '../styles/globals.css'
import Layout from 'src/admin/layout'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <Component {...pageProps} />
  )
  
}

export default MyApp
