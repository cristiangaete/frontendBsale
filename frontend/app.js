
const btnBuscar = document.getElementById("btnBuscar");
//Aqui se busca desde del input 
btnBuscar.addEventListener("click",(e) =>{
    // debugger
    e.preventDefault()
    
    let buscar = document.getElementById("inputBuscar").value;
    
    // let transaction = {buscar: buscar};
    // let transactionJson = JSON.stringify(transaction);
    let url = `http://localhost:3000/product/${buscar}`;
    
    getFetch(url)
})

const select = document.querySelector("#sltCategory")
//Rellenamos el select
async function getFetchCategory(url){
    const res = await fetch(url)
    const data = await res.json()
    
    console.log(data)
    data.forEach(element => {
        let opt = document.createElement('option');
        opt.value = element.id; 
        opt.text = element.name
        select.appendChild(opt);
    })
    

}

//Aqui buscamos cuando presionamos el select
select.addEventListener("change", (e) =>{
    e.preventDefault()
    let selectBuscar = select.value;
    console.log(selectBuscar)
    if(selectBuscar>0){
        getFetch(`http://localhost:3000/category/${selectBuscar}`)
    }
    
})

//pintamos las tarjetas de la pagina principal
async function getFetch(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    let cards = ''
    data.forEach(element => {
       
        if (element.url_image === null || element.url_image === "") {
            cards += //html
            ` 
            <li>
                <figure class="text-center">
                    <div class="img-container thumbnail" >
            
                     
                     
                        <img class="redimension" src="./image/not-found-image.jpg">
                    </div>
                    <figcaption class="painting-name">Nombre: ${element.name}</figcaption>
                    <figcaption class="painting-price" style="color:blue;">Precio: ${element.price}</figcaption>
                    <figcaption class="painting-price">Precio: ${element.discount}%</figcaption>
                    <figcaption><button class="button"><span class="mif-shopping-basket2"></span></button></figcaption>
                </figure> 
            </li>
            `
        }else{
        cards += //html
                
            `
            <li>
                <figure class="text-center">
                    <div class="img-container thumbnail">
            
                     
                     
                        <img class="redimension" src="${element.url_image}" >
                    </div>
                    <figcaption class="painting-name">Nombre: ${element.name}</figcaption>
                    <figcaption class="painting-price" style="color:blue;">Precio: ${element.price}</figcaption>
                    <figcaption class="painting-price">Descuento: ${element.discount}%</figcaption>
                    <figcaption><button class="button"><span class="mif-shopping-basket2"></span></button></figcaption>
                </figure> 
                </figure> 
            </li>
            `  
        }
    });
    document.getElementById('paintings').innerHTML = cards;

}

//cargamos los productos
let urlProduct =`http://localhost:3000/product`
getFetch(urlProduct)

//cargamos las categorias
let urlCategory =`http://localhost:3000/category`
getFetchCategory(urlCategory)
   