import { createContext, useEffect, useState } from "react";
import api from "../../services/api"
import qs from 'qs';
import { setCookie, parseCookies } from "nookies"
import Router from 'next/router'


export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState()

  const isAuthenticated = !!user
  useEffect(() => {
    const { 'bibliokeia.token': token } = parseCookies()
    if (token) {
      //Pegar informações do usuario
      setUser({name: 'admin', 'id': 1})
      //console.log(user.name)
    }

  }, [])

async function signIn(data) {
  const response = await api.post( "usuarios/login", 
  qs.stringify(data),
  {headers: { 'content-type': 'application/x-www-form-urlencoded' }}
  )
  setCookie(undefined, 'bibliokeia.token',
  response.data.access_token, {
    maxAge: 60 * 60 * 1,
  } )
  setUser(response.data.user)

  Router.push('/cataloguing/book')
  console.log(response.data)

}

    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
          {children}
        </AuthContext.Provider>
      )
}