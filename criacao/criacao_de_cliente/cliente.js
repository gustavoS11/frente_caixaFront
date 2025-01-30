const myHeaders = {
    "Content-Type": "application/json"
}
const selectState = document.querySelector("#select-state")
async function insertStates() {
    const states = await fetch(`http://localhost:3000/product/states`, {
        method: 'GET',
        headers: myHeaders
    })
    if (states.status === 200) {
        const statesJSON = await states.json()
        selectState.innerHTML = `<option value="0">Selecione o estado</option>` + statesJSON.map(state => `<option value="${state.id_estado}">${state.nome_estado}</option>`).join('')
        selectState.addEventListener('change', function () {
            const selectedStateId = event.target.value
            if (selectedStateId >= 1) {
                localStorage.setItem("@frentecaixa-userStateID", selectedStateId)
                insertCities()
            }
            else {
                selectState.value = localStorage.getItem("@frentecaixa-userStateID")
                Toastify({
                    text: `Você deve selecionar um estado`,
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "red",
                    }
                }).showToast();
            }
        })
    }
}
const selectCity = document.querySelector("#select-city")
async function insertCities () {
    const stateId = localStorage.getItem("@frentecaixa-userStateID")
        const dados = {
            stateId
        }
        const dadosJson = JSON.stringify(dados)
    const cities = await fetch(`http://localhost:3000/product/cities`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (cities.status == 200) {
        const citiesJSON = await cities.json()
        selectCity.innerHTML = `<option value="0">Selecione o município</option>` + citiesJSON.map(city => `<option value="${city.id_municipio}">${city.nome_municipio}</option>`).join('')
        selectCity.addEventListener("change", function () {
            const selectedCityId = event.target.value
            if (selectedCityId >= 1) {
                localStorage.setItem("@frentecaixa-userCityID", selectedCityId)
                insertHoods()
            }
            else{
                selectCity.value = localStorage.getItem("@frentecaixa-userCityID")
                Toastify({
                    text: `Você deve selecionar uma cidade`,
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "red",
                    }
                }).showToast();
            }
        })
    } else {
        Toastify({
            text: `Não há cidades cadastradas nesse estado`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
            }
        }).showToast();
    }
}
const selectHood = document.querySelector("#select-hood")
async function insertHoods() {
    const cityId = localStorage.getItem("@frentecaixa-userCityID")
        const dados = {
            cityId
        }
        const dadosJson = JSON.stringify(dados)
        try {
            const response = await fetch(`http://localhost:3000/product/hoods`, {
                method: 'POST',
                body: dadosJson,
                headers: myHeaders
            })
            console.log(response)
            if (response.status === 200) {
                const neighborhoodsJSON = await response.json();
                selectHood.innerHTML = neighborhoodsJSON.map(hood => `<option value="${hood.id_bairro}">${hood.nome_bairro}</option>`).join('')
            }
            else {
                Toastify({
                    text: `Não há bairros cadastrados nessa cidade`,
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: { background: "red" },
                }).showToast();
            }
        } catch (error) {
            Toastify({
                text: `Erro ao carregar bairros)`,
                duration: 3000,
                gravity: "top",
                position: "center",
                style: { background: "red" },
            }).showToast();
        }
}
insertStates()

const submit = document.querySelector("#submit")
submit.addEventListener("click", (event)=> {
    event.preventDefault()
    const name = document.querySelector("#input-name").value
    const code = document.querySelector("#input-code").value
    const nature = document.querySelector("#select-nature").value
    const cpfCnpj = document.querySelector("#input-cpf_cnpj").value
    const rg = document.querySelector("#input-rg").value
    const birth = document.querySelector("#input-birth").value
    const state = document.querySelector("#select-state").value
    const city = document.querySelector("#select-city").value
    const hood = document.querySelector("#select-hood").value
    const road = document.querySelector("#input-road").value
    const houseNumber = document.querySelector("#input-house").value
    const email = document.querySelector("#input-email").value
    
    const dados = {
        name, code, nature, cpfCnpj, rg, birth, state, city, hood, road, houseNumber, email
    }
    const dadosJSON = JSON.stringify(dados)
    cadastrar(dadosJSON)
})
async function cadastrar(dados) {
    try {
        const response = await fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            body: dados,
            headers: myHeaders
        })
        if (response.status === 200) {
            const neighborhoodsJSON = await response.json();
            selectHood.innerHTML = neighborhoodsJSON.map(hood => `<option value="${hood.id_bairro}">${hood.nome_bairro}</option>`).join('')
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