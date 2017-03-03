var React = require("react");
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
var NoLoginNavbar = require('NoLoginNavbar');
var Navbar = require('Navbar');
var UsersList = require('UsersList');
import {TextField, FlatButton} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {CircularProgress, Table, TableHeader, TableBody, TableRow, TableHeaderColumn} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var Crimes = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },
    componentDidMount: function () {
        this.props.getAllUsers();
    },
    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        if (this.props.currentuser.uid) {
            if (this.props.users.fetching) {
                return (
                    <div>
                        <Navbar></Navbar>
                        <h1>Crimes</h1>
                        <CircularProgress></CircularProgress>
                    </div>
                );
            }
            else {
                if (this.props.users.users) {
                    var users = this.props.users.users;

                    return (
                        <div>
                            <Navbar></Navbar>
                            <h1>Crimes</h1>
                            <Table>

                                <TableBody>
                                    {
                                        Object.keys(users).map(function (key) {
                                            var userCrimes = users[key].crimes;
                                            if (userCrimes) {
                                                return (
                                                    <UsersList userKey={key} key={key} crime={userCrimes}></UsersList>
                                                );
                                            }
                                            else return null;
                                        }.bind(this))
                                    }
                                </TableBody>
                            </Table>

                        </div>
                    );
                }
            }
        }
        else {
            if (this.props.users.fetching) {
                return (
                    <div>
                        <NoLoginNavbar></NoLoginNavbar>
                        <h1>Crimes</h1>
                        <CircularProgress></CircularProgress>
                    </div>
                );
            }
            else {
                if (this.props.users.users) {
                    var users = this.props.users.users;

                    return (
                        <div>
                            <NoLoginNavbar></NoLoginNavbar>
                            <h1>Crimes</h1>
                            <Table>
                                <TableBody>
                                    {
                                        Object.keys(users).map(function (key) {
                                            var userCrimes = users[key].crimes;
                                            if (userCrimes) {
                                                return (
                                                    <UsersList userKey={key} key={key} crime={userCrimes}></UsersList>
                                                );
                                            } else return null;
                                        }.bind(this))
                                    }
                                </TableBody>
                            </Table>

                        </div>
                    );
                }
                else{
                    return(<p>No records</p>);
                }
            }
        }
    }
});


Crimes.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {
        currentuser: state.loginsignupReducer,
        users: state.usersFetchingReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllUsers: actions.getAllUser,

    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(Crimes);