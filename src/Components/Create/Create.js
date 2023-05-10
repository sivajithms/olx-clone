import React, { Fragment, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    console.log(image);
    console.log("file name is ", image.name);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image ? image.name : ""}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
       () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log("File available at", downloadURL);
          await addDoc(collection(db, "products"), {
            name: name,
            category: category ,
            price:price,
            image:downloadURL
          }).then(()=>{
            console.log("Document written with ID: ")
            navigate('/')
        });
        })
        
      }
    )
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image && URL.createObjectURL(image)}
          ></img>
          <form>
            <br />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" />
            <br />
            <button className="uploadBtn" onClick={(e) => handleSubmit(e)}>
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
