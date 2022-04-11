import '../styles/globals.css'
import Layout from 'src/admin/layout'
import { AuthProvider } from "../admin/contexts/AuthContext"

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <AuthProvider>
    <Component {...pageProps} />

    </AuthProvider>
    
  )
  
}

export default MyApp
