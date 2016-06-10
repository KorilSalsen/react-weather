import {
    WEATHER_REQUEST,
    WEATHER_SUCCESS,
    WEATHER_ERROR,
    FORECAST_SUCCESS
} from '../constants/Weather';



const
    apiKey = 'f62ffc23f38cb4e279f975075a5eb20a',
    url = 'http://api.openweathermap.org/data/2.5/';

export function getWeather(city) {
    return (dispatch) => {
        dispatch({
            type: WEATHER_REQUEST
        });

        const
            type = 'weather',
            getLink = url + type + '?q=' + city + '&appid=' + apiKey + '&units=metric';

        $.get(getLink)
            .done((data) => {
                if(data.cod == 200){
                    dispatch({
                        type: WEATHER_SUCCESS,
                        payload: {data, city}
                    });
                } else {
                    dispatch({
                        type: WEATHER_ERROR
                    });
                }
            })
            .fail(() => {
                dispatch({
                    type: WEATHER_ERROR
                });
            });
    }
}

export function getForecast(city) {
    return (dispatch) => {
        const
            type = 'forecast',
            getLink = url + type + '?q=' + city + '&appid=' + apiKey + '&units=metric';

        $.get(getLink)
            .done((data) => {
                if(data.cod == 200){
                    dispatch({
                        type: FORECAST_SUCCESS,
                        payload: data.list
                    });
                }
            });
    }
}