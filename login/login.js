const myHeaders = {
    "Content-Type": "application/json"
}

const submit = document.querySelector("#btn-submit")
submit.addEventListener("click", (event)=>{
    event.preventDefault()
    const email = document.querySelector("#btn-email")
    loginUser(email)
})
async function loginUser(email) {
    const dadosJson = JSON.stringify(email)
    const login = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (login.status == 200) {
        const loginUserJson = await login.json()
        localStorage.setItem("@frentecaixa-userId", loginUserJson.id)
        localStorage.setItem("@frentecaixa-userEmail", loginUserJson.email)
        setTimeout(() => {
            window.location.href = "../menu/menu.html"
        }, 1000)
    } else {
        //window.location.reload()
    }
}