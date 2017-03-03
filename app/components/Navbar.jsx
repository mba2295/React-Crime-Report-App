import {AppBar, Tabs, Tab, FlatButton} from 'material-ui'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var {connect} = require('react-redux');
var React = require('react')
var {hashHistory}=require('react-router');
var {connect} = require('react-redux');
var actions = require('./../actions/index');
var {bindActionCreators}=require('redux');

var Navbar = React.createClass(
    {
        getInitialState: function () {
            return {initialTab: 0,};
        },
        getChildContext: function () {
            return {muiTheme: getMuiTheme(baseTheme)};
        },
        componentDidMount: function () {
            this.checkLocation();
        },
        checkTouch: function (value) {
            console.log('loooo', value);
            switch (value) {
                case 0: {
                    hashHistory.push('/newcrime')
                    this.setState({initialTab: 0})
                    break;
                }
                case 1:
                    hashHistory.push('/newcomplaints')
                    this.setState({initialTab: 1})
                    break;
                case 2:
                    hashHistory.push('/newmissing')
                    this.setState({initialTab: 2})
                    break;
                case 3:
                    hashHistory.push('/crimes')
                    this.setState({initialTab: 3})
                    break;
                case 4:
                    hashHistory.push('/missings')
                    this.setState({initialTab: 4})
                    break;
                case 5:
                    hashHistory.push('/complaints')
                    this.setState({initialTab: 5})
                    break;
                default:
                    hashHistory.push('/complaints')
                    this.setState({initialTab: 5})


            }
        },
        checkLocation: function () {
            if (window.location.href.indexOf('newcrime') > -1) {
                this.setState({initialTab: 0})
            } else if (window.location.href.indexOf('newcomplaints') > -1) {
                this.setState({initialTab: 1})
            } else if (window.location.href.indexOf('newmissing') > -1) {
                this.setState({initialTab: 2})
            } else if (window.location.href.indexOf('crimes') > -1) {
                this.setState({initialTab: 3})
            } else if (window.location.href.indexOf('missings') > -1) {
                this.setState({initialTab: 4})
            } else if (window.location.href.indexOf('complaints') > -1) {
                this.setState({initialTab: 5})
            }
        },
        render: function () {
            var styles = {
                appBar: {
                    flexWrap: 'wrap'
                },
                tabs: {
                    width: '80%'
                },
                buttonStyle: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
            };
            return (
                <AppBar showMenuIconButton={false} style={styles.appBar} title="CrimeReport App">
                    <Tabs value={this.state.initialTab} style={styles.tabs} onChange={this.checkTouch}>
                        <Tab value={0} label="NewCrime"/>
                        <Tab value={1} label="NewComplaint"/>
                        <Tab value={2} label="NewMissing"/>
                        <Tab value={3} label="Crimes"/>
                        <Tab value={4} label="Missings"/>
                        <Tab value={5} label="Complaints"/>
                    </Tabs>
                    <div>
                        <FlatButton onClick={this.props.logout} style={styles.buttonStyle} label="Logout"/>
                    </div>
                </AppBar>
            );
        }
    });

Navbar.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        loginorSignin: state.loginsignupReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: actions.logoutStart,
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(Navbar);