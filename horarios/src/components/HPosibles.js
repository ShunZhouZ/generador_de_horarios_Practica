import React, { Component, Fragment } from "react";
import ATRLayout from "./Layout";
import Horarios from "./Horarios";
import axios from "axios";
import NotAuth from "./NotAuth";
import { Navigate } from "react-router";

export default class HPosibles extends Component {
  aux = () => {
    //console.log("si")

    setTimeout(function () {
      window.location.href = "http://127.0.0.1:8000/users/usr/PERT";
    }, 3000);
  };
  state = {
    Horarios: null,
  };

  componentDidMount = async () => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/clique/",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    axios(config).then((response) => {
      this.setState({ Horarios: response.data });
    });
  };

  render() {
    if (localStorage.getItem("token")) {
      console.log(this.state.Horarios);
      if (this.state.Horarios === null) {
        return (
          <Fragment>
            <ATRLayout>
              <br />
              <br />

              <p className="lead">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A
                continuación veras los horarios que te recomendamos tomar para
                tu semestre actual, esperamos haberte ayudado!
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="d-flex justify-content-center">
                <h1 className="display-6">
                  Un Momento, Se están calculando tús horarios
                </h1>
              </div>
              <br />
              <br />
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-border text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <br />
              <br />
              <br />
            </ATRLayout>
          </Fragment>
        );
      } else if (this.state.Horarios === "n") {
        return (
          <Fragment>
            <ATRLayout>
              <div className="row row-cols-4">
                <div className="col-6">
                  <h2 className="title text-primary text-center">
                    Generador de Horarios
                  </h2>
                </div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
              </div>

              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="d-flex justify-content-center">
                <h2 className="display-6">
                  Te has saltado un paso o no hay horarios posibles{" "}
                </h2>
              </div>
              <div className="d-flex justify-content-center">
                <h4 className="display-6">Seras redirigido</h4>
                {this.aux()}
              </div>
              <br />
              <br />
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-border text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="spinner-grow text-primary" role="status" />
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </ATRLayout>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <ATRLayout>
              <br />
              <br />

              {console.log(this.state.Horarios)}
              <p className="lead">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A
                continuación veras los horarios que te recomendamos tomar para
                tu semestre actual, esperamos haberte ayudado!
              </p>
              <br />
              <br />
              <Horarios horarios={this.state.Horarios} />

              <br />

              <br />
            </ATRLayout>
          </Fragment>
        );
      }
    } else {
      return <NotAuth />;
    }
  }
}
