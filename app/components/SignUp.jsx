var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
import {TextField, FlatButton, SelectField, MenuItem} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var Signup = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    signupToAccount: function (e) {
        e.preventDefault();
        var userObject = {};
        var credentials = {};
        userObject.name = this.refs.name.getValue();
        userObject.email = this.refs.email.getValue();
        credentials.email = this.refs.email.getValue();
        credentials.password = this.refs.password.getValue();
        userObject.phone = this.refs.phone.getValue();
        userObject.bloodType = this.state.bloodType;
        userObject.address = this.refs.address.getValue();
        if (this.refs.phone.getValue() && this.state.bloodType && this.refs.address.getValue())
            this.props.signupStart(userObject, credentials);
    },
    getInitialState: function () {
        return ({
            bloodType: "A+",
        });
    },

    handleSelectFieldChange: function (event, index, value) {
        console.log(value);
        this.setState({bloodType: value});
    },
    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        return (
            <div className="container">
                <h3>Register</h3>
                <form onSubmit={this.loginToAccount}>
                    <div>
                        <TextField ref="name"
                                   type="text"
                                   hintText="your name"
                        /><br />
                        <TextField ref="email"
                                   type="email"
                                   hintText="your email"
                        /><br />
                        <TextField ref="password"
                                   type="password"
                                   hintText="password"

                        /><br />
                        <TextField ref="phone"
                                   type="number"
                                   hintText="Phone Number"

                        />
                        <br/>

                        <SelectField
                            floatingLabelText="Blood Group"
                            value={this.state.bloodType}
                            onChange={this.handleSelectFieldChange}
                        >
                            <MenuItem value={'A+'} primaryText="A+"/>
                            <MenuItem value={'A-'} primaryText="A-"/>
                            <MenuItem value={'B+'} primaryText="B+"/>
                            <MenuItem value={'B-'} primaryText="B-"/>
                            <MenuItem value={'AB+'} primaryText="AB+"/>
                            <MenuItem value={'AB-'} primaryText="AB-"/>
                            <MenuItem value={'O+'} primaryText="O+"/>
                            <MenuItem value={'O-'} primaryText="O-"/>
                        </SelectField>
                        <br/>
                        <TextField ref="address"
                                   type="text"
                                   hintText="Address"
                        />
                        <br/>
                        <FlatButton style={styles.buttonStyle} onClick={this.signupToAccount}>Register</FlatButton>
                        <br/>
                    </div>
                </form>
            </div>
        );
    }
});

Signup.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        signupStart: actions.signupStart,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(Signup);