const myHeaders = {
    "Content-Type": "application/json"
}

function buscarEndereco(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                throw new Error("CEP inválido!");
            }
            return data;
        });
}
const submit = document.querySelector("#submit")
submit.addEventListener("click", (event)=> {
    event.preventDefault()
    const cep = document.querySelector("#input-cep").value
    buscarEndereco(cep)
        .then(endereco => {
            const state = endereco.uf
            const cityId = endereco.ibge
            const hood = endereco.bairro
            const road = endereco.logradouro
            const name = document.querySelector("#input-name").value
            const nature = document.querySelector("#select-nature").value
            const cpfCnpj = document.querySelector("#input-cpf_cnpj").value
            const rg = document.querySelector("#input-rg").value
            const birth = document.querySelector("#input-birth").value
            const houseNumber = document.querySelector("#input-house").value
            const email = document.querySelector("#input-email").value

            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let code = ''

            for (let i = 0; i < 7; i++) {
                const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
                code += caracteres.charAt(indiceAleatorio);
            }
            const dados = {
                name, code, nature, cpfCnpj, rg, birth, state, cityId, hood, road, houseNumber, email
            }
            const dadosJSON = JSON.stringify(dados)
            cadastrar(dadosJSON)
        })
        .catch(error => console.error("Erro ao buscar CEP:", error));
})
async function cadastrar(dados) {
    try {
        const response = await fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            body: dados,
            headers: myHeaders
        })
        if (response.status === 200) {
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
    } catch (error) {
        Toastify({
            text: `Erro ao se conectar com a api`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "red" },
        }).showToast();
    }
}