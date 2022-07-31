import {getData, DisplayModal, DataRender} from './renderModule.js'
import {snackBar} from './main.js'

export let listOfGames = []
let pageCounterForSearches = 1
let gameSearch
let stopLoading = false
let pageCounter = 1
let response = []
let searchResponse = []
let resultsToShow = ''
let resultsCounter 
let searchResultHtml
let resultsLength = 0
let descriptionView = false

export let  ObjectToExport = {
    pageCounter,
    stopLoading,
    pageCounterForSearches,
    searchResponse,
    resultsLength,
    descriptionView
}

export const getGames = async() => {
    let resp 
    let consoleId
    let respSearch
   
    try {
        if (DataRender.Search){
            if (gameSearch == "Playstation" || gameSearch === "PC " || gameSearch === "Xbox" || gameSearch === "Nintendo"){ // it is a console
                switch (gameSearch) {
                    case ("Playstation"):
                        consoleId = 2
                    case ("PC "):
                        consoleId = 1   
                    case ("Xbox"):
                        consoleId = 3
                    case ("Nintendo"):
                        consoleId = 7
                        break;         
                }
                respSearch = await fetch(`https://api.rawg.io/api/games?key=681f753709be4ab8b42a3ccb6313766b&parent_platforms=${consoleId}&page=${pageCounterForSearches}`)
            } else {
                respSearch = await fetch(`https://api.rawg.io/api/games?key=681f753709be4ab8b42a3ccb6313766b&search=${gameSearch}&page=${pageCounterForSearches}`)
            }
            searchResponse = await respSearch.json()
            if (respSearch.ok == true){
                if (searchResponse.next == null)
                ObjectToExport.stopLoading = true
                ObjectToExport.resultsLength = searchResponse.results.length
                getData(searchResponse.results)
                getGameData(searchResponse.results)
                pageCounterForSearches++                
            }  else throw e       
        } else {
            resp = await fetch(`https://api.rawg.io/api/games?key=681f753709be4ab8b42a3ccb6313766b&page=${ObjectToExport.pageCounter}`)
            response = await resp.json()
            if (resp.ok == true){
                ObjectToExport.resultsLength = searchResponse.length
                getData(response.results)
                getGameData(response.results)
            }
            else throw e       
    }} catch (e) {
        e = 'Oops! Something happened, please, try again later' 
        snackBar(e)
    }
}

const debounce = (fn, delay=500) => {
    let timeoutId
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

export function getGameData(gameData){
    for (let index = 0; index < gameData.length; index++) {
      const gameId = gameData[index].id 
      const gameScreenshots = gameData[index].short_screenshots 
      fetch(`https://api.rawg.io/api/games/${gameId}?key=681f753709be4ab8b42a3ccb6313766b&`)
        .then((res) => res.json())
        .then((data) => {
            fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=681f753709be4ab8b42a3ccb6313766b&`)
                .then((resMovie) => resMovie.json())
                .then((dataMovie) => {
                    Object.assign(data, gameScreenshots)
                    Object.assign(data, dataMovie)
                    listOfGames.push(data)
                    loadDescription(data)
            })
        })
    }
    
}
ObjectToExport.descriptionView = false
function loadDescription(data){
    let targetCard = document.getElementById(`${data.id}`)
    let descriptionClass = () => {
        if (ObjectToExport.descriptionView)
            return 'descriptionView'
        else 
           return 'description' 
    }
    targetCard.innerHTML += 
    `
        <div class = "${descriptionClass()}">
            ${data.description}
        </div> 
    `
    
}

const showResults = searchTerm => {
    document.getElementById('searchResults').innerHTML = ''
    resultsCounter = searchResponse.results.length
    if (resultsCounter > 0){
        for (let i = 0; i < resultsCounter ; i++) {      
            searchResultHtml += 
                `<li> ${searchTerm.results[i].name} </li>` 
        }          
        document.getElementById('searchResults').innerHTML = searchResultHtml
        searchResultHtml = '' // To make it empty again
    } else {
        document.getElementById('searchResults').innerHTML = ''
        resultsToShow = `
            <li> The game that you are looking for does not exist in our database.</li>
        ` 
        document.getElementById('searchResults').innerHTML =  resultsToShow
        resultsToShow = '' // To make it empty again
    }
}

async function lookForResults(){
    DataRender.id = 1
    document.getElementById('cards').innerHTML = '' 
    DataRender.Search = true // boolean variable to dont make more fetch
    DataRender.savedYet = true // boolean variable just to save the first game
    stopLoading = false
    document.getElementById('content').scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
    await getGames()
    showResults(searchResponse) 
}

export const search = debounce(async (searchTerm) => {
    // if the search term is removed, reset the search result
    if (!searchTerm || searchTerm.length < 3){
        document.getElementById('searchResults').innerHTML = ''
        return
    } 
    try {
        document.getElementById('searchResults').innerHTML = ''
        gameSearch = searchTerm 
        pageCounterForSearches = 1 
        lookForResults()       
    } catch (error) {
        snackBar(error)
    }
})