import {getData, DisplayModal, DataRender} from './renderModule.js'
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

export let  ObjectToExport = {
    pageCounter,
    stopLoading,
    pageCounterForSearches,
    searchResponse,
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
                respSearch = await fetch(`https://api.rawg.io/api/games?key=7782fff30be64f5c95686cfae511e0d9&parent_platforms=${consoleId}&page=${pageCounterForSearches}`)
            } else {
                respSearch = await fetch(`https://api.rawg.io/api/games?key=7782fff30be64f5c95686cfae511e0d9&search=${gameSearch}&page=${pageCounterForSearches}`)
            }
            searchResponse = await respSearch.json()
            if (respSearch.ok == true){
                if (searchResponse.next == null)
                    ObjectToExport.stopLoading = true
               
                getData(searchResponse.results)
                getGameData(searchResponse.results)
                pageCounterForSearches++                
            }  else throw e       
        } else {
            resp = await fetch(`https://api.rawg.io/api/games?key=7782fff30be64f5c95686cfae511e0d9&page=${ObjectToExport.pageCounter}`)
            response = await resp.json()
            if (resp.ok == true){
                getData(response.results)
                getGameData(response.results)
            }
            else throw e       
    }} catch (e) {
        console.log('Sorry, something went wrong.')
        console.log(e)
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

export function getGameData(gameData) {
    for (let index = 0; index < gameData.length; index++) {
      const gameId = gameData[index].id 
      const gameScreenshots = gameData[index].short_screenshots 
      fetch(`https://api.rawg.io/api/games/${gameId}?key=7782fff30be64f5c95686cfae511e0d9&`)
        .then((res) => res.json())
        .then((data) => {
            fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=7782fff30be64f5c95686cfae511e0d9&`)
                .then((resMovie) => resMovie.json())
                .then((dataMovie) => {
                    Object.assign(data, gameScreenshots)
                    Object.assign(data, dataMovie)
                    listOfGames.push(data)
            })
        })
    }
}

const showResults = searchTerm => {
    document.getElementById('searchResults').innerHTML = ''
    resultsCounter = searchResponse.results.length
    if (resultsCounter >= 1){
        for (let i = 0; i < resultsCounter ; i++) {      
            searchResultHtml += `                
                    <li> ${searchTerm.results[i].name} </li>
                ` 
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
    DataRender.gamesCards = ''
    DataRender.Search = true // boolean variable to dont make more fetch
    DataRender.savedYet = true // boolean variable just to save the first game
    stopLoading = false
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
        console.log(error)
    }
})