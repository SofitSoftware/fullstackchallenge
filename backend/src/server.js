const app = require('./app')

app.listen(process.env.PORT)
console.log(`Projeto rodando na porta ${process.env.PORT}`)