import React, { Component } from 'react';

class NewLocation extends Component {
    state = {
        cityName : ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.addLocation(this.state.cityName);
        this.props.hideNewLocation();
    }

    handleValueChangeCityName = (e) =>{
        this.setState({cityName: e.target.value});
        console.log(this.state.cityName);
    }

    render() { 
        return ( 
            <div className="new-location">
                <i className="fas fa-times-circle remove-location" alt="Remove location" onClick={this.props.hideNewLocation}></i>
                <div className="new-location__container">
                    <form onSubmit={this.handleFormSubmit}>
                        <input onChange={this.handleValueChangeCityName}></input>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default NewLocation;