<h1 align="center">
    <img width="50%" alt="node.js" src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" />
    <br><br>
    Test de Crud com Node
</h1>

<h4 align="center">
  Uma aplicação simples de teste com node.js
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/wellingtonleitedev/nodejs-crud-test.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/wellingtonleitedev/nodejs-crud-test.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/wellingtonleitedev/nodejs-crud-test.svg">
  <a href="https://github.com/wellingtonleitedev/gobarber/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/wellingtonleitedev/nodejs-crud-test.svg">
  </a>

  <a href="https://github.com/wellingtonleitedev/gobarber/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/wellingtonleitedev/nodejs-crud-test.svg">
  </a>
</p>

<p align="center">
  <a href="#rocket-tecnologias">
    <img align="center" src="https://img.shields.io/badge/Tecnologias-a5a5a5"/>
  </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#arrow-down-instalacao">
    <img align="center" src="https://img.shields.io/badge/Instalação-a5a5a5"/>
  </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">
    <img align="center" src="https://img.shields.io/badge/Como_Usar-a5a5a5"/>
  </a>
</p>

## :hammer_and_wrench: Tecnologias

Esse projeto foi desenvolvido com as tecnologias [Node.js][nodejs] + [Express Framework][express] com [Typescript][ts]

Desenvolvido no [VS Code][vc] com [EditorConfig][vceditconfig], [ESLint][vceslint] e [Prettier][vcprettier]

## :arrow_down: Instalação 

Para clonar e rodar este projeto, você vai precisar ter [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn][yarn] ou [npm][npm] e [Docker](https://www.docker.com/) instalado em seu computador. Então, em sua linha de comando:

```bash
# Clone this repository
$ git clone https://github.com/wellingtonleitedev/nodejs-crud-test

# Go into the repository
$ cd nodejs-crud-test
$ cp ormconfig.example.json ormconfig.json
```

Depois de copiar o exemplo, certifique-se de que está tudo preenchido corretamente, caso precise rodar em produção, precisa alterar as pastas referentes aos entities e migrations para *"dist"* ao invés de *"src"*.

Exemplo: **"./src/common/.../*.ts"** para **"./dist/common/.../*.ts"**


```bash
# Start Docker
$ docker-compose up -d

# Install dependencies
$ yarn install

# Run the application
// Para rodar em ambiente de desenvolvimento
$ yarn dev:server

// Para rodar em ambiente de produção
$ yarn build
$ yarn dev:prod
```

## :information_source: Como Usar

A aplicação roda por padrão na porta 3333, portanto a url seria http://localhost:3333

Usuário administrador criado para controle da aplicação: 
Login: johndoe
Senha: 123456

- > Autenticação
```bash
# Rota: "/sessions"
# Método: POST 

body: {
	"login": "johndoe",
	"password": "123456"
}
```

- > Criar usuários
```bash
# Rota: "/users"
# Método: POST

body: {
	"login": "wellington",
	"name": "Wellington Leite",
	"email": "wellingtonleite@email.com",
	"password": "123456"
}
```

- > Obter seus dados
```bash
# Rota: "/users"
# Método: GET 
no body
```
- > Editar seus dados
```bash
# Rota: "/users"
# Método: PUT

body: {
	"name": "Wellington Leite Silva",
	"email": "wellingtonleite.s@email.com",
	"old_password": "123456", // Obrigatório apenas para alterar senha
	"password": "1234567", // Obrigatório apenas para alterar senha
	"password_confirmation": "1234567" // Obrigatório apenas para alterar senha
}
```

- > Deletar usuários
```bash
# Rota: "/users/:id"
# Método: DELETE

no body
```

---

Feito por Wellington Leite 👨‍💻 [Take a look!](https://www.linkedin.com/in/wellington-leite/)

[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[ts]: https://www.typescriptlang.org/
[yarn]: https://yarnpkg.com/
[npm]: https://www.npmjs.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
