export var loginsignupReducer = function (state = {}, action) {

    switch (action.type) {

        case "ISLOGINGORSIGNUP":
            var newState = Object.assign({}, state, {isSigning: action.isSinging});
            return newState;

        case 'LOGIN':
            console.log("In LOGINLOGOUTREDUCER", action.uid);
            var newState = Object.assign({}, state, {uid: action.uid});
            return newState;

        case "LOGINCHECK":
            console.log("at reducer", action.role);
            var newState = Object.assign({}, state, {role: action.role});
            return newState;

        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};


export var usersFetchingReducer = function (state = {}, action) {

    switch (action.type) {

        case"STARTING_FETCHING":
            var newState = Object.assign({}, state, {fetching: true});
            return newState;
        case"DONE_FETCHING_USERS":
            var newState = Object.assign({}, state, {fetching: false, users: action.users});
            return newState;
        case"REQUEST_SENT":
            var newState = Object.assign({}, state, {requestedUser: action.user});
            return newState;

        case"GET_ALL_REQUESTS":
            var newState = Object.assign({}, state, {fetching: false, userRequests: action.requests});
            return newState;
        default:
            return state;
    }
};
