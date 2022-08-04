const email = document.getElementById('email')
const password = document.getElementById('password')
const submitLog= document.getElementById('loginButton')
const togglePassword = document.getElementById('showPassword')
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const isRequired = value => value === '' ? false : true;

const checkForm = (checkEmail, checkPass) => {
    try{
        if ((!isRequired(checkEmail)) || (!isRequired(checkPass)) || (checkPass.length > 14)){
            throw e
        }
        else return true
    } catch(e){
        wrongCredentials()        
        if (checkPass.length > 15)
            snackBar('Password must be between 8 and 14 characters')
        else 
            snackBar('Please, complete the fields')
    } 
}

const wrongCredentials = () => {
    document.getElementById('email').classList.add('checkField')
    document.getElementById('password').classList.add('checkField')
    togglePassword.style.color = '#FB5F5F'
}


export const snackBar = (error) => {
    let snk = document.getElementById("snackbar");
    snk.className = "show";
    snk.innerText = error 
    setTimeout(function(){ snk.className = snk.className.replace("show", ""); }, 6000);
}

submitLog.addEventListener('click', async e => {
    e.preventDefault()
    try {
        if (checkForm(email.value, password.value)){ 
        let dataToValue ={
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        },
        resp = await fetch("http://localhost:3000/login", dataToValue)
        if (!resp.ok){
            throw e  
        }
        localStorage.setItem("email", email.value)
        localStorage.setItem("token", resp.accessToken)
        window.location.replace("../GameFinder/GameFinder.html")
    }
    } catch (e) {
        wrongCredentials()        
        snackBar('The combination of credentials does not exist in our database')
    }
         
        
})

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye");
})



