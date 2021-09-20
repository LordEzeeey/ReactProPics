import React, {useState} from 'react'
import './Navbar.css'
import { auth } from './firebase'
import { Redirect } from 'react-router'

function Navbar({user}) {

    const [navbar, setNavbar] = useState(false)

    function change(){
        const navbarLinks = document.querySelector('#navLinks')
        navbarLinks.classList.toggle('active');
      }

      function change(){
        const navbarLinks = document.querySelector('#navLinks')
        navbarLinks.classList.toggle('active');
      }

     

      const changeOnScroll = () => {
      if(window.scrollY > 60){
        setNavbar(true)
      }else{
        setNavbar(false)
      }
      }

      window.addEventListener('scroll', changeOnScroll);
      
    
    return (
        <div>
            <nav id="nav" className={navbar ? 'nav scrollNav ' : ' nav '} >
        <h2 className="logo" id="logo"><span>Pro</span>Pics</h2>


        <a href="#" id="toggle-button" className="toggle-button" onClick={change}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>

        <ul className="navLinks" id="navLinks">
            <li id="li1" className="link" onClick={change}><a href="#home">Home</a></li>
            <li id="li2" className="link" onClick={change}><a href="#images">Images</a></li>
            <li id="li3" className="link" onClick={change}><a href="#apps">Apps</a></li>
            <li>
						
							<button className="logout" onClick={() => auth.signOut()}>Logout</button>
					</li>
        </ul>
        </nav>
        </div>
    )
}

export default Navbar
