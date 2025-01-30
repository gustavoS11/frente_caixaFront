const myHeaders = {
    "Content-Type": "application/json"
}

const submit = document.querySelector("#submit")
submit.addEventListener("click", function () {
    cadastrar()
})
async function cadastrar() {
    const IDtypeWorker = document.querySelector("#select-type").value
    const name = document.querySelector("#input-name").value
    const email = document.querySelector("#input-email").value
    const dados = {
        IDtypeWorker, name, email
    }
    const dadosJson = JSON.stringify(dados)
    const criarUsuario = await fetch (`http://localhost:3000/user/client`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (criarUsuario.status === 200) {
        Toastify({
            text: `Cadastro realizado com sucesso!`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "blue" },
        }).showToast();
    }
    else {
        Toastify({
            text: `Não foi possível fazer o cadastro`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
}