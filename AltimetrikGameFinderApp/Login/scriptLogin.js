const email = document.getElementById('email')
const password = document.getElementById('password')
const submitLog= document.getElementById('enter')
let resp
let response


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const checkForm = (checkEmail, checkPass) => {
    if ( (!isRequired(checkEmail)) || (!isRequired(checkPass)) || (checkPass.length > 30)){
        document.getElementById('email').classList.add('checkField')
        document.getElementById('password').classList.add('checkField')   
        document.querySelector('span').textContent = "Please, check the data"
        return false
    } else return true
}


submitLog.addEventListener('click', async e => {
    e.preventDefault()
    checkForm(email.value, password.value) 
    try { 
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
        resp = await fetch("http://localhost:3000/login",dataToValue),
        response = await resp.json()
        if (!resp.ok){
            throw e
        }
        
        localStorage.setItem("email", email.value)
        window.location.replace("GameFinder/GameFinder.html")
    } catch (e) {
            console.log(resp.status)
    }
         
        
})