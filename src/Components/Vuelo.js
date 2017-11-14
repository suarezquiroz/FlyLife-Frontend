import React, { Component } from 'react';
import moment from 'moment';

class Vuelo extends Component {
    render() {
        let fecha;
        moment.locale('es');
        if (this.props.vuelo.Fecha) {
            fecha = moment(this.props.vuelo.Fecha).format('DD/MM/YYYY');
        }
        console.log(fecha);
        return (
            <div className="Vuelo">
                <div>
                    <strong>Origen:</strong>
                    <strong>{this.props.vuelo.Origen.Nombre}</strong>
                </div>
                <div>
                    <strong>Destino:</strong>
                    <strong>{this.props.vuelo.Destino.Nombre}</strong>
                </div>
                <div>
                    <strong>Fecha:</strong>
                    <strong>{fecha}</strong>
                </div>
            </div>
        );
    }
}

export default Vuelo;