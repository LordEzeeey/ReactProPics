import React from 'react'
import Navbar from './Navbar'
import './Profile.css'
// import {useState, useEffect} from 'react'
import Signin from './Signin';


function Profile() {
    // const [user, setUser] = useState('');


    // const userState = () => {
    //   const userdata = localStorage.getItem('user');
    //   const userobject = userdata !== null ? JSON.parse(userdata) : null;
    //   setUser(userobject)
    // }

    // const signOut = () => {
    //     localStorage.removeItem('user');
    //     setUser(null);
    // }
    // useEffect(() => {
    //     userState()
    // }, [])
    return (
        <div>
           <Navbar />
                <div className="userInfo">
                    <div className="userImage">
                       
                       <p></p>
                       <p></p>
                       <button></button>
                    </div>
                </div>
        </div>
    )
}

export default Profile
