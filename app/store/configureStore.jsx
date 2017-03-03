var Redux = require('redux');
var {loginsignupReducer, usersFetchingReducer}=require('./../reducers/index');
var thunk = require('redux-thunk').default;

export var storeConfig = function () {
    var reducer = Redux.combineReducers({

        loginsignupReducer: loginsignupReducer,
        usersFetchingReducer: usersFetchingReducer,
    });

    var store = Redux.createStore(reducer, Redux.applyMiddleware(thunk));

    return store;
}