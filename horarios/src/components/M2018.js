import React, { Component, Fragment } from "react";
import ATRLayout from "./Layout";
import Malla2018 from "./Malla2018";
import { Link } from "react-router-dom";

export default class M2018 extends Component {
  deleteMalla = (e) => {
    localStorage.removeItem("malla");
    var axios = require("axios");
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/delete_asignaturasCursadas/",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"), //cambiiar a localStorage
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => console.log(response.data.mensaje))
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.non_field_errors) {
            console.log(error.response);
          }
          //notify(`error:  ${error.response.data.non_field_errors[0]}`);
        }
      });
  };
  render() {
    return (
      <Fragment>
        <ATRLayout>
          <div className="row row-cols-3">
            <div className="col">
              <h1 className="title text-primary text-center">Malla 2018</h1>
            </div>
            <div className="col">
              <br />
              <div className="align-self-center">
                <button
                  type="submit"
                  className="btn btn-warning rounded-pill btn-sm"
                >
                  <Link
                    className="nav-link"
                    to={{ pathname: "/users/usr/mallas" }}
                    style={{ color: "#FFF" }}
                    onClick={this.deleteMalla}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Elegir otra malla
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Link>
                </button>
              </div>
            </div>
            <div className="col">
              <br />
              <div className="align-self-center">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill btn-sm"
                >
                  <Link
                    className="nav-link"
                    to={{
                      pathname: "/users/usr/mallas/malla2018/AvanceCurricular",
                    }}
                    style={{ color: "#FFF" }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Elegir Malla 2018
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <Malla2018 />
        </ATRLayout>
      </Fragment>
    );
  }
}
