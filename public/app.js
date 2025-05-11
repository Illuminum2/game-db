import gamesApiService from "./services/games-api.service"
import createGameElement from "./views/gameView"

const gameContainer = document.querySelector('.game-container')

// Initialize all bootstrap tooltips
// From Bootstrap Docs
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Hide tooltips on scroll
// Modified from https://stackoverflow.com/questions/58195249/remove-bootstrap-4-tooltip-on-page-scroll-on-mobile-and-re-enable-on-tap-on-togg
window.addEventListener('scroll', function () {
    tooltipList.forEach(
        tooltip => tooltip.hide()
    );
}, true);

const addGames = () => {
    let games = gamesApiService.get();
    let i = 0
    games.forEach(game => {
        const gameElement = createGameElement(game)
        gameContainer.append(div)
        i++
    });
}

addGames()