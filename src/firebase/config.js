const firebaseConfig = {
    apiKey: "AIzaSyDjTGh8lQkLfeD2s573SCdRtHXEo53JDcU",
    authDomain: "song-playlist-77a68.firebaseapp.com",
    projectId: "song-playlist-77a68",
    storageBucket: "song-playlist-77a68.appspot.com",
    messagingSenderId: "345868692583",
    appId: "1:345868692583:web:5d1bf31c3ccbe5aba4f8c2"
  };

  import firebase from "firebase/app";
  import 'firebase/firestore'
  import 'firebase/auth'
  import 'firebase/storage'

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFireStore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()
  //timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectAuth, projectFireStore, timestamp, projectStorage}