import axios from 'axios'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, update, push } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRn3FyZ2MtVvQQexKkg1s_5XpSjWdwb_A",
    authDomain: "uzum-market-d563c.firebaseapp.com",
    projectId: "uzum-market-d563c",
    storageBucket: "uzum-market-d563c.appspot.com",
    messagingSenderId: "367475286555",
    appId: "1:367475286555:web:a67d693c0ff4bf6e27cebe",
    measurementId: "G-9LS961BH73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase();

console.log(database.get);

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
    try {
        const dbRef = ref(database, url);
        const newUserRef = push(dbRef);
        await set(newUserRef, body);
        console.log('Data successfully posted');
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
}

// export let postData = async (url, body) => {
//     let res = await fetch(BASE_URL + url, {
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })

//     return res
// }

export let removeData = async (url, id) => {
    let res = await axios.delete(`${BASE_URL}${url}/${id}`)

    return res
}

export const patchData = async (url, body) => {
    try {
        const dbRef = ref(database, url);
        await update(dbRef, body);
        console.log('Data successfully patched');
    } catch (error) {
        console.error('Error during PATCH request:', error);
        throw error;
    }
};

// export const patchData = async (url, body) => {
//     try {
//         const res = await fetch(BASE_URL + url, {
//             method: 'PATCH',
//             body: JSON.stringify(body),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error('Error during PATCH request:', error);
//         throw error;
//     }
// };


// let new_url = 'https://uzum-9f885-default-rtdb.firebaseio.com'

// export let NewGetData = async (url) => {
//     try {
//         let res = await axios.get(new_url + url)

//         return res.data
//     } catch (error) {
//         alert(error)
//     }
// }