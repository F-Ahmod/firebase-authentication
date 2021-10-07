import {getAuth,signInWithPopup, GoogleAuthProvider,GithubAuthProvider,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.init';

initializeAuthentication();


const Googleprovider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
function App() {
  const [name,SetName]=useState();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const [user, setUser]= useState({});
  const [error,setError]=useState();
  const [isLOgin, setIsLogin]=useState(false)
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

const toggleChack= e=>{
  setIsLogin(e.target.checked);
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


  // tarnareoparetor
  // isLOgin? : createNewUser(email,password)

  // if else use 
  

  const prossesLogin=(email,password)=>{
    signInWithEmailAndPassword(auth, email,password)
    .then(result =>{
      const user=result.user;
      console.log(user);
      setError('')
    })
    .catch(error=>{
      setError(error.message)
    })

  }
  
  const createNewUser=(email,password)=>{
    createUserWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user;
    
    console.log(user);
    emailVarify();
    setError('')
    setUserName();
    
    
  })
  .catch(error =>{
    setError(error.message)
  })
  
  }

  const setUserName =()=>{
    updateProfile(auth.currentUser,{displayName: name})
    .then(result=>{
      console.log(result);
    })
  }
  
 
  if(isLOgin){
    prossesLogin(email,password);
  }
  else{
    createNewUser(email,password)

  }

}


const emailVarify =()=>{
  sendEmailVerification(auth.currentUser)
  .then( result=> {
    console.log(result);
    // Email verification sent!
    // ...
  });
}
 const handelResetPassword =()=>{
  sendPasswordResetEmail(auth,email)
  .then(result=>{
    console.log(result);
  })
 }
 const hndelName=e=>{
   SetName(e.target.value)
  
 }
//  video play link 
//  <iframe width="420" height="345" src="https://www.youtube.com/embed/Io0WdUNVZPc">
// </iframe>

  return (
    <div className="App">

      <form  onSubmit={handelRagistration}>

        <h2>Please {isLOgin ? 'Login': 'Register'} </h2>
        <br /><br />
        {!isLOgin &&<div>
        <div><label className="dd fs-4 text-light mb-2 " htmlFor="Name">Name</label></div>
        <input className="dd fs-4 text-light mb-2 " type="text" onBlur={hndelName} name="name" placeholder="Your Neme" />
        </div>}
        <br /><br />
        <label className="dd fs-4 text-light mb-2" htmlFor="email">Email</label>
        <div><input className="dd fs-4 text-drak mb-2" type="email" onChange={ChangeEmail} name="email" required/></div>
        <br /><br />
        <label className="dd fs-4 text-light" htmlFor="passpord"> Password </label >
         <div> <input className="dd fs-4 text-drak mb-2" type="password" onBlur={hendelOnBlur} name="password" id="" required/></div>
        <br /><br />
        <p >{error}</p>
        
        <br /><br />
        
  <input className="form-check-input"  onChange={toggleChack} type="checkbox" value="" id="flexCheckIndeterminate"/>
  <label className="form-check-label" htmlFor="flexCheckIndeterminate">
   You are already loging
  </label>
  <br /><br /><br />
  {/* <input type="submit" value="ation" /> */}
  <button type="submit" className="btn-info w-25 p-2 fs-5">{isLOgin ? 'Login':'Ragistr'}</button> <button className="btn-info w-25 p-2 fs-5" onClick={handelResetPassword} type="reset">Reset Password</button>

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
