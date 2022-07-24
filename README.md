<h1 align=center> API DOCUMENTATION </h1>

<p align="center">
  <a href="https://github.com/Wanessa-Guedes/projeto20-repoprovas-API.git">
  <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Projeto20 REPOPROVAS
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/Wanessa-Guedes/projeto20-repoprovas-API.git

$ cd $nome-repositorio

$ npm install

$ npm run dev

$ npx prisma migrate dev

$ npx prisma generate

$ npx prisma db seed
```

API:

```bash
- ROTAS AUTENTICAÇÃO

- POST / sign-up
    - Rota para cadastrar um usuário
    - headers: {}
    - body: {"email": "email@email.com",
             "password": "password123",
             "passwordConfirmation": "password123"}
    
- POST /sign-in
    - Rota para logar (token de autenticação é recebido no corpo da resposta)
    - headers: {}
    - body: {"email": "email@email.com",
             "password": "password123"}
 
```
```bash             
 - ROTAS TESTS
    
- POST /tests (autenticada)
    - Rota para usuário inserir um teste
    - headers: {"Authorization": "Bearer token"}
    - body: {"name": "Prova Nova",
             "pdfUrl": "http://www.prova.com",
             "categoryId": 3,
             "teacherId": 1,
             "disciplineId": 2}
    
- GET /tests?groupBy=disciplines (autenticada)
    - Rota para listar todas as provas agrupadas por disciplina
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /tests?groupBy=teachers (autenticada)
    - Rota para listar todas as provas agrupadas por instrutores
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /tests (autenticada)
    - Rota para listar todas as provas 
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
```
```bash 
  - ROTA DE CATEGGORIAS
  
  - GET /categories (autenticada)
    - Rota para listar todas as categorias cadastradas
    - headers: {"Authorization": "Bearer token"}
    - body: {}

```    
