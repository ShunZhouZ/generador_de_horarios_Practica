import React, { Component } from 'react'
import Ramo from './RamoP'
import Semestre from './Semestre'
import { Link } from 'react-router-dom';



export default class Malla2010Extra2 extends Component {

    state = {
        CBM1000: null, CBM1001: null, CBQ1000: null, CIT1000: null, FIC1000: null, CBM1002: null, CBM1003: null, CBF1000: null, CIT1010: null,
        CFG1: null, CBM1005: null, CBM1006: null, CBF1001: null, CIT2000: null, CIT2100: null, CIT2204: null, CBM2000: null, CBF1002: null, CIT2001: null,
        CFG2: null, FIC1001: null, CII2750: null, CIT2106: null, CIT2200: null, CIT2002: null, CFG3: null, FIC1002: null, CII2000: null, CIT2202: null,
        CIT2101: null, CIT2003: null, CIT2103: null, CII1000: null, CIT2005: null, CIT2102: null, FIC1003: null, CIT2104: null, CIT2203: null, CIT2004: null,
        CIT2105: null, CIT2201: null, CFG4: null, CIT3310: null, CIT3410: null, CIT3411: null, CIT3200: null, CIT3311: null, CIT3312: null, CIT3412: null,
        CIT3413: null, CIT3201: null, CIT3313: null, CIT5001: null, CIT5002: null

    }

    componentDidMount = () => {
        for (let i = 0; i < this.props.ramos.length; i++) {
            const mov = i;
            const mov2 = this.props.ramos[mov].to_asignatura_real[0].codigo;
            this.setState({
                [mov2]: [this.props.ramos[mov].es, this.props.ramos[mov].ls, this.props.ramos[mov].ef, this.props.ramos[mov].lf, this.props.ramos[mov].holgura]
            })
        }
    }

    render() {
        return (



            <div className="container">
                <div className="row justify-content-around">
                    <div className="col col-md-1"> </div>
                    <Semestre semestre={"4"} />
                    <Semestre semestre={"5"} />
                    <Semestre semestre={"6"} />
                    <div className="col col-md-1"> </div>
                </div>

                <br />



                <div className="row row-cols-10 align-items-start">
                    <div className="col col-md-1"> </div>
                    <Ramo codigo={"CIT2204"} ramo={"Prob. y Estadisticas"} state={this.state.CIT2204} />
                    <Ramo codigo={"CII2750"} ramo={"Optimización"} state={this.state.CII2750} />
                    <Ramo codigo={"CII2000"} ramo={"Introducción a la Economía"} state={this.state.CII2000} />
                    <div className="col col-md-1"> </div>
                </div>

                <br />

                <div className="row row-cols-10">
                    <div className="col col-md-1"> </div>
                    <Ramo codigo={"CBM2000"} ramo={"Métodos Numéricos"} state={this.state.CBM2000} />
                    <Ramo codigo={"CIT2106"} ramo={"Electrónica y Electrotecnia"} state={this.state.CIT2106} />
                    <Ramo codigo={"CIT2202"} ramo={"Modelos Estoc. y Simul."} state={this.state.CIT2202} />
                    <div className="col col-md-1"> </div>
                </div>

                <br />

                <div className="row row-cols-10">
                    <div className="col col-md-1">
                        <Link className="nav-link" to={{ pathname: '/users/usr/PERT/PERTExtra1' }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">

                            </svg>
                        </Link>
                    </div>
                    <Ramo codigo={"CBF1002"} ramo={"Electricidad y Magnetismo"} state={this.state.CBF1002} />
                    <Ramo codigo={"CIT2200"} ramo={"Proyectos en TICs I"} state={this.state.CIT2200} />
                    <Ramo codigo={"CIT2101"} ramo={"Señales y Sistemas"} state={this.state.CIT2101} />
                    <div className="col col-md-1">
                        <Link className="nav-link" to={{ pathname: '/users/usr/PERT/PERTExtra3' }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">

                            </svg>
                        </Link>
                    </div>

                </div>

                <br />

                <div className="row row-cols-10">
                    <div className="col col-md-1"> </div>
                    <Ramo codigo={"CIT2001"} ramo={"Dis. y Análisis de Algoritmos"} state={this.state.CIT2001} />
                    <Ramo codigo={"CIT2002"} ramo={"Bases de Datos"} state={this.state.CIT2002} />
                    <Ramo codigo={"CIT2003"} ramo={"Sistemas Operativos"} state={this.state.CIT2003} />
                    <div className="col col-md-1"> </div>
                </div>

                <br />

                <div className="row row-cols-10">
                    <div className="col col-md-1"> </div>
                    <Ramo codigo={"CFG2"} ramo={"Minor / CFG"} state={this.state.CFG2} />
                    <Ramo codigo={"CFG3"} ramo={"Minor / CFG"} state={this.state.CFG3} />
                    <Ramo codigo={"CIT2103"} ramo={"Sistemas Digitales"} state={this.state.CIT2103} />
                    <div className="col col-md-1"> </div>

                </div>

                <br />

                <div className="row row-cols-10">
                    <div className="col col-md-1"> </div>
                    <Ramo codigo={"FIC1001"} ramo={"Inglés I"} state={this.state.FIC1001} />
                    <Ramo codigo={"FIC1002"} ramo={"Inglés II"} state={this.state.FIC1002} />
                    <div className="col "> </div>
                    <div className="col col-md-1"> </div>

                </div>

                <br />



                <div className="row row-cols-10">
                    <div className="col">
                        <Link className="nav-link" to={{ pathname: '/users/usr/PERT' }} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">

                            </svg>
                        </Link>
                    </div>
                    <div className="col"> </div>
                    <div className="col"> </div>


                </div>


            </div>


        )
    }
}