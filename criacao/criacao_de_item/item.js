const myHeaders = {
    "Content-Type": "application/json"
}

const submit = document.querySelector("#submit")
submit.addEventListener("click", function () {
    let code = ''

            for (let i = 0; i < 7; i++) {
                const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                code += caracteres.charAt(indiceAleatorio);
            }
    const codeData = {
        code
    }
    createBarCode(codeData)
})

async function createBarCode(codeData) {
    const dadosJson = JSON.stringify(codeData)
    const response = await fetch(`http://localhost:3000/user/barcode`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (response.status == 200) {
        const barcode = await response.json()
        const name = document.querySelector("#input-name").value
        const value = document.querySelector("#input-value").value
        const measure = document.querySelector("#input-measure").value
        const stock = document.querySelector("#input-stock").value
        const category = document.querySelector("#select-category").value

        const dados = {
        name, value, codeData, barcode, measure, stock, category
        }
        createItem(dados)
    }
    else {
        Toastify({
            text: `Erro ao criar o código de barras`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
            }
        }).showToast();
    }
}

async function createItem(dados) {
    const dadosJson = JSON.stringify(dados)
    const item = await fetch(`http://localhost:3000/user/item`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (item.status == 200) {
        Toastify({
            text: `Cadastro do item realizado com sucesso!`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "blue",
            }
        }).showToast();
    } else {
            Toastify({
                text: `Erro ao fazer login (Status: ${login.status})`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "red",
                }
            }).showToast();
    }
}