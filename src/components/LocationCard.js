import React, { Component } from 'react';
import { get } from '../js/xhr';

class LocationCard extends Component{

    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            imageCode: '01n',
            temp: '',
            localTime: ''
        }
    }

    componentWillMount(){
        get(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.cityName}&APPID=4e262f77fbfc100ee6fca720cc13e5e5&units=metric`)
        .then(function(response) {
            const weather = JSON.parse(response);
            console.log(weather);
          }, function(error) {
            console.error("Failed!", error);
          })
          
    }

    render(){
        return(
            <div className="location">
                <i className="fas fa-times-circle"></i>
                <div className="location__container">
                    <h2>{this.props.cityName}</h2>
                    <div className="location__wheater">
                        <div className="location__wheater__image">
                            <img src={require(`../images/wheater/${this.state.imageCode}.png`)} alt="" />
                        </div>
                        <div className="location__wheater__temp">
                           <p>{this.state.temp}</p>
                         </div>
                    </div>
                    <div className="location__timestamp">
                        <p>Local Time: {this.state.localTime}</p>
                    </div>
                </div>
    
            </div>
        )
    }
}

export default LocationCard;