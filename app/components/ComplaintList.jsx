var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
import {FlatButton, TableRow, TableRowColumn, TableBody} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';

var ComplaintList = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },
    updateComplaintStatus: function (key) {
        var userId = this.props.userKey;
        this.props.updateComplaintStatus(userId, key)
    },

    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        var items = this.props.complaint;
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
                                    <h3>Complaint:{items[key].complaint}</h3>
                                    <div>Description:{items[key].description}</div>
                                    <div>Date:{items[key].date}</div>
                                    <div>Reason:{items[key].reason}</div>
                                    <div>Competed:{status}</div>
                                    <FlatButton style={styles.buttonStyle} onClick={this.updateComplaintStatus.bind(this, key)}>Update
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
        } else
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
                                    <h3>Complaint:{items[key].complaint}</h3>
                                    <div>Description:{items[key].description}</div>
                                    <div>Date:{items[key].date}</div>
                                    <div>Reason:{items[key].reason}</div>
                                    <div>Competed:{status}</div>
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
ComplaintList.childContextTypes = {
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
        request: actions.requestUser,
        updateComplaintStatus: actions.updateCompaint,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(ComplaintList);