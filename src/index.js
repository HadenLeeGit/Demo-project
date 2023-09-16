import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Auth0Provider } from '@auth0/auth0-react';
import Admin from "./Admin";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, onSnapshot} from "firebase/firestore";

import { ok } from "./Firebase";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCcwK-U_ERsCKyRVU3GybqHlIR5ndE-OhE",
  authDomain: "thermasense-96e86.firebaseapp.com",
  projectId: "thermasense-96e86",
  storageBucket: "thermasense-96e86.appspot.com",
  messagingSenderId: "84892855228",
  appId: "1:84892855228:web:3aff26c872a26d0cf599b9",
  measurementId: "G-QYW3G0CSH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const usersRef = collection(db, "users");


const domain = "dev-h2fijpc23mzv6ab7.us.auth0.com"
const clientId = "aw5R1QyzXEYLhzVm0wcvHMXnu3Ke5NuN"

const root = ReactDOM.createRoot(document.getElementById("root"));



// let arr = []

//     const data = 
//     {
//       "Relative Time Since Turned On": "15477",
//       "0x0*": "0x0*",
//       "Battery Percentage": "101",
//       "Surface Temperature Output of Sensor 1": "26.677",
//       "Surface Temperature Output of Sensor 2": "28.088",
//       "Thermal Energy of Sensor 1": "24.292",
//       "Thermal Energy of Sensor 2": "66.772"
//     }

//     let collectionRef = collection(db, "users", "sampleuser", "data");

//     onSnapshot(collectionRef, (querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//         // console.log("Id: ", doc.id, "Data: ", doc.data());
//         arr.push(doc.data())
//         });
//     });

//     // addDoc(collectionRef, data)

//     // console.log("arr: ")
//     // console.log(arr)



root.render(
  <React.StrictMode>

    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >


      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="app" element={<App />} />
          <Route path="dashboard" element={<Dashboard />} />
         <Route path="admin" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </Auth0Provider >
  </React.StrictMode>


);