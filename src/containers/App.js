import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';;
import * as weatherActions from '../actions/weatherActions';
import Weather from '../components/Weather';



export default class App extends Component {
    render() {
        const { weather} = this.props;
        const {weatherActions} = this.props.actions;

        return (
            <div className="app">
                <Weather state={weather} actions={weatherActions}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        weather: state.weather
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            weatherActions: bindActionCreators(weatherActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);