import React, { Component } from 'react';
import Vuelo from "./Vuelo";

class Vuelos extends Component {
  render() {
    console.log(this.props);
    let vuelos;
    if (this.props.vuelos) {
      vuelos = this.props.vuelos.map(vuelo => {
        return (
          <Vuelo
            key={vuelo.Id}
            vuelo={vuelo}
          />
        );
      })
    }
    return (
      <div className="Vuelos">
        {vuelos}
      </div>
    );
  }
}

export default Vuelos;
