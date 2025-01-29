const password = document.querySelector("#input-password").value
const submit = document.querySelector("#input-submit")
const realPassword = 1234

submit.addEventListener("click", (event) =>{
    event.preventDefault()
    if (password = realPassword) {
        setTimeout(() => {
            window.location.href = "../menu/menu.html"
        }, 1000);
    }
    else {
        setTimeout(() => {
            window.location.href = "../login/login.html"
        }, 1000);
    }
})