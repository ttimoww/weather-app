import React, { Component } from 'react';
import Location from './Location';
import NewLocation from './NewLocation';
import AddLocation from './AddLocation';

class Results extends Component{
    state = {
        showNewLocation : false
    }

    handleShowNewLocation = () => {
        this.setState({showNewLocation: true});
    }

    handleHideNewLocation = () => {
        this.setState({showNewLocation: false});
    }

    render(){
        let showNewLocation;
        if(this.state.showNewLocation){
            showNewLocation = <NewLocation hideNewLocation={this.handleHideNewLocation} addLocation={this.props.addLocation} />
        }

        return(
            <div className="results">
                {this.props.locations.map((location) =>
                    <Location 
                        key={location.id} 
                        id={location.id}
                        cityName={location.name}
                        removeLocation={this.props.removeLocation}
                        />
                )}
                {showNewLocation}
                <AddLocation  showNewLocation={this.handleShowNewLocation} />
            </div>
        )
    }
}

export default Results;