import React, { useContext, useEffect } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { userContext } from '../store/Context';
import { useNavigate } from 'react-router-dom';


function Home(props) {
  const navigate = useNavigate()
  const {setUser}=useContext(userContext)
  useEffect(() => {
    //Runs on every render
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('signed in');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user.displayName)
        // ...
      } else {
        setUser(null)
        console.log('User is signed out');
        
        // navigate('/login')
        // ...
      }
    });

   
  });
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
