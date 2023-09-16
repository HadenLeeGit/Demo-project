import { initializeApp } from "firebase/app";
import { query, getFirestore, doc, addDoc, setDoc, getDoc, getDocs, collection, onSnapshot, orderBy } from "firebase/firestore";
import moment from 'moment';

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

// Function to get user data from Firebase
export const getUserData = (username) => {

    var arr = []

    let collectionRef = collection(db, "users", username, "data")
    const q = query(collectionRef, orderBy("Relative Time Since Turned On", "asc"))

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log("Id: ", doc.id, "Data: ", doc.data());

            // console.log(doc.data())
            var x = doc.data()
            x['Average Thermal Energy'] = (parseFloat(x['Thermal Energy of Sensor 1']) + parseFloat(x['Thermal Energy of Sensor 2'])) / 2
            x['Average Surface Temp'] = (parseFloat(x['Surface Temperature Output of Sensor 1']) + parseFloat(x['Surface Temperature Output of Sensor 2'])) / 2
            x['Relative Time Since Turned On'] = moment(x['Relative Time Since Turned On']).valueOf(); // date -> epoch
            
            x['Average Thermal Energy'] = parseFloat(x['Average Thermal Energy']).toFixed(1)
            arr.push(x)
        });
    });

    // console.log(arr)
    return arr
}

export const ok = () => {
    var arr = []

    // data subcollection in a username
    let collectionRef = collection(db, "users", "sampleuser", "data")
    const q = query(collectionRef, orderBy("Relative Time Since Turned On", "asc"))

    let toAddTo = collection(db, "users", "wowuser", "data")


    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log("Id: ", doc.id, "Data: ", doc.data());
            // console.log(doc.data())

            

            var x = doc.data()
            addDoc(toAddTo, x)
            x['Average Thermal Energy'] = (parseFloat(x['Thermal Energy of Sensor 1']) + parseFloat(x['Thermal Energy of Sensor 2'])) / 2
            x['Average Surface Temp'] = (parseFloat(x['Surface Temperature Output of Sensor 1']) + parseFloat(x['Surface Temperature Output of Sensor 2'])) / 2
            x['Relative Time Since Turned On'] = moment(x['Relative Time Since Turned On']).valueOf(); // date -> epoch
            
            x['Average Thermal Energy'] = parseFloat(x['Average Thermal Energy']).toFixed(1)
            arr.push(x)

            
        });
    });

    // console.log(arr)
    return arr
}

// Function to retrieve all users in database
export const getAllUsers = () => {
    var arr = []

    const q = query(collection(db, "users"));

    const querySnapshot = getDocs(q);

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log("Id: ", doc.id, "Data: ", doc.data());
            // var x = {value: doc.id, label: doc.id}
            var username = doc.id
            

            var userData = getUserData(username)

            var toPush = {"label": username, "value": userData}

            arr.push(toPush)
        });
    });

    // console.log("users:")
    // console.log(arr)

    

    return arr
}

export const pushData = (data) => {

    // const data = 
    // {
    //   "Relative Time Since Turned On": "15477",
    //   "0x0*": "0x0*",
    //   "Battery Percentage": "101",
    //   "Surface Temperature Output of Sensor 1": "26.677",
    //   "Surface Temperature Output of Sensor 2": "28.088",
    //   "Thermal Energy of Sensor 1": "24.292",
    //   "Thermal Energy of Sensor 2": "66.772"
    // }

    let collectionRef = collection(db, "users", "sampleuser", "data");
    addDoc(collectionRef, data)
}