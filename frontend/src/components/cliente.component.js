import React, { Component } from "react";
import ClienteDataService from "../services/cliente.service";
import { withRouter } from '../common/with-router';

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.getCliente = this.getCliente.bind(this);
    this.updateCliente = this.updateCliente.bind(this);
    this.deleteCliente = this.deleteCliente.bind(this);

    this.state = {
      currentCliente: {
        id: null,
        cnpj: "",
        razao_social: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCliente(this.props.router.params.id);
  }

  getCliente(id) {
    ClienteDataService.get(id)
      .then(response => {
        this.setState({
          currentCliente: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCliente() {
    ClienteDataService.update(
      this.state.currentCliente.id,
      this.state.currentCliente
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The cliente was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCliente() {    
    ClienteDataService.delete(this.state.currentCliente.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/clientes');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCliente } = this.state;

    return (
      <div>
        {currentCliente ? (
          <div className="edit-form">
            <h4>Cliente</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCliente.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCliente.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCliente.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCliente.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCliente}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCliente}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Cliente...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Cliente);
