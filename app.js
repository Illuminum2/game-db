// <tr>
// <th scope="col">Name</th>
// <th scope="col">Price</th>
// <th scope="col">Image</th>
// <th scope="col">Type</th>
// </tr>

const tableBody = document.querySelector('tbody')
const baseURl = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store'

let cart = []
let products = []


const init = async () => {
    const URL = baseURl + '/products.json'
    fetch(URL)
    .then((result) => result.json())
    .then((result) => {
        products = result;
        fillTable(result)
    })
}
const addToCart = (id) => {
    if (cart[id] = products[id]) {
        cart[id].quantity++
    } else {
        cart.push(products[id])
        cart.push(1)
    }

    alert(`Product ${id} added.`)
    console.clear
    console.log(cart)
}

const fillTable = (products) => {
    // {
    //     "name": "baked beans",
    //     "price": 0.4,
    //     "image": "beans.jpg",
    //     "type": "vegetables"
    // }
    
    let i = 0
    products.forEach(product => {
        const {name, price, image, type} = product

        const tr = document.createElement('tr')
        tr.innerHTML = `
                <th scope="col">${name}</th>
                <th scope="col">${price}</th>
                <th scope="col"><image src="${ baseURl + '/images/' + image}"></image></th>
                <th scope="col">${type}</th>
                <td><button type="button" class="btn btn-outline-primary" onclick="addToCart(${i+1})"><i class="bi bi-cart"></i></button></th>
        `
        tableBody.append(tr)
        i++
    });
}

init()