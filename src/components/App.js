import React, { Component } from 'react';
import Results from './Results';
import AddLocation from './AddLocation';
import ls from 'local-storage';
import shortid from 'shortid';

class App extends Component {

  state = {
    locations: []
  }

  /**
   * Add a new location to the app by adding it to local storage
   * @param {string} name Name of the location.
   */
  handleAddLocation = (name) =>{
    while (true) {
      let newID = shortid.generate();
      if(ls.get('locations').filter(location => location.id === newID).length === 0){
        ls.set('locations', [...ls.get('locations'), {name: name, id: newID}]);
        this.setState({locations: ls.get('locations')});
        break;
      }
    }
  }

  /**
  * Removes location from state and local storage based on location id
  * @param {number} id ID of the location to be removed
  */
  handleRemoveLocation = (id) =>{
    ls.set('locations', ls.get('locations').filter(location => location.id !== id));

    this.setState(prevState => {
      return{
        locations: prevState.locations.filter((location) => location.id !== id)
      }
    })
  }

  /**
   * Get the locations from the user's local storage
   */
  loadLocations(){
    if(ls.get('locations')){
      this.setState({
        locations: ls.get('locations')
      })
    }else{
      ls.set('locations', []);
    }
  }

  componentDidMount(){
    this.loadLocations();
  }

  render() {
    return (
      <div className="app">
        <div className="background-image"></div>
        <div className="container">
          <h1>Current weather in</h1>
          <Results locations={this.state.locations} removeLocation={this.handleRemoveLocation} />
          <AddLocation addLocation={this.handleAddLocation} />
        </div>
      </div>
    );
  }
}

export default App;
