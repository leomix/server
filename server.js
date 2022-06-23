const express = require('express')
const contenedor = require("./contenedor.js");
module.exports = contenedor;
let contenedor1 = new contenedor('productos.txt')

const app = express()

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error',error=> console.log(`error en el servidor ${error}`))

app.get('/productos',async (req,res)=>{
    res.send({productos: await contenedor1.getAll()})
})

app.get('/productoRandom',async (req,res)=>{
    res.send({producto: await contenedor1.getRandom()})
})

