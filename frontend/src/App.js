import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MainList from "./components/main.component";
import ClientesList from "./components/clientes-list.component";
import ProdutosList from "./components/produtos-list.component";
import PedidosList from "./components/pedidos-list.component";
import Cliente from "./components/cliente.component";
import AddCliente from "./components/add-cliente.component";
import AddProduto from "./components/add-produto.component";
import EditProduto from "./components/edit-produto.component";
import AddPedido from "./components/add-pedido.component";

function App() {
  return (
        <div className="container">
    <nav className="navbar navbar-expand navbar-dark bg-dark">
          
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <a href='/' className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href='/clientes' className="nav-link">
                Clientes
              </a>
            </li>
            <li className="nav-item">
              <a href='/produtos' className="nav-link">
                Produtos
              </a>
            </li>
			 <li className="nav-item">
              <a href='/pedidos' className="nav-link">
                Pedidos
              </a>
			  </li>
          </div>
        </nav>
	

      <BrowserRouter>
        <Routes>
          <Route path="/"   element={<MainList />} />
		   <Route path="/clientes"   element={<ClientesList />} />
		   <Route path="/produtos"   element={<ProdutosList />} />
		   <Route path="/pedidos"   element={<PedidosList />} />
		   <Route path="/pedidos/add" element={<AddPedido/>} />
		   <Route path="/clientes/add" element={<AddCliente/>} />
		   <Route path="/produtos/add" element={<AddProduto/>} />
		   <Route path="/produtos/:id" element={<EditProduto/>} />
		   <Route path="/clientes/:id" element={<Cliente/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
