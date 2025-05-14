import gamesApiService from "./services/games-api.service.js"
import createGameElement from "./views/gameView.js"

const gamesContainer = document.querySelector('.games-container')

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

    games.forEach(game => {
        const gameElement = createGameElement(game)
        gamesContainer.append(gameElement)
    });

    tooltipInit()
}

addAllGames()