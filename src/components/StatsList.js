import React, {Component} from 'react';

export default class StatsList extends Component {
    render() {
        const {data, width} = this.props;

        return (
            <ul className={'list-unstyled col-md-' + width}>
                <li>Температура: {data.main.temp}&deg;C</li>
                <li className="row">
                    <div className="col-md-6">
                        Скорость ветра: {data.wind.speed}м/с
                    </div>
                    <div
                        className="glyphicon glyphicon-arrow-right col-md-1"
                        style={{
                                transform: 'rotate(' + data.wind.deg + 'deg)'
                                }}>
                    </div>
                </li>
                < li > Влажность воздуха: {data.main.humidity}%</li>
                <li>Атмосферное давление: {(data.main.pressure / 1.33).toFixed(2)}мм ртутного
                    столба
                </li>
                <li>Облачность: {data.clouds.all}%</li>
            </ul>
        );
    }
}