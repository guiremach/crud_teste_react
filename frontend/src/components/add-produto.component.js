import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProdutoDataService from "../services/produto.service";

export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeValorvenda = this.onChangeValorvenda.bind(this);
    this.onChangeEstoque = this.onChangeEstoque.bind(this);

    this.state = {
      id: null,
      descricao: "",
      valorvenda: "",
      estoque: "",
      submitted: false,
      
    };
  }

  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
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

  saveProduto() {
    var data = {
      descricao: this.state.descricao,
      valorvenda: this.state.valorvenda,
      estoque: this.state.estoque
    };

    ProdutoDataService.create(data)
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

  newProduto() {
    this.setState({
      id: null,
      descricao: "",
      valorvenda: "",
      estoque: ""
    });
  }

  render() {
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
                to={"/produtos"}
                className="badge badge-warning"
              >
            <button className="btn btn-info" onClick={this.newProduto}>
              Voltar
            </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                required
                value={this.state.descricao}
                onChange={this.onChangeDescricao}
                name="descricao"
              />
            </div>
            
          
            
            
            <div className="form-group">
              <label htmlFor="title">Estoque</label>
              <input
                type="text"
                className="form-control"
                id="estoque"
                required
                value={this.state.estoque}
                onChange={this.onChangeEstoque}
                name="estoque"
                onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                      }
                  }}
              />
            </div>
            
             <div className="form-group">
              <label htmlFor="title">Valor Venda</label>
              <input
                type="number"
                className="form-control"
                id="valorvenda"
                required
                value={this.state.valorvenda}
                onChange={this.onChangeValorvenda}
                name="valorvenda"
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

            <button onClick={this.saveProduto} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
