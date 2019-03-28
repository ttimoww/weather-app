import React, { Component } from 'react';

class LocalTime extends Component {
    constructor(props){
        super();
        this.state = {
            lat: props.lat,
            lon: props.lon
        }
    }

    /**
     * Get the local time of the city using google api
     * @param {number} lat latitude of city
     * @param {number} lon longitude of city
     */
    getLocalTime(lat, lon){
        let timestamp = new Date().getTime()/1000;
        const appid = 'AIzaSyCo861UJhT1kb6yVfSbAFTK5td8hlLy6vA';
        fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.lat},${this.state.lon}&timestamp=${timestamp}&key=${appid}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log(timestamp + data.dstOffset + data.rawOffset);
            this.setState({
                localTime : timestamp + data.dstOffset + data.rawOffset
            });
        }, (error) => {
            console.log(error);
        })
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
        this.getLocalTime(this.state.lat, this.state.lon)
    }

    render() { 
        return ( 
            <div className="location__local-time">
                <p>Local time: {this.convertToLocalTime(this.state.localTime)}</p>
            </div>
         );
    }
}
 
export default LocalTime;