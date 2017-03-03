var firebase = require('firebase');
try {
    var config = {
        apiKey: "AIzaSyCDE14tigro0nT0XU7aHfs7BVnP6Sa4VZU",
        authDomain: "crime-report-app-d7c80.firebaseapp.com",
        databaseURL: "https://crime-report-app-d7c80.firebaseio.com",
        storageBucket: "crime-report-app-d7c80.appspot.com",
        messagingSenderId: "765700359966"
    };
    firebase.initializeApp(config);
} catch (error) {
    console.log(error);
}
export var refFirebase = firebase.database();
export var myFirebase = firebase;
