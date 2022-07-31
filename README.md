# :wave:Welcome!:blush:

Hello there! My name is Franco. Welcome to my repository through my path in Become a Front-End Developer with Altimetrik | 2nd Edition.

This is a work in progress. The objective of this repository is to get knowledge to become a Front-End Developer.

## GameFinder

### A briefly description of the project:

This project is about making a Game Finder webpage.

The first page it is a login form page, where the user must put the right credentials to be able to access to the Game Finder web. Also, this page has a interactive carousel.

After validating the credentials, the user can login.

Once logged in the user will be in the Game Finder, in this page will be the top twenty games obtained from RAWG API. The user can scroll infinitely and the webpage will show more games.

Also, it has a search bar to look for games, this search bar it is implemented in a way that can filter games by name or console.

After searching for something, the user can see the last searched games, clicking the last search button.

Also, it has a light theme and the mobile version is implemented.

### Technologies / concepts learned and applied in this project:

To implement the webpage, I used HTML, CSS, Boostrap framework and JavaScript.

To validate the credentials I used [JSON Server Auth](https://www.npmjs.com/package/json-server-auth), which must be up to be able to login. 
To register a user, I used [POSTMAN](https://www.postman.com)

In the Game Finder to obtain the games I used the [RAWG API](https://rawg.io/apidocs).
To be able to make this feature I have to learn about: Promises, Status of promises, Async Await, Fetch, Objects, DOM. Also, I read the documentation of the RAWG API.

To implement the Modal, I use bubbling and capturing and multiple fetchs.

To search games in an effectively way I used the debounce function.

### Coming soon features:

One of the most challenging things for me was making the search bar, so in the future I hope to improve the code and add some features to the search bar.

Actually I have not any new features to implement, so I am working on make my code cleaner
and improve the user experience

### How to run the Project.

1. Copy the repo.
2. If you have JSON Server installed go to the 6 step, otherwise
3. Install [node.js](https://nodejs.org/en/download/) to use node package manager.
4. Open the terminal and write `npm init` and complete the installation.
5. Install JSON Server: `npm install -D json-server npm install -D json-server-auth` If you want to read the [documentation](https://www.npmjs.com/package/json-server-auth)
6. To launch the server: `npx json-server-auth db.json`
7. The credentials to login are: 
     email": "olivier@mail.com
     password": "bestPassw0rd
8. If you want to register a new user, use the PUT method in [POSTMAN](https://www.postman.com) with the server launched. 

If you have read this far, I really appreciate it. I hope you enjoy the webpage.

## Bibliography

In case you are looking for the document itself; Here is the [documentation](https://docs.google.com/document/d/191U1mJKlibWUYH-CcIqu9mGPMU-PC8lbPmBQXbSGTQY/edit?usp=sharing) that I wrote and used for make this repository.




