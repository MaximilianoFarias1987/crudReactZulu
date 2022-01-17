// import firebase from 'firebase/app'
// require ('firebase/firestore')

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAG8RpaO9Re9ssDLEpWef3OVI2M_JugzJ4",
    authDomain: "crudreact1-8bddc.firebaseapp.com",
    projectId: "crudreact1-8bddc",
    storageBucket: "crudreact1-8bddc.appspot.com",
    messagingSenderId: "88135713731",
    appId: "1:88135713731:web:9ef81206537bba1df6b376"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)