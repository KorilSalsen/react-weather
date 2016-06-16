import React, {Component} from 'react';
import StatsList from './StatsList';

export default class Forecast extends Component {
    render() { 
        const {list} = this.props;
        let
            forecast = [],
            tmpObj = {};

        list.forEach(function (data, i) {
            const
                date = new Date(data.dt * 1000),
                dateString = date.toLocaleString('ru', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });

            if (tmpObj[dateString] === undefined) {
                tmpObj[dateString] = [];
            }

            tmpObj[dateString].push(
                <StatsList
                    key={i}
                    data={data}
                    width={2}
                    title={'Время ' + new Date(data.dt * 1000).toLocaleString('ru', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                />
            );
        });

        for (let date in tmpObj) {
            forecast.push({
                date: date,
                weather: tmpObj[date]
            });
        }

        console.log(forecast);

        const rows = forecast.map(function (obj, i) {
            return (
                <li className="col-md-12" key={i}>
                    <div className="row">
                        <div className="col-md-2">{obj.date}</div>
                        {obj.weather.slice(0, 5)}
                    </div>
                </li>
            );
        });

        return (
            <ul className="row list-unstyled">
                {rows}
            </ul>
        );
    }
}