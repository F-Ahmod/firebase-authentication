import {getAuth,signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut,createUserWithEmailAndPassword} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.init';

initializeAuthentication();


const Googleprovider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
function App() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const [user, setUser]= useState({});
  const [error,setError]=useState()
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
// from start 

const ChangeEmail = e =>{
  setEmail(e.target.value);
}
const hendelOnBlur= e =>{
  setPassword(e.target.value);
}
const handelRagistration = e =>{
  e.preventDefault();
  if(password.length <6){
    setError('password must be 6 carecter long')
    return;
  }
  else{
    setError('welcome')
  }
  // if(/^(?=.*\d)(?=.*[A-Z])/.test(password)){
  //   setError('2 uper case must')
  //   return;
  // }
  createUserWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user;
    
    console.log(user);
    setError('')
    
  })
  .catch(error =>{
    setError(error.message)
  })
 
  

}

  return (
    <div className="App" style={{backgroundColor:"lightblue"}}>

      <form onSubmit={handelRagistration}>
        <h2>Please Registration</h2>
        <label htmlFor="email">Email : </label>
        <input type="email" onChange={ChangeEmail} name="email" required/>
        <br /><br />
        <label htmlFor="passpord">Password : </label>
        <input type="password" onBlur={hendelOnBlur} name="password" id="" required/>
        <br /><br />
        <p >{error}</p>
        <input type="submit" value="Ragistration" />
      </form>

 <br /> <br /><br /><br />
       
    <div>.............................................</div>
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
