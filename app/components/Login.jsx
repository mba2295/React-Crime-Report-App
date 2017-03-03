var React = require("react");
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
var NoLoginNavbar = require('NoLoginNavbar');
import {TextField, FlatButton} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var SignUp = require('SignUp');

var Login = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    changeToSignUp: function (signup) {
        this.props.loginOrSignup(signup);
    },

    loginToAccount: function (e) {
        e.preventDefault();
        if(this.refs.email.getValue() &&  this.refs.password.getValue())
        this.props.loginStart(this.refs.email.getValue(), this.refs.password.getValue());
    },
    render: function () {
        if (this.props.loginorSignin.isSigning == 'signup') {
            return (
                <SignUp></SignUp>
            );
        }
        else {
            var styles = {
                buttonStyle: {
                    backgroundColor: 'rgb(0, 188, 212)',
                },
            };
            return (
                <div>
                    <NoLoginNavbar></NoLoginNavbar>
                    <h4>Login</h4>
                    <form onSubmit={this.loginToAccount}>
                        <div>
                            <TextField ref="email"
                                       type="email"
                                       hintText="Your Email"
                            /><br />
                            <TextField ref="password"
                                       type="password"
                                       hintText="Password"
                            /><br />
                            <FlatButton style={styles.buttonStyle} onClick={this.loginToAccount}>Login</FlatButton>
                        </div>
                    </form>
                    or
                    <br/>
                    <FlatButton style={styles.buttonStyle} onClick={this.changeToSignUp.bind(this, 'signup')}>Register</FlatButton>
                </div>
            );
        }
    },
});


Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {
        loginorSignin: state.loginsignupReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loginOrSignup: actions.loginOrSignUp,
        loginStart: actions.loginStart,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(Login);