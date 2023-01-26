import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import fs from 'fs'
import ProductManager from './ProductManager.js';


const productManager = new ProductManager('products.json')

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Configuracion handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)


const httpServer= app.listen(8080, () => {
    console.log(`Escuchando al puerto 8080 http://localhost:8080/`)
})


let productos = []

// socket
const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log('cliente conectado ')

    socket.on("productoAgregado", async (obj)=>{
        productos = await productManager.getProducts()
        let productoNuevo = await productManager.addProduct(obj)
        productos.push(productoNuevo)
        console.log(productos)
        socketServer.emit("listarProductos",productos)
    })
    
})



