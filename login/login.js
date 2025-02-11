const myHeaders = {
    "Content-Type": "application/json"
}

const submit = document.querySelector("#submit")
submit.addEventListener("click", (event)=>{
    event.preventDefault()
    const email = document.querySelector("#btn-email").value
    const dados = {
        email
    }
    loginUser(dados)
})
async function loginUser(dados) {
    const dadosJson = JSON.stringify(dados)
    const login = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        body: dadosJson,
        headers: myHeaders
    })
    if (login.status == 200) {
        const loginUserJson = await login.json()

        localStorage.clear()
        localStorage.setItem("@frentecaixa-userID", loginUserJson.id_usuario)
        localStorage.setItem("@frentecaixa-userEmail", loginUserJson.login)
        localStorage.setItem("@frentecaixa-userType", loginUserJson.id_tipo_usuario)

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
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }
            }).showToast();
    }
}