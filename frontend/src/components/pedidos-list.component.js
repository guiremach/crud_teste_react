import React, { Component } from "react";
import pedidoDataService from "../services/pedido.service";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default class pedidosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      pedidos: [],
      currentpedido: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrievepedidos();
  }

  retrievepedidos() {
    pedidoDataService.getAll()
      .then(response => {
        this.setState({
          pedidos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievepedidos();
    this.setState({
      currentpedido: null,
      currentIndex: -1
    });
  }



  deletepedido(id) {    
 
    pedidoDataService.delete(id)
      .then(response => {
        console.log(response.data);
       // this.props.router.navigate('/tutorials');
       this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
   
  
  }


  render() {
    const { searchTitle, pedidos, currentpedido, currentIndex } = this.state;
    

    
   const showSwal = (id) => {
        withReactContent(Swal).fire({
        title: "Você tem certeza que deseja deletar o ID " +id+ " ?" ,
        text: "Esta ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!"
    }).then((result) => {
        if (result.isConfirmed) {
        this.deletepedido(id);
            Swal.fire({
              title: "Deletado!",
              text: "O registro foi apagado.",
              icon: "success"
            });
        }
    })
  }

    return (
      <div className="list row">
        
        <div className="col-md-12">
          <h4>pedidos List</h4>
          
          <Link
                to={"/pedidos/add"}
                className="badge badge-warning"
              >
          <button
            className="m-3 btn btn-sm btn-info"
           
          >
           Adicionar pedido
          </button>
          </Link>
          
          <Table striped bordered hover>
          <thead>
            <tr>
              <th># ID</th>
              <th>Cliente</th>
              <th>Valor Venda</th>
              <th>Ações</th>
            </tr>
          </thead>

        <tbody>
            {pedidos &&
              pedidos.map((pedido, index) => (
              
                <tr>
                <td> {pedido.id} </td>
                <td> {pedido.razao_social} </td>
                 <td> {pedido.valor_total} </td>
                 <td>
                
          
          
          
            <button
              className="m-3 btn btn-sm btn-danger" 
             onClick={() => showSwal(pedido.id)}
            >
              Deletar
            </button>
     
            
                 </td>
                </tr>
              
              ))}
          </tbody>
          </Table>

          
        </div>
      
      </div>
    );
  }
}
