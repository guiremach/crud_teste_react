import http from "../http-common";

class ProdutoDataService {
  getAll() {
    return http.get("/produtos");
  }

  get(id) {
    return http.get(`/produtos/${id}`);
  }

  create(data) {
    return http.post("/produtos", data);
  }

  update(id, data) {
    return http.put(`/produtos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/produtos/${id}`);
  }

  deleteAll() {
    return http.delete(`/produtos`);
  }

  findByTitle(title) {
    return http.get(`/produtos?title=${title}`);
  }
}

export default new ProdutoDataService();
