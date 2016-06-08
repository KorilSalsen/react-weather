import {
    WEATHER_REQUEST,
    WEATHER_SUCCESS,
    WEATHER_ERROR
} from '../constants/Weather';

export function getWeather(city) {
    return (dispatch) => {
        dispatch({
            type: WEATHER_REQUEST
        });

        const
            apiKey = 'f62ffc23f38cb4e279f975075a5eb20a',
            url = 'http://api.openweathermap.org/data/2.5/weather',
            getLink = url + '?q=' + city + '&appid=' + apiKey + '&units=metric';

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