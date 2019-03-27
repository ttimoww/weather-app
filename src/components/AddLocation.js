import React, { Component } from 'react';

class AddLocation extends Component {
    constructor(){
        super();
        this.state = {}
    }

    /**
     * Handle add location value
     * @param {object} e Event of the form
     */
    handleAddLocationValue = (e) => {
        this.setState({
            addLocationValue : e.target.value
        })
    }

    /**
     * Handle add location form on submit
     * @param {object} e Event of the form
     */
    handleAddLocation = (e) =>{
        e.preventDefault();
        this.props.addLocation(this.state.addLocationValue);
        document.getElementById('addLocationValue').value = '';
    }

    render() { 
        return (  
            <div className="addLocation">
                <form onSubmit={this.handleAddLocation}>
                    <input placeholder="City Name" onChange={this.handleAddLocationValue} id="addLocationValue"></input>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}
 
export default AddLocation;