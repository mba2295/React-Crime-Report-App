var React = require("react");
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
var NoLoginNavbar = require('NoLoginNavbar');
var Navbar = require('Navbar');
var MissingList = require('MissingList');
var ComplaintList = require('ComplaintList');
import {TextField, FlatButton} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {CircularProgress, Table, TableHeader, TableBody, TableRow, TableHeaderColumn} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var Complaints = React.createClass({

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
        if (this.props.currentuser.uid != undefined) {
            if (this.props.users.fetching) {
                return (
                    <div>
                        <Navbar></Navbar>
                        <h1>Missings</h1>
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
                            <h1>Missings</h1>
                            <Table>
                                <TableBody>
                                    {
                                        Object.keys(users).map(function (key) {
                                            var userMissings = users[key].missings;
                                            if (userMissings) {
                                                return (
                                                    <MissingList userKey={key} key={key}
                                                                   missings={userMissings}></MissingList>
                                                );
                                            } else return null;
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
            if (this.props.users.users) {
                var users = this.props.users.users;

                return (
                    <div>
                        <NoLoginNavbar></NoLoginNavbar>
                        <h1>Missings</h1>
                        <Table>
                            <TableBody>
                                {
                                    Object.keys(users).map(function (key) {
                                        var userMissings = users[key].missings;
                                        if (userMissings) {
                                            return (
                                                <MissingList userKey={key} key={key} missings={userMissings}></MissingList>
                                            );
                                        } else return null;
                                    }.bind(this))
                                }
                            </TableBody>
                        </Table>

                    </div>
                );
            }
            else {
                return (<p>No records</p>);
            }
        }
    }
});


Complaints.childContextTypes = {
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

module.exports = connect(mapStateToProps, matchDispatchToProps)(Complaints);