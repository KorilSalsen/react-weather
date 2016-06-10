import {
    WEATHER_REQUEST,
    WEATHER_SUCCESS,
    WEATHER_ERROR,
    FORECAST_SUCCESS
} from '../constants/Weather';

const initialState = {
    data: {},
    status: 'empty',
    city: 'Лондон',
    list: []
};

export default function weather(state = initialState, action = undefined) {
    switch (action.type) {
        case(WEATHER_REQUEST):
            return {...state, status: 'load'};
        case(WEATHER_SUCCESS):
            const {data, city} = action.payload;

            return {...state, status: 'current', data, city};
        case(WEATHER_ERROR):
            return {...state, status: 'error', data: {}};
        case(FORECAST_SUCCESS):
            return {...state, status: 'forecast', list: action.payload};
        default:
            return state;
    }
}