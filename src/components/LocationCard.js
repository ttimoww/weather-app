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
        .then((response) => {
            const weather = JSON.parse(response);
            console.log(weather);
            this.setState({
                isLoaded : true,
                imageCode: weather.weather[0].icon,
                temp: Math.round(weather.main.temp),
                localTime: ''
            })
          }, (error) => {
            console.log(`${this.props.cityName} is not a valid city name`);
            this.setState({
                isLoaded : true,
                error
            })
          })
    }

    render(){
        //In case of error
        if (this.state.error) {
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" ></i>
                    <div className="location__container">
                        <div className="location__error">
                            <h2>{this.props.cityName}</h2>
                            <p>is not a valid city name.</p>
                        </div>
                    </div>
                </div>
            )
        }

        //In case of valid city
        else if (!this.state.error){
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" ></i>
                    <div className="location__container">
                        <div className="location__loaded">
                            <h2>{this.props.cityName}</h2>
                            <div className="location__weather">
                                <div className="icon">
                                    <img src={require(`../images/wheater/${this.state.imageCode}.png`)} alt="" />
                                </div>
                                <div className="temp">
                                    <p>{this.state.temp}<span>°C</span></p>
                                </div>
                            </div>
                            <div className="location__localtime"></div>
                        </div>
                    </div>
                </div>
            )
        }

        //Else: loading
        else{
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" ></i>
                    <div className="location__container">
                        <div className="location__loading">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LocationCard;