import {getGames , search} from './fetchModule.js'
import {DisplayModal, DataRender} from './renderModule.js'

let overlay = document.getElementById('over')
let icon = document.getElementById('icon')
let user = document.getElementById('log-out')

document.addEventListener('click', (e) => {
    if (e.target.closest('.card')){ 
        let cardToShow = e.target.innerHTML
        DisplayModal(cardToShow)
    }
    else{
        overlay.classList.remove('overlay')
        icon.classList.remove('overlay')
        user.classList.remove('overlay')
    }  
})

let searchTermElem = document.getElementById('searchBar')
searchTermElem.select()

searchTermElem.addEventListener('input', function (event) {
    search(event.target.value)
    overlay.classList.add('overlay')
    icon.classList.add('overlay')
    user.classList.add('overlay')
})

overlay.addEventListener('click',() => {
    document.getElementById('searchResults').innerHTML = ''
    searchTermElem.value = ''
})


const lastSearches = document.getElementById('LastSearchButton')
let gamesSearched = ''
lastSearches.addEventListener('click', () =>{
    document.getElementById('searchResults').innerHTML = '';
    if (DataRender.Queue.length == 0){
        gamesSearched += `
            <span class = "emptySearch"> You have not done any searches recently.</span>
        `         
    } else {
        for (let index = 0; index < DataRender.Queue.length ; index++) {
            gamesSearched += DataRender.Queue[index] 
        }
    }
    document.getElementById('cards').innerHTML = gamesSearched
    gamesSearched = ''
})

const switchModes = document.getElementById('flexSwitchCheckChecked')

switchModes.addEventListener('click', () => {
    document.body.classList.toggle("lightmode")
})

const switchModesMobile = document.getElementById('switchHamb')

switchModesMobile.addEventListener('click', () => {
    document.body.classList.toggle("lightmode")
})

const logOutButton = document.querySelectorAll('.btn.btn-link.logOutButton')
for (let index = 0; index < logOutButton.length; index++){
    logOutButton[index].addEventListener('click', function(){
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.clear()
        window.location.replace("../Login/login.html")
    }) 
    
}

const authentication = () => {
    const tok = localStorage.getItem("token")
    !tok && window.location.replace("../Login/login.html")
}


export const snackBar = (error) => {
    let snk = document.getElementById("snackbar");
    snk.className = "show";
    snk.innerText = error 
    setTimeout(function(){ snk.className = snk.className.replace("show", ""); }, 6000);
}


const mobSearch = document.getElementById('mobSearch')
const resMob = document.getElementById('searchResults')

mobSearch.addEventListener('click', show)
let showMob = false

function show(){
    if (!showMob){
        showMob = true
        searchTermElem.style.display = 'block'
        resMob.style.display = 'block'
    }   else {
        showMob = false
        searchTermElem.style.display = 'none'
        resMob.style.display = 'none'
    }
        
}

authentication() 
getGames()


