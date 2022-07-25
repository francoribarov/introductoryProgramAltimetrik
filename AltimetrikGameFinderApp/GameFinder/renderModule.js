import {ObtainInfo, getPlatforms, obtainDate, getPlatformsModal } from "./infoModule.js";
import {listOfGames, ObjectToExport, getGames} from "./fetchModule.js"

let ModalToShow = null
let gamesCards = ''
let id = 1
let Search = false
let savedYet = false
let Queue = []
export let DataRender = {
    id,
    gamesCards,
    Search,
    savedYet,
    ModalToShow,
    Queue,
}

const noBackground = "img/noBackground.svg"
const noBackgroundVideo = "img/NoVideo.jpg"
const ModalShown = document.getElementById('ModalInjection')

/* begin getData -> obtains all the data of the games */ 
export const getData = response =>{
    response.forEach(game => {
       DataRender.gamesCards += `
        <div class = "col-lg-4 d-block-lg col-md-6 py-2">
            <div id= "card_${DataRender.id}" class="card">
                <input type ="image" class="like" value="false" src ="img/Heart.png">
                <img class="card-img" id = "gameFrontPage" src="${game.background_image || noBackground}" alt="gameFrontPage">
                <div class="card-body overflow-auto">
                    <div class = "container g-0">
                        <div class= "row">
                            <div class= "col-10">
                                <h3 class="card-title">${game.name}</h3>
                            </div>
                                
                            <div class="col-2 pt-1">
                                <p id ="gamePosition" > #${DataRender.id} </p>
                            </div>
                        </div>
                    </div>
                        <div class="container g-0">
                            <div class="row">
                                <div class = "col-lg-4 col-5">
                                    <p class="card-text date">Release date:</p>   
                                </div>
                                <div class = "col-lg-4 col-7" >
                                    <p id="date" class= "card-text"> ${obtainDate(game.released)} </p>
                                </div>
                                <div class ="col-lg-4 ps-0 col-6">
                                    <div id="platformIcons" class ="container">
                                        <div class = "row platforms">
                                            ${getPlatforms(game.parent_platforms)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id ="genresDiv" class="row pt-1">
                                <div class = "col-lg-3 col-4">
                                    <p class="card-text genres">Genres:</p>
                                </div>
                                <div class = "col-lg-9 col-8">
                                    <p  class= "card-text "> ${ObtainInfo(game.genres, false)} </p>
                                </div>
                            </div>    
                            
                        </div>
                    </div>
            </div>
        </div>
        `
        DataRender.id++ 
        if (DataRender.Search && DataRender.savedYet){
            DataRender.savedYet = false 
            if (DataRender.Queue.length < 1)
                DataRender.Queue.push(DataRender.gamesCards)
            else{
                DataRender.Queue[1] = DataRender.Queue[0]
                DataRender.Queue[0] = DataRender.gamesCards 
            }
        }
    })
    let observer = new IntersectionObserver((gameObserved) => {
        gameObserved.forEach(gameObserved => {
        if(gameObserved.isIntersecting && !ObjectToExport.stopLoading){
            if (!Search) ObjectToExport.pageCounter++
            getGames()
        }
    })
}, {
	rootMargin: '0px 0px 600px 0px',
	threshold: 1.0
}) 
    let lastGame
    if (response.length > 0 ) {
        document.getElementById('cards').innerHTML = DataRender.gamesCards
        if ((lastGame) && (DataRender.id != 746582)){ // If id = 746582 it is the last game
            observer.unobserve(lastGame)
        }
        const gamesDisplayed = document.querySelectorAll('.card')
        lastGame = gamesDisplayed[gamesDisplayed.length - 1]
        observer.observe(lastGame)
    } 
}
export function DisplayModal(CardTitle){
    let find = false
    let movieOfGame 
    if (ModalToShow !== null){
        ModalToShow.innerHTML = ''
        ModalShown.innerHTML = ''
    }
    ModalToShow = document.createElement('div')
    let i = 0
    let bgGame 
    let Screens = []
    while (!find){
        if (listOfGames[i].name === CardTitle){
           if (listOfGames[i].results[0] != null)
                movieOfGame = listOfGames[i].results[0].data['480']
            else
                movieOfGame = false 
            bgGame = listOfGames[i].background_image
            for (let index = 1; index < 5; index++) {
                if (listOfGames[i][index] != null)
                    Screens.push(listOfGames[i][index].image)
                else
                    Screens.push(noBackground)
            }
            ModalToShow.innerHTML =
            `
                <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                        <div class="modal-content">
                            <div class= "gradient">                         
                            <img class="modalBackground" src="${bgGame || noBackground}" alt="Background of the Game">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div class="container-fluid">
                                <div class="modal-body">
                                    <div class="container-fluid bigContainer">
                                        <div class = "row pt-5 mt-2">
                                            <div class = "col-12 iconsM p-0"> 
                                                ${getPlatformsModal(listOfGames[i].parent_platforms)}
                                            </div>
                                        </div>
                                        <h3 class= "gameTitleModal">${listOfGames[i].name}</h3>
                                    </div>
                                    <div class="container-fluid">
                                        <div class="row">
                                        <div class="col-7">
                                            <div class = "gameDescription">
                                                ${listOfGames[i].description}
                                            </div>
                                        <div class="container-fluid generalContainer">
                                            <div class="row">
                                                <div class="col-5">
                                                    <button type="button" class="btn btn-primary wishlistButton">Add to wishlist</button>
                                                    <div class = "infoAboutTheGame">
                                                        <div class = "InfoContainer platform">
                                                            <p class="platform">Platforms</p>
                                                            <p class ="underline">${ObtainInfo(listOfGames[i].platforms,true)}</p>
                                                        </div>

                                                        <div class = "InfoContainer">
                                                            <p class="date">Release date</p>
                                                            <p>${obtainDate(listOfGames[i].released, false)}</p>
                                                        </div>

                                                        <div class = "InfoContainer">
                                                            <p class="publisher">Publisher</p>
                                                            <p class ="underline"> ${ObtainInfo(listOfGames[i].publishers, false)}</p>
                                                        </div>

                                                        <div class = "InfoContainer">
                                                            <p class="web">Website</p>
                                                            <a href="${listOfGames[i].website}">${listOfGames[i].website}</a>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-5">
                                                    <button type="button" class="btn btn-outline-primary purchaseButton">Purchase</button>
                                                    <div class = "infoAboutTheGame">
                                                        <p class="genres">Genre</p>
                                                        <p class ="underline">${ObtainInfo(listOfGames[i].genres, false)}</p>

                                                        <p class="dev">Developer</p>
                                                        <p class ="underline" >${ObtainInfo(listOfGames[i].developers, false)}</p>

                                                        <p class="age">Age rating</p>
                                                        <p>${ObtainInfo(listOfGames[i].esrb_rating, false)}</p>
                                                        <!-- <div class=">
                                                            <svg width="15" height="15" viewBox="0 0 24 22" fill="#36B972" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8 17.3692L23.801 17.3722C24.131 17.8022 24.289 19.2311 22.026 18.9771C21.0968 18.8863 20.1834 18.6746 19.309 18.3471C18.6256 18.0851 17.9719 17.7513 17.359 17.3512C16.4507 17.7167 15.4886 17.9309 14.511 17.9851C13.8134 18.9213 12.9065 19.6813 11.8628 20.2046C10.8191 20.7279 9.66754 20.9999 8.50001 20.999C7.71224 20.9997 6.9293 20.8762 6.18001 20.633C5.74001 20.888 5.24001 21.137 4.68801 21.346C3.56801 21.77 2.63901 21.929 1.97101 21.976C1.47101 22.0129 1.11801 21.9869 0.944007 21.967C0.562007 21.923 0.220007 21.705 0.0720068 21.339C0.00844977 21.1806 -0.0135218 21.0086 0.00818299 20.8394C0.0298878 20.6701 0.0945468 20.5092 0.196007 20.372C0.448007 20.027 0.680007 19.6661 0.900007 19.3001C1.32801 18.5861 1.74801 17.8162 1.85401 16.9782C1.38506 16.083 1.10189 15.1023 1.02149 14.0949C0.941088 13.0875 1.06512 12.0743 1.38614 11.1161C1.70715 10.1578 2.21853 9.27435 2.88956 8.51869C3.56058 7.76303 4.37742 7.15078 5.29101 6.71869C5.61087 5.51028 6.17897 4.38175 6.95912 3.40502C7.73926 2.4283 8.71434 1.6248 9.8222 1.04573C10.9301 0.466661 12.1464 0.124726 13.3937 0.0417165C14.6411 -0.0412933 15.892 0.136442 17.0669 0.563596C18.2417 0.99075 19.3147 1.65795 20.2174 2.52269C21.1201 3.38742 21.8327 4.43072 22.3099 5.58608C22.7871 6.74145 23.0183 7.98356 22.9889 9.23324C22.9595 10.4829 22.67 11.7128 22.139 12.8444C21.949 14.5683 22.816 16.0192 23.799 17.3692H23.8ZM7.00001 8.99958C7.00055 7.94483 7.23947 6.90384 7.69891 5.95439C8.15834 5.00495 8.82642 4.17161 9.65321 3.51664C10.48 2.86167 11.4441 2.402 12.4736 2.172C13.503 1.942 14.5711 1.9476 15.598 2.18838C16.625 2.42917 17.5842 2.89891 18.4041 3.56252C19.224 4.22612 19.8833 5.06643 20.3327 6.02063C20.7822 6.97484 21.0102 8.01828 20.9997 9.07298C20.9891 10.1277 20.7404 11.1664 20.272 12.1114C20.224 12.208 20.1919 12.3116 20.177 12.4184C19.958 13.9933 20.327 15.4293 21.082 16.8082C19.9899 16.5425 18.9604 16.0651 18.052 15.4033C17.9061 15.2974 17.7342 15.233 17.5547 15.2168C17.3751 15.2006 17.1945 15.2332 17.032 15.3113C15.9647 15.8242 14.7848 16.0579 13.6025 15.9907C12.4203 15.9234 11.2744 15.5574 10.2722 14.9268C9.26994 14.2963 8.44403 13.4217 7.87176 12.3851C7.29948 11.3485 6.99955 10.1837 7.00001 8.99958ZM5.00401 9.25357C5.06025 11.2429 5.77405 13.1576 7.03384 14.6982C8.29362 16.2389 10.0284 17.3188 11.967 17.7692C10.9877 18.5666 9.76292 19.0011 8.50001 18.9991C7.77001 18.9991 7.07701 18.8581 6.44301 18.6021C6.29459 18.5421 6.13393 18.5186 5.97453 18.5335C5.81513 18.5485 5.66165 18.6015 5.52701 18.6881C5.08801 18.9711 4.56701 19.2531 3.97901 19.4761C3.6313 19.6086 3.2756 19.7192 2.91401 19.8071C3.24701 19.2001 3.58401 18.4771 3.73801 17.7972C3.81501 17.4602 3.85801 17.1332 3.87601 16.8262C3.88821 16.6288 3.84157 16.4322 3.74201 16.2612C3.25411 15.4227 2.99802 14.4695 3.00001 13.4994C3.00001 11.7894 3.78001 10.2625 5.00401 9.25357Z" fill="#36B972"/>
                                                            </svg>
                                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="#36B972" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.973 4.944C10.773 5.957 10.437 7.477 9.207 8.707C9.095 8.819 8.972 8.937 8.842 9.063C7.7 10.164 6 11.804 6 14.5C6 15.963 6.63 17.35 7.601 18.375C8.578 19.406 9.829 20 11 20H16C16.352 20 16.646 19.91 16.82 19.793C16.965 19.697 17 19.613 17 19.5C17 19.388 16.965 19.303 16.82 19.207C16.646 19.091 16.352 19 16 19H15C14.7348 19 14.4804 18.8946 14.2929 18.7071C14.1054 18.5196 14 18.2652 14 18C14 17.7348 14.1054 17.4804 14.2929 17.2929C14.4804 17.1054 14.7348 17 15 17H16.5C16.852 17 17.146 16.91 17.32 16.793C17.465 16.697 17.5 16.613 17.5 16.5C17.5 16.388 17.465 16.303 17.32 16.207C17.146 16.091 16.852 16 16.5 16H15.5C15.2348 16 14.9804 15.8946 14.7929 15.7071C14.6054 15.5196 14.5 15.2652 14.5 15C14.5 14.7348 14.6054 14.4804 14.7929 14.2929C14.9804 14.1054 15.2348 14 15.5 14H17C17.352 14 17.646 13.91 17.82 13.793C17.965 13.697 18 13.613 18 13.5C18 13.388 17.965 13.303 17.82 13.207C17.646 13.091 17.352 13 17 13H16C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11H17C17.352 11 17.646 10.91 17.82 10.793C17.965 10.697 18 10.613 18 10.5C18 10.388 17.965 10.303 17.82 10.207C17.646 10.091 17.352 10 17 10H12.5C12.341 10 12.1843 9.96217 12.0429 9.88954C11.9015 9.8169 11.7794 9.71159 11.6868 9.58234C11.5942 9.45309 11.5338 9.30363 11.5105 9.14636C11.4872 8.98908 11.5018 8.82852 11.553 8.678V8.677L11.557 8.667L11.57 8.627L11.623 8.457C11.667 8.307 11.728 8.09 11.791 7.829C11.9431 7.21731 12.0362 6.59245 12.069 5.963C12.095 5.278 12.004 4.753 11.821 4.433C11.713 4.243 11.55 4.072 11.171 4.018C11.123 4.182 11.079 4.406 11.015 4.734L10.973 4.944ZM13.803 8C13.925 7.442 14.041 6.747 14.068 6.037C14.098 5.222 14.018 4.247 13.558 3.442C13.048 2.546 12.146 2 10.9 2C10.518 2 10.16 2.126 9.87 2.38C9.607 2.61 9.457 2.896 9.364 3.126C9.216 3.493 9.124 3.969 9.047 4.371L9.011 4.556C8.817 5.543 8.563 6.523 7.793 7.293C7.705 7.381 7.598 7.483 7.476 7.598C6.353 8.662 4 10.893 4 14.5C4 16.537 4.87 18.4 6.149 19.75C7.422 21.094 9.171 22 11 22H16C16.648 22 17.354 21.84 17.93 21.457C18.535 21.053 19 20.387 19 19.5C19 19.031 18.87 18.625 18.66 18.285C19.149 17.875 19.5 17.272 19.5 16.5C19.5 16.031 19.37 15.624 19.16 15.286C19.649 14.876 20 14.272 20 13.5C20 12.891 19.782 12.387 19.449 12C19.781 11.613 20 11.109 20 10.5C20 9.612 19.535 8.947 18.93 8.543C18.354 8.159 17.648 8 17 8H13.803Z" fill="#36B972"/>
                                                            </svg>
                                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="#36B972" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.293 2.29303C11.4805 2.10556 11.7348 2.00024 12 2.00024C12.2652 2.00024 12.5195 2.10556 12.707 2.29303L16.707 6.29303C16.8892 6.48163 16.99 6.73423 16.9877 6.99643C16.9854 7.25863 16.8802 7.50944 16.6948 7.69485C16.5094 7.88026 16.2586 7.98543 15.9964 7.9877C15.7342 7.98998 15.4816 7.88919 15.293 7.70703L13 5.41403V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8947 12.2652 16 12 16C11.7348 16 11.4804 15.8947 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V5.41403L8.707 7.70703C8.5184 7.88919 8.2658 7.98998 8.0036 7.9877C7.7414 7.98543 7.49059 7.88026 7.30518 7.69485C7.11977 7.50944 7.0146 7.25863 7.01233 6.99643C7.01005 6.73423 7.11084 6.48163 7.293 6.29303L11.293 2.29303ZM5 13C5 12.2044 5.31607 11.4413 5.87868 10.8787C6.44129 10.3161 7.20435 10 8 10H9C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4805 10 10.7348 10 11C10 11.2652 9.89464 11.5196 9.70711 11.7071C9.51957 11.8947 9.26522 12 9 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4805 7 12.7348 7 13V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8947 7.73478 20 8 20H16C16.2652 20 16.5196 19.8947 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V13C17 12.7348 16.8946 12.4805 16.7071 12.2929C16.5196 12.1054 16.2652 12 16 12H15C14.7348 12 14.4804 11.8947 14.2929 11.7071C14.1054 11.5196 14 11.2652 14 11C14 10.7348 14.1054 10.4805 14.2929 10.2929C14.4804 10.1054 14.7348 10 15 10H16C16.7956 10 17.5587 10.3161 18.1213 10.8787C18.6839 11.4413 19 12.2044 19 13V19C19 19.7957 18.6839 20.5587 18.1213 21.1214C17.5587 21.684 16.7956 22 16 22H8C7.20435 22 6.44129 21.684 5.87868 21.1214C5.31607 20.5587 5 19.7957 5 19V13Z" fill="#36B972/>
                                                            </svg>
                                                        </div> -->

                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>            
                                        </div>                   
                                        <div class="col-5">
                                            <div class = "row"> 
                                                ${movieOfGame ? `                          
                                                <video class = "gameTrailer" controls width="640" height="480" >
                                                    <source src="${movieOfGame}"/>
                                                </video> `

                                                : `<img src = "${noBackgroundVideo}"> `
                                                    
                                                }
                                            </div>
                                            <div class = "row">
                                                <div class = "col-6">
                                                    <img class = "scshot" src="${Screens.pop()}">
                                                </div>
                                                <div class = "col-6">
                                                    <img class = "scshot" src="${Screens.pop()}">
                                                </div>
                                            </div>
                                            <div class = "row">
                                                <div class = "col-6">
                                                    <img class = "scshot" src="${Screens.pop()}">
                                                </div>
                                                <div class = "col-6">
                                                    <img class = "scshot" src="${Screens.pop()}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                `
                find = true 
        }
        i++
    }
    ModalShown.append(ModalToShow)
    const myModal = new bootstrap.Modal(document.getElementById('Modal'))
    myModal.show()
    find = false
}