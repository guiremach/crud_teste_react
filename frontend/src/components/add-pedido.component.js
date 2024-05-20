import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import PedidoDataService from "../services/pedido.service";
import ClienteDataService from "../services/cliente.service";
import ProdutoDataService from "../services/produto.service";

export default class AddPedido extends Component {
  constructor(props) {
    super(props);
    this.savePedido = this.savePedido.bind(this);
    this.newPedido = this.newPedido.bind(this);
    this.onChangeCliente = this.onChangeCliente.bind(this);
    this.onChangeValorvenda = this.onChangeValorvenda.bind(this);
    this.onChangeEstoque = this.onChangeEstoque.bind(this);
    this.selectCliente = this.selectCliente.bind(this);
    this.addProdutoPedido = this.addProdutoPedido.bind(this);
    this.onChangeProduto = this.onChangeProduto.bind(this);
    this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
 

    this.state = {
      id: null,
      clientes: [],
      currentCliente: "",
      produtos: [],
      currentProduto: "",
      produtopedido: [],
      produto: "",
      produtonome: "",
      quantidade: "1",
      valorvenda: "",
      estoque: "",
      submitted: false,
      
    };
  }
  
  componentDidMount() {
    this.retrieveClientes();
    this.retrieveProdutos();
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


  onChangeCliente(e) {
    this.setState({
      cliente: e.target.value
    });
  }
  
  
  onChangeValorvenda(e) {
    this.setState({
      valorvenda: e.target.value
    });
  }
  
  onChangeEstoque(e) {
    this.setState({
      estoque: e.target.value
    });
  }
  
  selectCliente(e){
      this.setState({
    currentCliente: this.state.cliente
    });
  }

  onChangeProduto(e) {
    var index = e.nativeEvent.target.selectedIndex;
    
    this.setState({
      produto: e.target.value
    });
    this.setState({
      produtonome: e.nativeEvent.target[index].text
    });
  }

  onChangeQuantidade(e) {
    this.setState({
      quantidade: e.target.value
    });
  }

  addProdutoPedido(e) {

  
    var data = {
      cliente: this.state.currentCliente,
      produto: this.state.produto,
      produtonome: this.state.produtonome,
      quantidade: this.state.quantidade
    };
  //  this.state.produtopedido.push(data)
    
    this.setState(prevState => ({
      produtopedido: [data, ...prevState.produtopedido]
    }))
    console.log(this.state.produtopedido)
  }

 savePedido() {
    

    PedidoDataService.create(this.state.produtopedido)
      .then(response => {
        this.setState({
          id: response.data.id,
          //cnpj: response.data.cnpj,
          descricao: response.data.descricao,
        submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPedido() {
    this.setState({
      id: null,
      descricao: "",
      valorvenda: "",
      estoque: ""
    });
  }

  render() {
   const {  clientes, produtos, produtopedido, currentCliente, currentIndex } = this.state;
  
    return (
      <div className="submit-form">
      
       {this.state.submitted &&
        <div>
          <b>Salvo com sucesso.</b> 
        </div>
      
        
      }
      
      
       
      
        {this.state.submitted ? (
          <div>
            <h4></h4>
             <Link
                to={"/pedidos"}
                className="badge badge-warning"
              >
            <button className="btn btn-info" onClick={this.newPedido}>
              Voltar
            </button>
            </Link>
          </div>
        ) : (
        
         <div>
           
            <div className="form-group">
              <label htmlFor="title">Cliente</label>
    <select name="cliente" className="form-select"  value={this.state.value}  onChange={this.onChangeCliente} disabled={(this.state.currentCliente)}>
    <option value='' onChange={this.onChangeCliente}>Selecione </option>
                {clientes &&
              clientes.map((cliente, index) => (
              
              <option value={cliente.id}  onChange={this.onChangeCliente}>{cliente.razao_social}</option>
              
              ))}
    </select>
          </div>
          
           {!this.state.currentCliente ? (
          
          <div className="form-group">
            <button
            className="m-3 btn btn-sm btn-info"
            onClick={this.selectCliente}
          >
            Escolher Cliente
          </button>
            </div>
            
            ) : (

              <div>
                <div className="form-group">
                  <label htmlFor="title">Produto</label>
                  <select name="produto" className="form-select"  value={this.state.value}  onChange={this.onChangeProduto} >
    <option value='' onChange={this.onChangeProduto}>Selecione </option>
                {produtos &&
              produtos.map((produto, index) => (
              
              <option value={produto.id}  onChange={this.onChangeProduto}>{produto.descricao}</option>
              
              ))}
    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="title">Quantidade</label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantidade"
                      required
                      value={this.state.quantidade}
                      onChange={this.onChangeQuantidade}
                      name="quantidade"
                      onKeyPress={(event) => {
                        if (!/[1-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      } } />
                  </div>

                  
            <button onClick={this.addProdutoPedido} className="btn btn-success">
              Adicionar produto
            </button>
                  
                  </div>
            

                    )}
          
          { this.state.produtopedido.length > 0 &&
          <div>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
            
            </tr>
          </thead>

        <tbody>  
    {this.state.produtopedido &&
      this.state.produtopedido.map((produto, index) => (
     
        <tr>
        <td> {produto.produtonome} </td>
         <td> {produto.quantidade} </td>
         </tr>

      ))}

    </tbody>
    </Table>
     <button onClick={this.savePedido} className="btn btn-info">
              Finalizar pedido
            </button>
    </div>
  }
           
            
            
            
         
            
          
            
            

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

           
          </div>
        )}
      </div>
    );
  }
}
