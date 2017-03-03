var React = require("react");
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
var Navbar = require('Navbar');
import {TextField,SelectField,MenuItem, FlatButton} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var ComplaintFrom = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    AddComplaint: function (e) {
        e.preventDefault();
        var crimeObject = {};
        crimeObject.reason = this.refs.reason.getValue();
        crimeObject.complaint = this.refs.complaint.getValue();
        crimeObject.date = this.refs.date.getValue();
        crimeObject.location = this.state.location;
        crimeObject.description = this.refs.description.getValue();
        crimeObject.completed = false;
        if (this.refs.location.getValue() && this.refs.complaint.getValue() && this.refs.description.getValue())
            this.props.addComplaint(crimeObject);
    },
    getInitialState: function () {
        return ({
            location: "Karachi",
        });
    },

    handleSelectFieldChange: function (event, index, value) {
        console.log(value);
        this.setState({location: value});
    },

    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        return (
            <div>
                <Navbar></Navbar>
                <h1>Complaint Form</h1>
                <form onSubmit={this.loginToAccount}>
                    <div>
                        <TextField ref="complaint"
                                   type="text"
                                   hintText="Compalint"
                        /><br />
                        <TextField ref="description"
                                   type="text"
                                   hintText="Description"
                        /><br />
                        <TextField ref="date"
                                   type="date"
                                   hintText="Date"
                        /><br />
                        <TextField ref="reason"
                                   type="text"
                                   hintText="Reason"
                        /><br />
                        <SelectField
                            floatingLabelText="Blood Group"
                            value={this.state.location}
                            onChange={this.handleSelectFieldChange}
                        >
                            <MenuItem value={'Karachi'} primaryText="Karachi"/>
                            <MenuItem value={'Lahore'} primaryText="Lahore"/>
                            <MenuItem value={'Islamabad'} primaryText="Islamabad"/>
                        </SelectField>
                        <br/>
                        <FlatButton style={styles.buttonStyle} onClick={this.AddComplaint}>Submit</FlatButton>
                    </div>
                </form>
            </div>
        );
    }
});


ComplaintFrom.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addComplaint: actions.addComplaint,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(ComplaintFrom);