const myHeaders = {
    "Content-Type": "application/json"
}

const selectPayment = document.querySelector("#select-typePayment")
async function insertTypePayment() {
    const pagamentos = await fetch(`http://localhost:3000/product/paymentsType`, {
        method: 'GET',
        headers: myHeaders
    })
    if (pagamentos.status === 200) {
        const pagamentosJSON = await pagamentos.json()
        selectPayment.innerHTML = `<option value="0">Selecione o tipo de recebimento</option>` + pagamentosJSON.map(pagamento => `<option value="${pagamento.id_tipo_recebimento}">${pagamento.nome_tipo_recebimento}</option>`).join('')
    }
}
insertTypePayment()

const submit = document.querySelector("#input-submit")
submit.addEventListener("click", async function () {
    const tipo = document.querySelector("#select-typePayment").value
    const nome = document.querySelector("#input-name").value
    const permite = document.querySelector("#select-parcelamento").value
    const quantidade = document.querySelector("#input-maxparcelas").value
    const codigo = document.querySelector("#input-code").value

    if (tipo < 1) {
        Toastify({
            text: `Você deve selecionar o tipo de recebimento`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
    else{
        const dados = {
            tipo, nome, permite, quantidade, codigo
        }
        const dadosJson = JSON.stringify(dados)
        const criarPagamento = await fetch (`http://localhost:3000/user/payment`, {
            method: 'POST',
            body: dadosJson,
            headers: myHeaders
        })
        if (criarPagamento.status === 200) {
            Toastify({
                text: `Cadastro realizado`,
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
})
