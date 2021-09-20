import React,  { useState, useEffect } from 'react'
import './Login.css'
import signImage2 from "./images/bridge.png";
import {auth} from "./firebase"

function Login(props) {

  const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const [ openSignIn, setOpenSignIn ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ user, setUser ] = useState(null);


  const signIn = (event) => {
		event.preventDefault();

		auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
	};
     
    return (
        <div>
             <div className="loginWrapper">
        <div className="loginimageWrapper">
          <div className="loginBox">
            <div className="logo">
              <h4>ProPics</h4>
            </div>
            <div className="loginwelcomeText">
              <h1>
                Creation Starts <br /> Here
              </h1>
              <p className="loginwelcomePara">
                Access <span>3,137,628</span> free, high-resolution photos you
                can’t find anywhere else
              </p>
            </div>

            <div className="loginwelcomeFoot">Upload your own images</div>
          </div>
        </div>
        <div className="loginContent" open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <img src={signImage2} alt="" />
          <input type="email"  placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          <input type="password"  placeholder="password" value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={signIn}>Login With Google</button>
        </div>
      </div>
        </div>
    )
}

export default Login
