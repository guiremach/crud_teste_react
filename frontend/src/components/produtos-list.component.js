import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default class ProdutosList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      produtos: [],
      currentProduto: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveProdutos();
  }

  retrieveProdutos() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProdutos();
    this.setState({
      currentProduto: null,
      currentIndex: -1
    });
  }



  deleteProduto(id) {    
 
    ProdutoDataService.delete(id)
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
    const { searchTitle, produtos, currentProduto, currentIndex } = this.state;
    

    
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
        this.deleteProduto(id);
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
          <h4>Produtos List</h4>
          
          <Link
                to={"/produtos/add"}
                className="badge badge-warning"
              >
          <button
            className="m-3 btn btn-sm btn-info"
           
          >
           Adicionar Produto
          </button>
          </Link>
          
          <Table striped bordered hover>
          <thead>
            <tr>
              <th># ID</th>
              <th>Descrição</th>
              <th>Valor Venda</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>

        <tbody>
            {produtos &&
              produtos.map((produto, index) => (
              
                <tr>
                <td> {produto.id} </td>
                <td> {produto.descricao} </td>
                 <td> {produto.valorvenda} </td>
                 <td> {produto.estoque} </td>
                 <td>
                   <Link
                to={"/produtos/" + produto.id}
                className="badge badge-warning"
              >
                <button
            className="m-3 btn btn-sm btn-warning"
      
          >
            Editar
          </button>
          </Link>
          
          
          
            <button
              className="m-3 btn btn-sm btn-danger" 
             onClick={() => showSwal(produto.id)}
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
