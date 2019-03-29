import React, { Component } from 'react';

class NewLocation extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="new-location">
                <i className="fas fa-times-circle remove-location" alt="Remove location" onClick={this.props.hideNewLocation}></i>
            </div>
         );
    }
}
 
export default NewLocation;