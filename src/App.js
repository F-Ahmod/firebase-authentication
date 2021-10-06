import {getAuth,signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.init';

initializeAuthentication();


const Googleprovider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
function App() {
  const [user, setUser]= useState({})
  const auth =getAuth();
const hendelGoogleSingIn = () =>{
  
  signInWithPopup(auth, Googleprovider)
  .then(result =>{
    const {displayName,email,photoURL} = result.user;
   const loggedInUser={
     name: displayName,
     email: email,
     photo: photoURL
   };
   setUser(loggedInUser)
  });
};
const handelGithub =()=>{
  signInWithPopup(auth,GithubProvider)
  .then(result=>{
    const {displayName,email,photoURL}=result.user;
    const loggedInUser={
      name: displayName,
      email: email,
      photo: photoURL
    };
    setUser(loggedInUser)
  })
}

const hendelSingOut=()=>{
  signOut(auth)
setUser({})

}
  return (
    <div className="App">
      { !user.photo ?
        <div>
        <button onClick={hendelGoogleSingIn}>Google sing in</button>
        <br />
        <button onClick={handelGithub}>github sing in</button>
        </div> :
        <button onClick={hendelSingOut}>sing out</button>
      }
      
      {
        user.photo && <div>
          <h1>welcome {user.name}</h1>
         <p>email {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    </div>
  );
}

export default App;
