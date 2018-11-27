import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'
import './index.css';

var config = {
  apiKey: "AIzaSyCFSRHwcHSJIepKgZRPwXnkkG4Ck9BwxhU",
  authDomain: "hrdemo-b09ab.firebaseapp.com",
  databaseURL: "https://hrdemo-b09ab.firebaseio.com",
  projectId: "hrdemo-b09ab",
  storageBucket: "",
  messagingSenderId: "133439137334"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
