import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import image from "./images/alovera.png";

import { auth, db } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { Button, makeStyles, Input } from "@material-ui/core";

import Post from "./Post";
import useFileDownloader from "./useFileDownloader";
import Downloader from "./Downloader";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyle = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home(props) {
  const classes = useStyle();
  const [modalStyle] = useState(getModalStyle);

  const inputEl = useRef("");

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [countResults, setCountResults] = useState("");

  // Signup
  useEffect(() => {
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
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

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

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  useEffect(() => {
    setSearchResults(
      posts.filter((val) => {
        return val.post.caption.toLowerCase().includes(search.toLowerCase());
        //   val.post.username.toLowerCase().includes(search.toLowerCase())
      })
    );

    countResultsFunc();
  }, [search, posts]);

  const countResultsFunc = () => {
    setCountResults(searchResults.length);
  };
  
  console.log(searchResults)
  console.log(user)




// const [downloadFile, downloaderComponentUI] = useFileDownloader();
// const download = file => downloadFile(file)
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <h2>Signup</h2>

            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <h2>Login</h2>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>
              Login
            </Button>
          </form>
        </div>
      </Modal>

      <Navbar />
      <section class="home" id="home">
        <input
          type="text"
          id="searchBar"
          class="searchBar"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <p className="resluts">
          {countResults < 0 || search == "" ? (
            <p></p>
          ) : (
            <p>{countResults}results</p>
          )}
        </p>
      </section>

      <section class="home2" id="home">
        <p>Photo Editing | JPG, PNG, Background and Editing Apps Download</p>
      </section>

      <section className="images" id="images">
      
       {searchResults.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          user={user}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
          category={post.category}
          // download={()=>download(post)}
        />
      ))}
       

       
        
      </section>

  
    </div>
  );
}

export default Home;
