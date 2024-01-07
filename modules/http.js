import axios from 'axios'






// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCh8avpW8hE9M8iEBu85ZSq-4OFwm4NX0s",
    authDomain: "uzum-9f885.firebaseapp.com",
    databaseURL: "https://uzum-9f885-default-rtdb.firebaseio.com",
    projectId: "uzum-9f885",
    storageBucket: "uzum-9f885.appspot.com",
    messagingSenderId: "453996588025",
    appId: "1:453996588025:web:1af030113b117d080d6b28",
    measurementId: "G-HD6RMDLGMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const database = getDatabase();


// export const NewGetData = async (url) => {
//     try {
//         const dbRef = ref(database, url);
//         const snapshot = await get(dbRef);
//         return snapshot.val();
//     } catch (error) {
//         console.error('Error during GET request:', error);
//         throw error;
//     }
// };



let BASE_URL = import.meta.env.VITE_BASE_URL

export let getData = async (url) => {
    try {
        const dbRef = ref(database, url);
        const snapshot = await get(dbRef);
        return snapshot.val();
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
}

export let postData = async (url, body) => {
    let res = await fetch(BASE_URL + url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res
}

export let removeData = async (url, id) => {
    let res = await axios.delete(`${BASE_URL}${url}/${id}`)

    return res
}

export const patchData = async (url, body) => {
    try {
        const res = await fetch(BASE_URL + url, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error during PATCH request:', error);
        throw error;
    }
};


// let new_url = 'https://uzum-9f885-default-rtdb.firebaseio.com'

// export let NewGetData = async (url) => {
//     try {
//         let res = await axios.get(new_url + url)

//         return res.data
//     } catch (error) {
//         alert(error)
//     }
// }