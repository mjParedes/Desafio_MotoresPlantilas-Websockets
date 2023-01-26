const socket = io()

const formulario = document.getElementById("formulario")
const inputTitle = document.getElementById("title")
const inputDescription = document.getElementById("description")
const inputCode = document.getElementById("code")
const inputPrice = document.getElementById("price")
const inputStock = document.getElementById("stock")
const inputCategory = document.getElementById("category")
const contenedor = document.getElementById("contenedor")

formulario.onsubmit= (e)=>{
    e.preventDefault()
    const title = inputTitle.value
    const description = inputDescription.value
    const code = inputCode.value
    const price = inputPrice.value
    const stock = inputStock.value
    const category = inputCategory.value
    socket.emit("productoAgregado", {title,description,code,price,stock,category})
}

socket.on("listarProductos",(productos)=>{
    let producto= ""
    productos.forEach((p) => {
        producto += `
        <div style="border: 2px outset #fff; width:600px; margin:15px 0 30px 0;padding:10px">
            <h3 style="color: red;">PRODUCTO: ${p.title}</h3><br>
            <h4>DESCRIPCION: ${p.description}</h4><br> 
            <h4>CODIGO: ${p.code}</h4> <br>
            <h4>PRECIO: ${p.price}</h4><br> 
            <h4>STOCK: ${p.stock}</h4> <br>
            <h4>CATEGORIA: ${p.category}</h4> 
        </div>
        ` 
    });
    contenedor.innerHTML= producto
})



