import AuthContext from "./authContext"
import { useState } from "react";
import api from "../../services/api"
import qs from 'qs';
import { setCookie } from "nookies"
import { Router } from "next/router";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const isAuthenticated = !!user

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