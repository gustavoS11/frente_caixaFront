const myHeaders = {
    "Content-Type": "application/json"
}

const selectCity = document.querySelector("#select-city")
async function insertCities () {
    const cities = await fetch(`http://localhost:3000/product/cities`, {
        method: 'GET',
        headers: myHeaders
    })
    if (cities.status == 200) {
        console.log(cities)
        const citiesJSON = await cities.json()
        console.log("teste")
        selectCity.innerHTML = citiesJSON.map(city => `<option value="${city.id_municipio}">${city.nome_municipio}</option>`).join('')
    } else {
    //toastify
    }
}
insertCities()
const selectHood = document.querySelector("#select-hood")