import firebase from 'firebase/app';
import "firebase/storage";
const firebaseConf = {
    apiKey: "AIzaSyAmHPFXOsSO0GkNAw-UtQRsVAfJuIeVhiE",
    authDomain: "teamappauth-29adc.firebaseapp.com",
    projectId: "teamappauth-29adc",
    storageBucket: "teamappauth-29adc.appspot.com",
    messagingSenderId: "491396690623",
    appId: "1:491396690623:web:647124c84cd6525ad00c0a"
  };
// Initialize Firebase
const firebaseConfig = firebase.initializeApp(firebaseConf);

export default firebaseConfig;