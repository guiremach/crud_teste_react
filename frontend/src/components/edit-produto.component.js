import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProdutoDataService from "../services/produto.service";

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";



class EditProduto extends Component {
  constructor(props) {
    super(props);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.onChangeValorvenda = this.onChangeValorvenda.bind(this);
    this.onChangeEstoque = this.onChangeEstoque.bind(this);

    this.state = {
    currentProduto: {
          id: null,
          descricao: "",
          valor_venda: "",
          estoque: ""
      },
      submitted: false,
      
    };
  }
  
   componentDidMount() {
    this.retrieveProduto(this.props.router.params.id);
  }
  
  retrieveProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          currentProduto: response.data[0]
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  
  onChangeDescricao(e) {
    const descricao = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          descricao: descricao
        }
      };
    });
  }

  
  
   onChangeValorvenda(e) {
   const valorvenda = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        valorvenda: valorvenda
      }
    }));
  
  }
  
  onChangeEstoque(e) {
   
    const estoque = e.target.value;
    
   this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        estoque: estoque
      }
    }));
  }
  


  saveProduto() {


    ProdutoDataService.update(this.state.currentProduto.id,this.state.currentProduto)
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
    const { currentProduto}  = this.state;
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
                value={currentProduto.descricao}
                onChange={this.onChangeDescricao}
                name="descricao"
              />
            </div>
            
          
            
            
            <div className="form-group">
              <label htmlFor="title">Estoque</label>
              <input
                typdatae="text"
                className="form-control"
                id="estoque"
                required
                value={currentProduto.estoque}
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
                value={currentProduto.valorvenda}
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


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter(EditProduto);
