const myHeaders = {
    "Content-Type": "application/json"
}
const submit = document.querySelector("#input-submit")

const selectClient = document.querySelector("#select-name")
const selectProduct = document.querySelector("#select-product")

async function insertEachClient () {
    const response = await fetch(`http://localhost:3000/product/getClients`, {
        method: 'GET',
        headers: myHeaders
    })
    if (response.status === 200) {
        const clientsJSON = await response.json()
        selectClient.innerHTML = `<option value="0">Selecione o cliente</option>` + clientsJSON.map(client => `<option value="${client.id_cliente}">${client.nome_cliente}</option>`).join('')
    }
    else {
        Toastify({
            text: `Não foi possível buscar os clientes`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
}
async function insertEachProduct () {
    const response = await fetch(`http://localhost:3000/product/getProducts`, {
        method: 'GET',
        headers: myHeaders
    })
    if (response.status === 200) {
        const productsJSON = await response.json()
        selectProduct.innerHTML = `<option value="0">Selecione o produto</option>` + productsJSON.map(product => `<option value="${product.id_item}">${product.nome_item}</option>`).join('')
    }
    else {
        Toastify({
            text: `Não foi possível buscar os produtos`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
}
insertEachClient()
insertEachProduct()

const inputValue = document.querySelector("#input-value")
selectProduct.addEventListener("change", async function () {
    const product = document.querySelector("#select-product").value
    const dados = {
        product
    }
    const dadosJson = JSON.stringify(dados)
    const response = await fetch(`http://localhost:3000/product/getProductValue`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (response.status == 200) {
        const productValueJSON = await response.json()
        inputValue.value = `${productValueJSON.valor_item}`
    }
    else {
        Toastify({
            text: `Não foi possível buscar o valor do produto`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
})

submit.addEventListener("click", function () {
    insertPromotion()
})
async function insertPromotion () {
    const client = document.querySelector("#select-name").value
    const product = document.querySelector("#select-product").value
    const value = document.querySelector("#input-value").value
    const dados = {
        client, product, value
    }
    const dadosJson = JSON.stringify(dados)
    const response = await fetch(`http://localhost:3000/user/insertPromotion`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (response.status == 200) {
        Toastify({
            text: `Promoção cadastrada`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "blue" },
        }).showToast();
    }
    else {
        Toastify({
            text: `Não foi possível cadastrar a promoção`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
}