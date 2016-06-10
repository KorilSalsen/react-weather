import React, {Component} from 'react';
import StatsList from './StatsList';

export default class Forecast extends Component {
    render() {
        const {list} = this.props;

        const forecast = list.map(function (data, i) {
            return (
                <li className="col-md-6 forecast-list-item" key={i}>
                    <h4>Дата {data['dt_txt']}</h4>
                    <StatsList data={data} width={12}/>
                </li>
            );
        });

        return (
            <ul className="row list-unstyled">
                {forecast}
            </ul>
        );
    }
}