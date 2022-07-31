import {getGameData , getGames , search} from './fetchModule.js'
import {DisplayModal, DataRender, getData} from './renderModule.js'

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

const logOutButton = document.getElementById('logOutButton')
logOutButton.addEventListener('click', (e) => {
    localStorage.removeItem("email")
    localStorage.clear()
    window.location.replace("../Login/login.html")
})

const authentication = () => {
    if (localStorage.length == 0)
    window.location.replace("../Login/login.html")
}

authentication() 
getGames()


