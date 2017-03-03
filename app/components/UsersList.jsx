var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
import {FlatButton, TableRow, TableRowColumn} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';

var UsersList = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    updateCrimeStatus: function (key) {
        var userId = this.props.userKey;
        this.props.updateCrimeStatus(userId, key)
    },
    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        var items = this.props.crime;
        if (this.props.currentUser.uid == 'XnjJVFkOH4QCr6yu71BsB5XPoOa2') {
            return (
                <TableRow>
                    {
                        Object.keys(items).map(function (key) {
                            var status = 'No';
                            if (items[key].completed == true) {
                                status = 'Yes';
                            }
                            return (
                                <div key={key}>
                                    <br/>
                                    <div>Crime:{items[key].crime}</div>
                                    <div>Description:{items[key].description}</div>
                                    <div>Date:{items[key].date}</div>
                                    <div>Location:{items[key].location}</div>
                                    <div>Investigation Complete:{status}</div>
                                    <FlatButton style={styles.buttonStyle}
                                                onClick={this.updateCrimeStatus.bind(this, key)}>Update
                                        Status</FlatButton>
                                    <br/>
                                    <br/>
                                    <hr/>
                                </div>
                            );
                        }.bind(this))
                    }
                </TableRow>
            );
        }
        else
            return (
                <TableRow>
                    {
                        Object.keys(items).map(function (key) {
                            var status = 'No';
                            if (items[key].completed == true) {
                                status = 'Yes';
                            }
                            return (
                                <div key={key}>
                                    <br/>
                                    <h3>Crime:{items[key].crime}</h3>
                                    <div>Description:{items[key].description}</div>
                                    <div>Date:{items[key].date}</div>
                                    <div>Location:{items[key].location}</div>
                                    <div>Completed:{status}</div>
                                    <br/>
                                    <br/>
                                    <hr/>
                                </div>
                            );
                        })
                    }
                </TableRow>
            );
    },
});
UsersList.childContextTypes = {
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
        updateCrimeStatus: actions.updateCrimeStatus,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(UsersList);