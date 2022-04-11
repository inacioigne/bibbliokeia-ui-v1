import Navbar from './navbar'
//import Footer from './footer'
import { AuthProvider } from "../admin/contexts/AuthContext"

export default function Layout({ children }) {
  return (
    <>
     <AuthProvider>

     
      <Navbar />
      <main>{children}</main>
      {/**<Footer />*/}
      </AuthProvider>
    </>
  )
}