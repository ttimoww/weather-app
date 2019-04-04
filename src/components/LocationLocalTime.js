import React, { Component } from 'react';

class LocationLocalTime extends Component {
    constructor(props){
        super();
        this.state = {
            lat: props.lat,
            lon: props.lon
        }
    }

    /**
     * Init the local time clock by getting the location's unix time
     * and setting an interval
     */
    initClock(){
        // Get unix
        const timestamp = new Date().getTime()/1000;
        fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.lat},${this.state.lon}&timestamp=${timestamp}&key=${process.env.REACT_APP_GOOGLE_TIMEZONE}`)
        .then(resp => resp.json())        
        .then(data => this.setState({locationTimestamp: timestamp + data.dstOffset + data.rawOffset}));
        
        this.timestampTicker = setInterval(() => {
            this.setState((prevState) => {
                return{
                    locationTimestamp: prevState.locationTimestamp += 1
                }
            });
        }, 1000);

        
    }

    
    /**
     * Converts unix to readable timestamp
     * @param {string} utc The unix value to be converted
     */
    convertToLocalTime = (unix) =>{
        const date = new Date(unix*1000);
        const hours = date.getHours() - 2;
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    }

    componentDidMount(){
        this.initClock();
    }

    componentWillUnmount(){
        clearInterval( this.timestampTicker);
    }

    render() { 
        return ( 
            <div className="location__local-time">
                <p>Local time: {this.convertToLocalTime(this.state.locationTimestamp)}</p>
            </div>
         );
    }
}
 
export default LocationLocalTime;