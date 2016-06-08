import {WEATHER_REQUEST, WEATHER_SUCCESS, WEATHER_ERROR} from '../constants/Weather';

const initialState = {
    data: {},
    status: 'empty',
    city: 'Лондон'
};

export default function weather(state = initialState, action = undefined) {
    switch (action.type) {
        case(WEATHER_REQUEST):
            return {...state, status: 'load'};
        case(WEATHER_SUCCESS):
            const {data, city} = action.payload;
            return {...state, status: 'success', data, city};
        case(WEATHER_ERROR):
            return {...state, status: 'error', data: {}};
        default:
            return state;
    }
}