const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const alunoRoutes = require('./src/routes/alunoRoutes')
const userRoutses = require('./src/routes/userRoutes')
const tokenRoutes = require('./src/routes/tokenRoutes')

app.use(express.json());


app.use(('/alunos'), alunoRoutes)
app.use(('/users'), userRoutses)
app.use(('/tokens'), tokenRoutes)

module.exports = app


