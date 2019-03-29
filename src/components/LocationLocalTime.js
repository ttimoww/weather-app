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
        const appid = 'AIzaSyCo861UJhT1kb6yVfSbAFTK5td8hlLy6vA';
        fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.lat},${this.state.lon}&timestamp=${timestamp}&key=${appid}`)
        .then(resp => resp.json())        
        .then(data => this.setState({locationTimestamp: timestamp + data.dstOffset + data.rawOffset}));
        
        this.timestampTicker = setInterval(() => {
            this.setState((prevState) => {
                return{
                    locationTimestamp: prevState.locationTimestamp += 1
                }
            })
        }, 1000);
    }

    
    /**
     * Converts unix to readable timestamp
     * @param {string} utc The unix value to be converted
     */
    convertToLocalTime = (unix) =>{
        const date = new Date(unix*1000);
        const hours = date.getHours() - 1;
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