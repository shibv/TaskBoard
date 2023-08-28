// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from  "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



// configuration 
const firebaseConfig = {
  apiKey: "AIzaSyBsbNXhhVpf6Qcwicx_scPByIOmnAqnW8g",
  authDomain: "task-c0a62.firebaseapp.com",
  projectId: "task-c0a62",
  storageBucket: "task-c0a62.appspot.com",
  messagingSenderId: "237400090099",
  appId: "1:237400090099:web:849d11cac5b321f4f81e86",
  measurementId: "G-J97XHWZ5GF"
};

// app Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider =new GoogleAuthProvider();


// export 
export {auth , app,provider};
