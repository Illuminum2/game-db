import gamesApiService from "./services/games-api.service.js"
import createGameElement from "./views/gameView.js"

const gamesContainer = document.querySelector('.games-container')
const deleteRadioBtn = document.getElementById('delete')

const gameList = []

// Initialize all bootstrap tooltips
// From Bootstrap Docs
const tooltipInit = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Hide tooltips on scroll
// Modified from https://stackoverflow.com/questions/58195249/remove-bootstrap-4-tooltip-on-page-scroll-on-mobile-and-re-enable-on-tap-on-togg
window.addEventListener('scroll', function () {
    tooltipList.forEach(
        tooltip => tooltip.hide()
    );
}, true);

const addAllGames = async () => {
    let games = await gamesApiService.get();

    // Remove all loaded games
    gamesContainer.innerHTML = ''
    while (gameList.length > 0)
    {
        gameList.pop()
    }

    games.forEach(gameData => {
        const game = new Game(gameData);
        gameList.push(game);

        // EventListener for delete
        game.element.addEventListener('click', () => {
            // Check if delete is selected in radio
            // https://community.wappler.io/t/need-help-with-dynamically-checked-bootstrap-radio-buttons/13509/6
            if (deleteRadioBtn.checked) {
                // Delete via API
                gamesApiService.remove(game.data.id);

                // Remove HTML element
                game.delete();
                
                // Remove Game object from gameList
                const index = gameList.indexOf(game);
                // Check if found (https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript)
                if (index > -1) {
                    gameList.splice(index, 1);
                }
            }
        });

        gamesContainer.append(game.element);
    });

    tooltipInit()
}
class Game {
    constructor(gameData) {
        this.data = gameData; // All game properties
        this.element = createGameElement(gameData); // The HTML game elment
    }
    
    edit(gameData) {
        this.data = gameData;
        this.element = createGameElement(gameData);
    }
    
    delete() {
        this.element.remove();
    }
    
    show() {
        this.element.removeAttribute('hidden');
    }
    
    search(query) {
        if (!this.data.title.includes(query)) {
            this.element.setAttribute('hidden', '');
        }
    }
}

addAllGames()