import React, { Component } from 'react';

class AddLocation extends Component {
    state = {  }
    render() { 
        return (  
            <div className="addLocation">
                <input placeholder="City Name"></input>
                <button>Add</button>
            </div>
        );
    }
}
 
export default AddLocation;