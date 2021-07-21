##### Pré-requisitos
Yarn e Node
Banco utilizado: Postgres
### Instalação - back-end

Instalação das dependencias.
Após fazer o clone do projeto
```sh
$ cd backend
$ yarn install
```
Duplique o arquivo .env.sample e renomeie para .env 

Após isto altere as env com seus dados, aqui vai um exemplo, siga de acordo com seus dados:
###### POR PADRAO USE A PORTA 3333
```
PORT=3333
DB_HOST=localhost
DB_USER=postgres
DB_PASS=*****
DB_NAME=vehicles
FRONT_END_ADDRESS=http://localhost:4200
```
Rode o comando para gerar as tabela e após isto rode as seeds:
```sh
yarn sequelize db:migrate
yarn sequelize-cli db:seed:all
```

Para iniciar o back-end basta rodar o comando:

```sh
yarn start
```
### Instalação - front-end

Na raiz do projeto acesse a pasta do frontend e instale as dependências:

```sh
$ cd frontend
$ yarn install 
```

Para iniciar o projeto basta rodar o comando:

```sh
yarn ember s --proxy:http://localhost:3333
```

Projeto ira rodar na porta 4200

### Rodando testes automatizados.
Para rodar os testes automatizados no backend basta rodar o comando:

```sh
$ yarn test 
```
