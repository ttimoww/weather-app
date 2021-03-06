import React, { Component } from 'react';
import { get } from '../js/xhr';
import LocationLastCalc from './LocationLastCalc';
import LocationLocalTime from './LocationLocalTime';

class Location extends Component{
    constructor(){
        super();
        this.state = {
            error: null,
            isLoaded: false,
            imageCode: '01d'
        }
    }

    /**
     * Get the current weather based on city name
     * @param {string} city The name of the city to get the data from
     */
    getCurrentWeather = (city) =>{
        get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_OPENWEATHER}&units=metric`)
        .then((response) => {
            const weather = JSON.parse(response);
            this.setState({
                isLoaded : true,
                imageCode: weather.weather[0].icon,
                temp: Math.round(weather.main.temp),
                lastCalc: weather.dt,
                lon: weather.coord.lon,
                lat: weather.coord.lat
            })
          }, (error) => {
            this.setState({
                isLoaded : true,
                error
            })
          })
    }

    handleReloadLocation = (e) =>{
        this.getCurrentWeather(this.props.cityName);
    }

    handleRemoveLocation = () =>{
        this.props.removeLocation(this.props.id);
    }

    componentDidMount(){
        this.getCurrentWeather(this.props.cityName);
    }

    render(){
        //In case of loading
        if (!this.state.isLoaded){
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" alt="Remove location"></i>
                    <div className="location__container">
                        <div className="location__loading">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                </div>
            )
        }
        
        //In case of error
        else if (this.state.error) {
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" onClick={this.handleRemoveLocation} alt="Remove location"></i>
                    <div className="location__container">
                        <div className="location__error">
                            <h2>{this.props.cityName}</h2>
                            <p>Can not find current weather data</p>
                        </div>
                    </div>
                </div>
            )
        }

        //In case of valid city
        else if (!this.state.error){
            return(
                <div className="location">
                    <i className="fas fa-times-circle remove-location" onClick={this.handleRemoveLocation} alt="Remove location"></i>
                    <i className="fas fa-sync-alt reload-location" onClick={this.handleReloadLocation} alt="Reload location"></i>
                    <div className="location__container">
                        <div className="location__loaded">
                            <h2>{this.props.cityName}</h2>
                            <div className="location__weather">
                                <div className="temp">
                                    <p>{this.state.temp}<span>°C</span></p>
                                </div>
                                <div className="icon">
                                    <img src={require(`../images/wheater/${this.state.imageCode}.png`)} alt="" />
                                </div>
                            </div>
                            <LocationLocalTime lat={this.state.lat} lon={this.state.lon} />
                            <LocationLastCalc unix={this.state.lastCalc} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Location;