import React, { Component } from 'react';
import Vuelos from "./Vuelos";
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Autocomplete from "react-autocomplete";
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/datepicker.min.css';

class CrearReserva extends Component {

    constructor() {
        super();

        this.state = {
            Origen: "",
            Destino: {
                Nombre: "",
                Codigo: ""
            },
            Fecha: moment(),
            Pasajeros: 1,
            Ciudades: [],
            Vuelos: [],
            origenValue: '',
            destinoValue: ''

        };

        fetch("http://localhost:55555/odata/Ciudades", { 'mode': 'cors' })
            .then(result => result.json())
            .then(data => this.state.Ciudades = data.value);
    };
    getValidationState() {
        const length = this.state.Origen.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    };
    handleChange(e) {
        console.log(e.target.name)
        console.log("value=" + e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(reserva) {
        console.log(reserva);
    }
    buscarVuelo() {
        let url = "http://localhost:55555/odata/Vuelos?$expand=Origen,Destino";
        if (this.state.Origen.Id > 0) {
            url += "&$filter=Origen/Id eq " + this.state.Origen.Id + " and "
        }
        if (this.state.Destino.Id > 0) {
            url += "Destino/Id eq " + this.state.Destino.Id
        }

        fetch(url, { 'mode': 'cors' })
            .then(result => result.json())
            .then(data => {
                this.setState({Vuelos : data.value});
            });
    }

    render() {
        const menuStyle = {
            borderRadius: '4px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            fontWeight: 'bold',
            position: 'fixed',
            color: 'black',
            overflow: 'auto',
            maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
            zIndex: 100
        };
        return (
            <div className="CrearReserva">
                <form>
                    <Grid className="formReserva">
                        <Row>
                            <Col sm={6} md={4}>
                                <FormGroup
                                    controlId="Origen"
                                >
                                    <ControlLabel>Origen</ControlLabel>
                                    <div>

                                        <Autocomplete
                                            name="Origen"
                                            items={this.state.Ciudades}
                                            shouldItemRender={(item, value) => item.Nombre.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            getItemValue={item => item.Nombre}
                                            renderItem={(item, highlighted) =>
                                                <div
                                                    key={item.Id}
                                                    style={{
                                                        backgroundColor: highlighted ? 'rgb(0, 77, 230)' : 'white',
                                                        color: highlighted ? 'white' : 'rgb(0, 77, 230)'
                                                    }}
                                                >
                                                    {item.Nombre} - ({item.Codigo})
                                            </div>
                                            }
                                            value={this.state.origenValue}
                                            onChange={
                                                (e, value) => {
                                                    this.setState({ origenValue: e.target.value })
                                                }
                                            }
                                            onSelect={(value, item) => {
                                                console.log(value)
                                                this.setState({ Origen: item, origenValue: item.Nombre + " (" + item.Codigo + ")" })
                                            }}
                                            menuStyle={menuStyle}
                                            inputProps={{ className: 'form-control' }}
                                        />

                                    </div>
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={4}>
                                <FormGroup
                                    controlId="Destino"
                                >
                                    <ControlLabel>Destino</ControlLabel>
                                    <div>
                                        <Autocomplete
                                            name="Destino"
                                            items={this.state.Ciudades}
                                            shouldItemRender={(item, value) => item.Nombre.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                            getItemValue={item => item.Nombre}
                                            renderItem={(item, highlighted) =>
                                                <div
                                                    key={item.Id}
                                                    style={{
                                                        backgroundColor: highlighted ? 'rgb(0, 77, 230)' : 'white',
                                                        color: highlighted ? 'white' : 'rgb(0, 77, 230)'
                                                    }}
                                                >
                                                    {item.Nombre} ({item.Codigo})
                                            </div>
                                            }
                                            value={this.state.destinoValue}
                                            onChange={
                                                (e, value) => {
                                                    console.log("value: ", value);
                                                    this.setState({ destinoValue: e.target.value })
                                                }
                                            }
                                            onSelect={(value, item) => {
                                                this.setState({ Destino: item, destinoValue: item.Nombre + " (" + item.Codigo + ")" })
                                            }}
                                            menuStyle={menuStyle}
                                            inputProps={{ className: 'form-control' }}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                                <FormGroup
                                    controlId="Fecha"
                                //validationState={this.getValidationState()}
                                >
                                    <ControlLabel>Fecha</ControlLabel>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.Fecha}
                                        onChange={
                                            date => {
                                                console.log("value: ", date);
                                                this.setState({ Fecha: date })
                                            }
                                        }
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={4}>
                                <FormGroup
                                    controlId="Pasajeros"
                                >
                                    <ControlLabel>Pasajeros</ControlLabel>
                                    <FormControl
                                        style={{ width: '100px' }}
                                        type="number"
                                        min="1"
                                        value={this.state.Pasajeros}
                                        placeholder="Pasajeros"
                                        onChange={
                                            (e) => {
                                                this.setState({ Pasajeros: e.target.value })
                                            }
                                        }
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row bsClass='text-left'>
                            <Col sm={6} md={4}>
                                <Button
                                    className="btn-custom"
                                    bsStyle="success"
                                    onClick={this.buscarVuelo.bind(this)}
                                >
                                    Buscar vuelos
                                </Button>
                            </Col>
                        </Row>
                    </Grid>


                </form>
                <Grid className="listadoVuelos">
                    <Row>

                        <Vuelos vuelos={this.state.Vuelos} />

                    </Row>
                </Grid>

            </div>
        );
    }
}

export default CrearReserva;