var React = require('react');
var ReactDOM = require('react-dom');
var Login = require('Login');
var UserMain = require('UserMain');
var Crimes = require('Crimes');
var Complaints = require('Complaints');
var Missings = require('Missings');
var CrimeForm = require('CrimeForm');
var ComplaintForm = require('ComplaintForm');
var MissingForm = require('MissingForm');
var SignUp = require('SignUp');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider}=require('react-redux');
var store = require('./store/configureStore').storeConfig();
var {myFirebase, refFirebase}=require('app/firebase/');
var actions = require('./actions/index');
import injectTapEventPlugin from 'react-tap-event-plugin';

store.dispatch(actions.startFetching());
var currentState = store.getState();
store.subscribe(function () {
    console.log('Current store state:', currentState);
});


var loginRequired = function (nextState, replace, next) {
    if (!myFirebase.auth().currentUser) {
        replace('/');
    }
    next();
};
var ifLogedIn = function (nextState, replace, next) {
    if (myFirebase.auth().currentUser) {
        replace('/crimes');
    }
    next();
};
myFirebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        store.dispatch(actions.setUidOnLogin(user.uid));
        store.dispatch(actions.startFetching());
        hashHistory.push('/crimes');
    }
    else {
        store.dispatch(actions.logout());
        hashHistory.push('/');
    }
});

injectTapEventPlugin();

//window.onunload = myFirebase.auth().signOut();
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/'>
                <Route path='crimes' component={Crimes}></Route>
                <Route path='missings' component={Missings}></Route>
                <Route path='newcrime' component={CrimeForm} onEnter={loginRequired}></Route>
                <Route path='newmissing' component={MissingForm} onEnter={loginRequired}></Route>
                <Route path='complaints' component={Complaints} onEnter={loginRequired}></Route>
                <Route path='newcomplaints' component={ComplaintForm} onEnter={loginRequired}></Route>
                <IndexRoute component={Login} onEnter={ifLogedIn}></IndexRoute>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app')
);
