import React, { Component } from 'react';
import Results from './Results';
import AddLocation from './AddLocation';

class App extends Component {

  state = {
    locations : [{
      name: 'Amstrdam',
      id: 0
    },
    {
      name: 'New York',
      id: 1
    }]
  }

  render() {
    return (
      <div className="app">
        <div className="background-image"></div>
        <div className="container">
          <h1>Current weather in</h1>
          <Results locations={this.state.locations}/>
          <AddLocation />
        </div>
      </div>
    );
  }
}

export default App;
