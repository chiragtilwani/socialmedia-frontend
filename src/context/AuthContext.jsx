import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from './AuthReducer'

export const AuthContext=createContext()

export function AuthProvider(props){
  const initialUser=JSON.parse(window.localStorage.getItem('user') || "{}");
  const [user,dispatch]=useReducer(AuthReducer,initialUser)

  return <AuthContext.Provider value={{user:user,dispatch:dispatch}}>
    {props.children}
  </AuthContext.Provider>
}