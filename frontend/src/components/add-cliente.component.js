import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClienteDataService from "../services/cliente.service";

export default class AddCliente extends Component {
  constructor(props) {
    super(props);
    this.saveCliente = this.saveCliente.bind(this);
    this.newCliente = this.newCliente.bind(this);
    this.onChangeCnpj = this.onChangeCnpj.bind(this);

    this.state = {
      id: null,
      cnpj: "",
      razao_social: "",
      email: "",
      submitted: false,
      
    };
  }

  onChangeCnpj(e) {
    this.setState({
      cnpj: e.target.value
    });
  }

  saveCliente() {
    var data = {
      cnpj: this.state.cnpj,
      razao_social: this.state.razao_social,
      email: this.state.email
    };

    ClienteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          //cnpj: response.data.cnpj,
          razao_social: response.data.razao_social,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCliente() {
    this.setState({
      id: null,
      cnpj: "",
      razao_social: "",
      email: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
      
       {this.state.razao_social &&
        <div>
          <b>Salvo com sucesso.</b> <br />
           CNPJ: ({this.state.cnpj}) <br />
           Razão Social:  ({this.state.razao_social}) <br />
        </div>
      
        
      }
      
      {!this.state.razao_social && this.state.submitted &&
        <h2>
          CNPJ Inválido. ({this.state.razao_social})
        </h2>
      }
       
      
        {this.state.submitted ? (
          <div>
            <h4></h4>
             <Link
                to={"/clientes"}
                className="badge badge-warning"
              >
            <button className="btn btn-info" onClick={this.newCliente}>
              Voltar
            </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Digite o CNPJ</label>
              <input
                type="text"
                className="form-control"
                id="cnpj"
                required
                value={this.state.cnpj}
                onChange={this.onChangeCnpj}
                name="cnpj"
              />
            </div>

             {/*
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            */}

            <button onClick={this.saveCliente} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
