import React, {Component} from 'react';
import StatsList from './StatsList';
import Forecast from './Forecast';

export default class Weather extends Component {

    componentWillMount = () => {
        this.props.actions.getWeather(this.props.state.city);
    };

    changeCity = (e) => {
        e.preventDefault();

        const
            city = this.refs.city.value,
            forecast = this.refs.forecast.checked;

        if (city.trim()) {
            this.props.actions.getWeather(city);

            if(forecast){
                this.props.actions.getForecast(city);
            }
        }
    };

    render() {
        const {state} = this.props;

        return (
            <div className="weather container">
                <div className="row">
                    <h1 className="col-md-12">Погода в городе {this.props.state.city}</h1>
                </div>
                <div className="row">
                    <div className="city col-md-6">
                        <form action="/" className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="city" className="col-md-2">Город</label>

                                <div className="col-md-10">
                                    <input type="text" id="city" list="city-list" name="city" ref="city"
                                           defaultValue={this.props.state.city}
                                           className="form-control" 
                                        />
                                    <datalist name="city-list" id="city-list">
                                        <option value="Москва">Москва</option>
                                        <option value="Лондон">Лондон</option>
                                        <option value="Липецк">Липецк</option>
                                        <option value="Париж">Париж</option>
                                    </datalist >
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10 col-md-offset-2">
                                    <div className="checkbox">
                                        <label htmlFor="forecast">
                                            <input type="checkbox" name="forecast" id="forecast" ref="forecast"/>
                                            Погода на 5 дней
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-10 col-md-offset-2">
                                    <button type="submit" onClick={this.changeCity} className="btn btn-success">Поиск
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        state.status === 'current' || state.status === 'forecast' ?
                            <StatsList data={state.data} width={6} title={'Сейчас ' + new Date().toLocaleString('ru')}/>
                            : state.status === 'load' ?
                            <div>load...</div>
                            :
                            <div>error</div> 
                    }
                </div>
                {
                    state.status === 'forecast' ?
                        <Forecast list={state.list}/>
                        : ''
                }
            </div>
        );
    }
}