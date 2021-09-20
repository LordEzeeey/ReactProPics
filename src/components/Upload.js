import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import './Upload.css'
import firebase from "firebase"
import { db, storage, auth } from './firebase'
import  placeholder  from './images/images/key.png'

function Upload() {
  const [ image, setImage] = useState('')
  const [ progress, setProgress] = useState(0)
  const [ caption, setCaption] = useState('')
  const [ category, setCategory] = useState('')
  const [ imageSize, setImageSize] = useState('')
  const [ description, setDescription] = useState('')
  const [ link1, setLink1] = useState('')
  const [ link2, setLink2] = useState('')
  const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);
	const [ username, setUsername ] = useState('');
	const [ user, setUser ] = useState(null);

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged((authUser) => {
				if (authUser) {
					//user has logged in ...
					console.log(authUser);
					setUser(authUser);

					if (authUser.displayName) {
						//dont update username
					} else {
						//if we just created someone...
						return authUser.updateProfile({
							displayName: username
						});
					}
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


  const handleChange = (e) => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
      }
  };

  const handleUpload = () => {
     const upLoadTask = storage.ref(`images/${image.name}`).put(image);

     upLoadTask.on(
         "state_changed",
         (snapshot) => {
             // progress function ...
             const progress = Math.round(
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             );
             setProgress(progress)
         },
         (error) => {
             //Error function ...
             console.log(error);
             alert(error.message);
         },
         () => {
             // complete function
             storage
               .ref("images")
               .child(image.name)
               .getDownloadURL()
               .then(url => {
                   //post image inside db
                   db.collection("posts").add({
                       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       caption: caption,
                       category: category,
                       description: description,
                       imageSize, imageSize,
                       link1: link1,
                       link2: link2,
                       imageUrl: url,
                       username: username
                   });

                   setProgress(0);
                   setCaption('');
                   setImageSize('')
                   setDescription('')
                   setLink1('')
                   setLink2('')
                   setCategory('')
                   setImage(null)

               })
         }
     )
  }
    return (
        <div>
            <Navbar />

            <div className="uploadWrapper">
        <div className="uploadimageWrapper">
          <div className="uploadBox">
            <div className="uploadimageBox">
               <img src={placeholder} alt="" />
            </div>
          </div>
        </div>
        <div className="uploadContent">
        {user?.displayName || user?.email ? (
          <div>
          <progress className="imageupload__progress" value={progress} max="100" />
          <input type="file" onChange={handleChange} placeholder="Select image" required/>
          <input className="inputText" type="text" placeholder="Image caption" onChange={event => setCaption(event.target.value)} value={caption} required/>
          <input className="inputText" type="text" placeholder="Image category" onChange={event => setCategory(event.target.value)} value={category} required/>
          <input className="inputText" type="text" placeholder="Image description" onChange={event => setDescription(event.target.value)} value={description} required/>
          <input className="inputText" type="text" placeholder="Social media link 1" onChange={event => setLink1(event.target.value)} value={link1}/>
          <input className="inputText" type="text" placeholder="Social media link 2" onChange={event => setLink2(event.target.value)} value={link2}/>
          <input className="inputText" type="text" placeholder="Enter image size e.g 1800 x 2400" onChange={event => setImageSize(event.target.value)} value={imageSize} required/>
          <button onClick={handleUpload}>Upload</button>
          </div>
     ):(
   <h3>Sorry you need to login to Upload</h3>
     )}
         
        </div>
      </div>
        </div>
    )
}

export default Upload
