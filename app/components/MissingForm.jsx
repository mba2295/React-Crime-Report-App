var React = require("react");
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
var Navbar = require('Navbar');
import {TextField,SelectField,MenuItem, FlatButton} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

var MissingForm = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    AddMissing: function (e) {
        e.preventDefault();
        var crimeObject = {};
        crimeObject.location = this.state.location;
        crimeObject.person = this.refs.person.getValue();
        crimeObject.date = this.refs.date.getValue();
        crimeObject.description = this.refs.description.getValue();
        crimeObject.completed = false;
        if (this.refs.location.getValue() && this.refs.person.getValue() && this.refs.description.getValue())
            this.props.addMissing(crimeObject);
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
                <h1>Missing Form</h1>
                <form onSubmit={this.loginToAccount}>
                    <div>
                        <TextField ref="person"
                                   type="text"
                                   hintText="Missing Person Name"
                        /><br />
                        <TextField ref="description"
                                   type="text"
                                   hintText="Description"
                        /><br />
                        <TextField ref="date"
                                   type="date"
                                   hintText="Date"
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
                        <FlatButton style={styles.buttonStyle} onClick={this.AddMissing}>Submit</FlatButton>
                    </div>
                </form>
            </div>
        );
    }
});


MissingForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addMissing: actions.addMissing,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(MissingForm);