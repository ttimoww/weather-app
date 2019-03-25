import React, { Component } from 'react';
import Results from './Results';
import AddLocation from './AddLocation';

class App extends Component {

  state = {
    locations : [{
      name: 'Paris',
      id: 0
    },
    {
      name: 'Miami',
      id: 1
    },
    {
      name: 'Amersfoort',
      id: 2
    }]
  }

  prevLocationID = 2;

  /**
   * Add a new location to the app
   * @param {string} name Name of the location.
   */
  handleAddLocation = (name) =>{
    this.setState(prevState =>{
      return{
        locations: [
          ...prevState.locations,
          {
            name: name,
            id: this.prevLocationID += 1
          }
        ]
      }
    })
  }

  render() {
    return (
      <div className="app">
        <div className="background-image"></div>
        <div className="container">
          <h1>Current weather in</h1>
          <Results locations={this.state.locations}/>
          <AddLocation addLocation={this.handleAddLocation} />
        </div>
      </div>
    );
  }
}

export default App;
