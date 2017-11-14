import React, { Component } from 'react';
import Reservas from "./Components/Reservas";
import CrearReserva from "./Components/CrearReserva";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      reservas: [
        {
          OrigenId: 1,
          DestinoId: 2
        },
        {
          OrigenId: 2,
          DestinoId: 2
        },
        {
          OrigenId: 3,
          DestinoId: 2
        },
        {
          OrigenId: 2,
          DestinoId: 3
        }
      ]
    }
  }

  render() {
    return (
      <div className="App container">
        <div className="jumbotron">
          <h1>FlyLife</h1>
        </div>
        <CrearReserva />
      </div>
    );
  }
}

export default App;
