var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
import {CircularProgress, Table, TableHeader, TableBody, TableRow, TableHeaderColumn} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var actions = require('./../actions/index');
var Navbar = require('Navbar');
var UsersList = require('UsersList');
var UserMain = React.createClass({
        getChildContext: function () {
            return {muiTheme: getMuiTheme(baseTheme)};
        },
        componentDidMount: function () {
            this.props.getUsers();
        },
        render: function () {
            if (this.props.usersObject.fetching) {
                return (<CircularProgress />);
            }
            else {
                if (this.props.usersObject.users) {
                    var users = this.props.usersObject.users;
                    return (
                        <div>
                            <Navbar></Navbar>
                            <h3>Home</h3>
                            <Table>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Blood Type</TableHeaderColumn>
                                        <TableHeaderColumn>Phone Number</TableHeaderColumn>
                                        <TableHeaderColumn>Request Donation</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        Object.keys(users).map(function (key) {
                                            if(key!=this.props.currentUser.uid)
                                            return (
                                                <UsersList userKey={key} key={key} user={users[key]}></UsersList>
                                            );
                                        }.bind(this))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    );
                }
            }
        }
    }
);

UserMain.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {
        usersObject: state.usersFetchingReducer,
        currentUser: state.loginsignupReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers: actions.getAllUsers,
        logout: actions.logoutStart,

    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(UserMain);