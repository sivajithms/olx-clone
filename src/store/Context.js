import { createContext, useState } from "react";

export const userContext=createContext(null)

export default function Context({children}){
    const [user,setUser]= useState(false)
    return(
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider> 
    )
} 