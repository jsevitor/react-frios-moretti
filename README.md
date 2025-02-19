# Sistema de Controle de Estoque - Frios Moretti

Este projeto é a interface frontend do sistema de controle de estoque da empresa Frios Moretti. Desenvolvido com React e Vite, o sistema permite a gestão eficiente de fornecedores, produtos, entradas e retiradas de estoque, proporcionando uma experiência intuitiva para o usuário. O projeto foi desenvolvido como parte da disciplina de Projeto Orientado.

## Demonstração

![frios-moretti-1](https://github.com/user-attachments/assets/696e12c5-15b1-4cdb-83e7-8438bae4df7b)


## Acesse o Projeto

A aplicação está disponível em: [https://friosmoretti.netlify.app/](https://friosmoretti.netlify.app/)

## Funcionalidades

- **Cadastro de Produtos**: Permite adicionar novos produtos ao estoque.
- **Cadastro de Fornecedores**: Registro de fornecedores para controle de procedência dos produtos.
- **Entrada de Produtos**: Registro de novas entradas no estoque.
- **Retirada de Produtos**: Controle das saídas de produtos do estoque.
- **Movimentações**: Visualização detalhada de todas as movimentações de entrada e saída.
- **Consulta e Listagem**: Visualização detalhada dos fornecedores e produtos cadastrados.
- **Edição e Exclusão**: Possibilidade de editar ou excluir registros de produtos, fornecedores, entradas e retiradas.

## Pré-requisitos

Antes de começar, você precisará ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/)

## Instalação e Execução

Siga os passos abaixo para configurar o ambiente de desenvolvimento do frontend:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/jsevitor/react-frios-moretti.git
   cd react-frios-moretti
   ```

2. **Instalar as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O servidor estará disponível em [http://localhost:5173](http://localhost:5173).

## Estrutura do Projeto

```bash
📦react-frios-moretti
├── 📂 src
│   ├── 📂 components         # Componentes reutilizáveis (Modal, Sidebar, Header, etc.)
│   ├── 📂 pages              # Páginas do sistema (Home, CadastroProduto, etc.)
│   ├── 📂 contexts           # Context API para gerenciamento de estado
│   ├── 📂 services           # Comunicação com o backend (API)
│   ├── 📂 styles             # Estilização global e componentes estilizados
│   ├── 📂 utils              # Funções utilitárias (formatadores de data, moeda, etc.)
│   ├── App.jsx               # Componente principal da aplicação
│   ├── routes.jsx            # Definição das rotas do React Router
│   ├── main.jsx              # Ponto de entrada do React
└── ...
```

## Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para interfaces de usuário
- [Vite](https://vitejs.dev/) - Ferramenta de build otimizada
- [React Router Dom](https://reactrouter.com/) - Gerenciamento de rotas
- [React Context API](https://reactjs.org/docs/context.html) - Gerenciamento de estado global
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Exibição de notificações
- [React Spinners](https://www.davidhu.io/react-spinners/) - Componentes de carregamento animado
- [Axios](https://axios-http.com/) - Cliente HTTP para comunicação com a API
- [Styled-Components](https://styled-components.com/) - Estilização com CSS-in-JS
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Biblioteca de ícones

## Comunicação com o Backend

O frontend se comunica com a API hospedada em:
```
https://projeto-orientado-backend.onrender.com/
```

## Equipe de Desenvolvimento

- **José Vitor Oliveira** - *Desenvolvimento Full Stack* - [jsevitor](https://github.com/jsevitor)
- **Gabriela Queiroz** - *Documentação* - [GabiQueiroz26](https://github.com/GabiQueiroz26)
- **Vinícius Nunes** - *Design* - [vinicgabriel](https://github.com/vinicgabriel)
- **Roberto (João)** - *Testes e QA* - [Apaskasko](https://github.com/Apaskasko)

## Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE.md) para detalhes.

## Agradecimentos

Agradecimentos especiais aos professores e colegas de equipe que auxiliaram no desenvolvimento deste projeto.

