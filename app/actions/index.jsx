var {myFirebase, refFirebase}=require('app/firebase/');
var store = require('./../store/configureStore').storeConfig();

export var setUidOnLogin = function (uid, user) {
    console.log("In Set uid action", uid);
    return {
        type: "LOGIN",
        uid: uid,
        currentUser: user,
    };
};

export var logout = function () {
    console.log("In logout function");

    return {
        type: "LOGOUT",
    };
};
export var loginStart = function (email, password) {
    return function (dispatch, getState) {

        myFirebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            dispatch(setUidOnLogin(result.uid));

        });
    }

};
export var signupStart = function (userObject, credentials) {
    return function (dispatch, getState) {

        myFirebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(function (result) {

            dispatch(setUidOnLogin(result.uid));
            var id = result.uid;
            var user = refFirebase.ref(`users/${id}`);
            user.set(userObject);
            alert('SuccessFully Signed up')
        }, function (error) {
            console.log("Authentication failed", error);
        });
    }
};


export var addCrime = function (crimeObject) {
    return function (dispatch, getState) {
        var currentState = getState()
        var id = currentState.loginsignupReducer.uid;
        var user = refFirebase.ref(`users/${id}/crimes`);
        user.push(crimeObject);
        alert('SuccessFully Added Crime To Db');

    }
};

export var addMissing = function (crimeObject) {
    return function (dispatch, getState) {
        var currentState = getState()
        var id = currentState.loginsignupReducer.uid;
        var user = refFirebase.ref(`users/${id}/missings`);
        user.push(crimeObject);
        alert('SuccessFully Added Missing Person Report To Db');

    }
};
export var addComplaint = function (crimeObject) {
    return function (dispatch, getState) {
        var currentState = getState()
        var id = currentState.loginsignupReducer.uid;
        var user = refFirebase.ref(`users/${id}/complaints`);
        user.push(crimeObject);
        alert('SuccessFully Added Missing Person Report To Db');

    }
};

export var logoutStart = function () {
    return function (dispatch, getState) {
        return myFirebase.auth().signOut().then(function () {
            dispatch(logout());
        });
    }
};
export var loginOrSignUp = function (isSinging) {
    return {
        type: "ISLOGINGORSIGNUP",
        isSinging: isSinging,
    };
};


export var startFetching = function () {
    return {
        type: "STARTING_FETCHING",
    };
};
export var doneFetchingUsers = function (response) {
    return {
        type: "DONE_FETCHING_USERS",
        users: response,
    };
};

export var getAllUser = function () {
    return function (dispatch, getState) {
        dispatch(startFetching());
        var users = refFirebase.ref('users');
        users.on('value', function (snapshot) {
            dispatch(doneFetchingUsers(snapshot.val()));
        });
    };
};

export var updateCompaint = function (userId, complaintId) {
    return function (dispatch, getState) {
        var complaint = refFirebase.ref(`users/${userId}/complaints/${complaintId}`);
        complaint.once('value').then(function (snapshot) {
            var complaintStatus = snapshot.val().completed;
            complaint.update({completed: !complaintStatus});
        }, function (error) {
            console.error(error);
        });
    };
};

export var updateCrimeStatus = function (userId, crimeId) {
    return function (dispatch, getState) {
        var crime = refFirebase.ref(`users/${userId}/crimes/${crimeId}`);
        crime.once('value').then(function (snapshot) {
            var crimeStatus = snapshot.val().completed;
            crime.update({completed: !crimeStatus});
        }, function (error) {
            console.error(error);
        });
    };
};

export var updateMissingStatus = function (userId, missingId) {
    return function (dispatch, getState) {
        var missing = refFirebase.ref(`users/${userId}/missings/${missingId}`);
        missing.once('value').then(function (snapshot) {
            var missingStatus = snapshot.val().completed;
            missing.update({completed: !missingStatus});
        }, function (error) {
            console.error(error);
        });
    };
};


export var requestSentTo = function (user) {
    return ({
        type: "REQUEST SENT",
        user: user,
    });
};
export var requestUser = function (key) {
    return function (dispatch, getState) {
        var state = getState();
        var id = state.loginsignupReducer.uid;
        var requestObject = {};
        var currentUser = refFirebase.ref(`users/${id}`);
        currentUser.once('value').then(function (snapshot) {
            var thisUser = snapshot.val();
            requestObject.uid = id;
            requestObject.name = thisUser.name;
            requestObject.phone = thisUser.phone;
            requestObject.address = thisUser.address;
            requestObject.bloodType = thisUser.bloodType;
            var userRequests = refFirebase.ref(`users/${key}/requests`);
            userRequests.push(requestObject);
            dispatch(requestSentTo(key));

        });

    };
};

export var getCurrentUserRequests = function (userRequests) {
    return ({
        type: "GET_ALL_REQUESTS",
        requests: userRequests,
    });
};
export var getRequests = function () {
    return function (dispatch, getState) {
        dispatch(startFetching());
        var state = getState();
        var id = state.loginsignupReducer.uid;
        var currentUserRequests = refFirebase.ref(`users/${id}/requests`);
        currentUserRequests.on('value', function (snapshot) {
            dispatch(getCurrentUserRequests(snapshot.val()));

        });
    };
};


