import React,  { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import "./Signin.css";
import signImage2 from "./images/bridge.png";
import {auth} from "./firebase"



function Signin() {
	const [ open, setOpen ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
  const [ direct, setDirect ] = useState(false);
  const history = useHistory()


  const [ user, setUser ] = useState(null);

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					//user has logged in ...
					console.log(authUser);
					setUser(authUser);
				} else {
					// user has logged out ...
					setUser(null);
				}
			});

			return () => {
				//perform some cleanup actions
				unsubscribe();
			};
		},
		[ user, username ]
	);


  
  const signUp = (event) => {
		event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

       setOpen(false);
    
	};


  return (
    <div>
     
      {user?.displayName || user?.email ? (
        <Redirect to={'/'} />
       
   ):(
    <div className="signinWrapper">
    <div className="imageWrapper">
    <div className="signinBox">
      <div className="logo">
        <h4>ProPics</h4>
      </div>
      <div className="welcomeText">
        <h1>
          Creation Starts <br /> Here
        </h1>
        <p className="welcomePara">
          Access <span>3,137,628</span> free, high-resolution photos you
          can’t find anywhere else
        </p>
      </div>

      <div className="welcomeFoot">Upload your own images</div>
    </div>
  </div>
  <div className="signinContent">
    <img src={signImage2} alt="" />
    <input type="text" placeholder="Name" value={username}
    onChange={(e) => setUsername(e.target.value)}/>
    <input type="email"  placeholder="Email" value={email}
    onChange={(e) => setEmail(e.target.value)}/>
    <input type="password"  placeholder="password" value={password}
    onChange={(e) => setPassword(e.target.value)}/>
    <button type="submit" onClick={signUp}  >Sigin</button>
  </div>
  </div>
   )}
       
      
    </div>
  );
}

export default Signin;
