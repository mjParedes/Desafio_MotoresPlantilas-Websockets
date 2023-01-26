import Router from 'express'
import fs from 'fs'


const router = new Router()
const path = "products.json"



router.get('/', async (req, res) => {
    let productos = []
    if (fs.existsSync(path)) {
        const productosJson = await fs.promises.readFile(path, 'utf8')
        productos = JSON.parse(productosJson)
    }
    res.render('home', { productos })
})


router.get('/realTimeProducts', async(req, res) => {
    let productos = []
    if(fs.existsSync(path)){
        const productosJson = await fs.promises.readFile(path,'utf-8')
        productos = JSON.parse(productosJson)
    }
    res.render('realTimeProducts', {productos})
})



export default router



