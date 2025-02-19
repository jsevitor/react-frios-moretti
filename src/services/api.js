import axios from "axios";

/**
 * Configuração da instância do Axios para realizar requisições à API.
 *
 * - `baseURL`: Define o endereço base para todas as requisições da aplicação.
 * - Pode ser utilizada para fazer chamadas HTTP como GET, POST, PUT e DELETE.
 *
 * Exemplo de uso:
 * ```javascript
 * api.get("/endpoint").then(response => console.log(response.data));
 * ```
 */
const api = axios.create({
  baseURL: "https://projeto-orientado-backend.onrender.com/",
});

export default api;
