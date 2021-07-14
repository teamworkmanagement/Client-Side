import firebase from 'firebase/app';
import "firebase/storage";
const firebaseConf = {
  apiKey: "AIzaSyD_WlTTOqNZS_jmz8ziKpGe6p6RgFUyLQw",
  authDomain: "teamappstorage.firebaseapp.com",
  projectId: "teamappstorage",
  storageBucket: "teamappstorage.appspot.com",
  messagingSenderId: "556124578165",
  appId: "1:556124578165:web:01c170ae7b6299b1ecb33c"
};
// Initialize Firebase
const firebaseConfig = firebase.initializeApp(firebaseConf);

export default firebaseConfig;