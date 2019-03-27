import React, { Component } from 'react';
import { get } from '../js/xhr';

class LocationCard extends Component{
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
        get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4e262f77fbfc100ee6fca720cc13e5e5&units=metric`)
        .then((response) => {
            const weather = JSON.parse(response);
            
            this.setState({
                isLoaded : true,
                imageCode: weather.weather[0].icon,
                temp: Math.round(weather.main.temp),
                lastCalc: this.convertToLocalTime(weather.dt)
            })
          }, (error) => {
            this.setState({
                isLoaded : true,
                error
            })
          })
    }

    /**
     * Converts unix to readable timestamp
     * @param {string} utc The unix value to be converted
     */
    convertToLocalTime = (unix) =>{
        const date = new Date(unix*1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    handleReloadLocation = (e) =>{
        
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
                                <div className="icon">
                                    <img src={require(`../images/wheater/${this.state.imageCode}.png`)} alt="" />
                                </div>
                                <div className="temp">
                                    <p>{this.state.temp}<span>°C</span></p>
                                </div>
                            </div>
                            <div className="location__timestamp">
                                <p>Last calculation: {this.state.lastCalc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LocationCard;