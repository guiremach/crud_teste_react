import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

export default class ClientesList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      clientes: [],
      currentCliente: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveClientes();
  }

  retrieveClientes() {
    ClienteDataService.getAll()
      .then(response => {
        this.setState({
          clientes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClientes();
    this.setState({
      currentCliente: null,
      currentIndex: -1
    });
  }



  render() {
    const { searchTitle, clientes, currentCliente, currentIndex } = this.state;

    return (
      <div className="list row">
        
        <div className="col-md-12">
          <h4>Clientes List</h4>
          
          <Link
                to={"/clientes/add"}
                className="badge badge-warning"
              >
          <button
            className="m-3 btn btn-sm btn-info"
           
          >
           Adicionar Cliente
          </button>
          </Link>
          
          <Table striped bordered hover>
          <thead>
            <tr>
              <th># ID</th>
              <th>CNPJ</th>
              <th>Razão Social</th>
              <th>Email</th>
            
            </tr>
          </thead>

        <tbody>
            {clientes &&
              clientes.map((cliente, index) => (
              
                <tr>
                <td> {cliente.id} </td>
                <td> {cliente.cnpj} </td>
                 <td> {cliente.razao_social} </td>
                 <td> {cliente.email} </td>
                 
                </tr>
              
              ))}
          </tbody>
          </Table>

         
        </div>
      
      </div>
    );
  }
}
