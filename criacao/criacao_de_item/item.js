const myHeaders = {
    "Content-Type": "application/json"
}

const submit = document.querySelector("#submit")
submit.addEventListener("click", function () {
    const name = document.querySelector("#input-name").ariaValueMax
    const value = document.querySelector("#input-value").value
    const code = document.querySelector("#input-code").value
    const measure = document.querySelector("#input-measure").value
    const stock = document.querySelector("#input-stock").value
    const category = document.querySelector("#select-category").value
    
    const dados = {
        name, value, code, measure, stock, category
    }
    createItem(dados)
})

async function createItem(dados) {
    const dadosJson = JSON.stringify(dados)
    const item = await fetch(`http://localhost:3000/user/item`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (item.status == 200) {
        const loginUserJson = await item.json()


        if(loginUserJson.id_tipo_usuario == 2){
            setTimeout(() => {
                window.location.href = "../menu/menu.html"
                //window.location.href = "/senha_gerente/senha.html" SERA FEITO SE SOBRAR TEMPO
            }, 1000);
        }
        else{
            setTimeout(() => {
                window.location.href = "../menu/menu.html"
            }, 1000)
        }
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