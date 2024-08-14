
import React, { useEffect, useState } from 'react'
import {createContext,useContext} from 'react'

export const AuthContext=createContext()   

export const AuthProvider = ({children}) => {
  
  const [token,setToken]=useState(localStorage.getItem('token'))
  
  const [user,setUser]=useState("")
  const [card,setCard]=useState([])  
  const [allUsers,setAllUsers]=useState([])
  
  const [loading,setLoading]=useState(true)
  
  const StoreToken=(tokenFromServer)=>{
    setToken(tokenFromServer)
    return localStorage.setItem('token',tokenFromServer)
  }
  
  const authToken=`Bearer ${token}`

    let isLoggedIn=!!token

    
// logout functionality:

const LogoutUser=()=>{
  setToken("")
  return localStorage.removeItem('token')
}

// get loggedin user data--- this is similar to making request to /user route from frontend and , since we may need this user data at various places in our app so instead of making this request everywhere again and again , juts use here once ,with  with contextAPI.

     const userAuthenticate=async()=>{

      try {

        
        const result=await fetch('https://ondoors.onrender.com/user',{
        method:'GET',
        headers:{
          Authorization:authToken
        }
      })

      if(result.ok)
      {
        const data=await result.json()
       
        setUser(data.result)

        setLoading(false)
      }

      } catch (error) {
        console.log('error fetching user');
      }
      
    }


    // empty user on logout:

    const userEmpty=()=>{
      setUser('')

    }


    useEffect(() => {
      if (isLoggedIn) {
        userAuthenticate();
      }
    }, [isLoggedIn]);
    
    useEffect(() => {
      if (!isLoggedIn) {
        userEmpty();
      }
    }, [!isLoggedIn]);
    


// same for cards:

const serviceCards=async()=>{

  try {

    setLoading(true)
    const result=await fetch('https://ondoors.onrender.com/newcard/getcard',{
    method:'GET'
  })

  if(result.ok)
  {
    const data=await result.json()
   
    setCard(data.cardData)
    setLoading(false)
  }

  } catch (error) {
    console.log('error fetching card data');
  }
  
}

useEffect(()=>{
  serviceCards()
},[])


// get all users

const getAll = async () => {
  try {
    const result = await fetch('https://ondoors.onrender.com/admin/allusers', {
      method: 'GET',
      headers: {
        Authorization: authToken
      }
    });

    if (result.ok) {
      const data = await result.json();
      setAllUsers(data.result);
      setLoading(false);
    } else {
      console.log('error occurred');
    }
  } catch (error) {
    console.log('error fetching all users', error.message);
  }
};

useEffect(() => {
  getAll();
}, []);



// ---------------------------------------------------------------------

  return  <AuthContext.Provider value={{StoreToken,LogoutUser,isLoggedIn,user,loading,authToken,card,allUsers,userAuthenticate}}>
        {children}
    </AuthContext.Provider> 
  
}



export const useAuth = () => {
    const AuthContextResult=useContext(AuthContext)

    if(!AuthContextResult){throw new Error('useAuth used outside provider ')} 

  return AuthContextResult

}
