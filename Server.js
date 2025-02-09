const express = require('express');
const todoRoutes = require('./routes/todos');
const login = require('./routes/auth')
const app = express()

app.use(express.json())

const todos = [];

app.use('/tasks', todoRoutes)
app.use('/login', login)

app.listen(8000, ()=>{
    console.log("server is running on port 8000")
})
