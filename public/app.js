import gamesApiService from "./services/games-api.service.js"
import createGameElement from "./views/gameView.js"

const gamesContainer = document.querySelector('.games-container')
const deleteRadioBtn = document.getElementById('delete')
const addForm = document.querySelector('#addModal form')

const gameList = []

const platforms = [
    ["PC (Windows)", "windows", "windows"],
    ["MacOS", "mac", "apple"],
    ["PC (Linux)", "linux", "ubuntu"],
    ["Nintendo Switch", "switch", "nintendo-switch"],
    ["Play Station", "playstation", "playstation"],
    ["X-Box", "xbox", "xbox"],
    ["Web", "web", "browser-chrome"],
    ["PCVR (SteamVR)", "steamvr", "steam"],
    ["Meta Quest", "quest", "meta"],
    ["iOS", "ios", "apple"],
    ["Android", "android", "android"]
]

const genres = [
    ["Pinball", "pinball", "circle"],
    ["Adventure", "adventure", "compass"],
    ["Indie", "indie", "stars"],
    ["Arcade", "arcade", "joystick"],
    ["Visual Novel", "visual-novel", "book"],
    ["Card & Board Game", "board", "dice-3"],
    ["MOBA", "moba", "map"],
    ["Point-and-click", "point-click", "mouse"],
    ["Fighting", "fighting", "lightning"],
    ["Shooter", "shooter", "crosshair"],
    ["Music", "music", "music-note-beamed"],
    ["Platformer", "platformer", "box"],
    ["Puzzle", "puzzle", "puzzle"],
    ["Racing", "racing", "speedometer"],
    ["Real Time Strategy", "rts", "clock-history"],
    ["Role-playing", "rpg", "person-badge"],
    ["Simulator", "simulator", "gear"],
    ["Sport", "sport", "dribbble"],
    ["Strategy", "strategy", "diagram-2"],
    ["Turn-based strategy", "tbs", "arrow-repeat"],
    ["Tactical", "tactical", "bullseye"],
    ["Hack and slash/Beat 'em up", "hack-slash", "droplet"],
    ["Quiz/Trivia", "quiz", "question-circle"]
]

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
    )
}, true)

const addAllGames = async () => {
    let games = await gamesApiService.get()

    // Remove all loaded games
    gamesContainer.innerHTML = ''
    while (gameList.length > 0)
    {
        gameList.pop()
    }

    games.forEach(gameData => {
        const game = new Game(gameData)
        gameList.push(game)

        // EventListener for delete
        game.element.addEventListener('click', () => {
            // Check if delete is selected in radio
            // https://community.wappler.io/t/need-help-with-dynamically-checked-bootstrap-radio-buttons/13509/6
            if (deleteRadioBtn.checked) {
                // Delete via API
                gamesApiService.remove(game.data.id)

                // Remove HTML element
                game.delete()
                
                // Remove Game object from gameList
                const index = gameList.indexOf(game)
                // Check if found (https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript)
                if (index > -1) {
                    gameList.splice(index, 1)
                }
            }
        })

        gamesContainer.append(game.element)
    })

    tooltipInit()
}

class Game {
    constructor(gameData) {
        this.data = gameData // All game properties
        this.element = createGameElement(gameData) // The HTML game elment
    }
    
    edit(gameData) {
        this.data = gameData
        this.element = createGameElement(gameData)
    }
    
    delete() {
        this.element.remove()
    }
    
    show() {
        this.element.removeAttribute('hidden')
    }
    
    search(query) {
        if (!this.data.title.includes(query)) {
            this.element.setAttribute('hidden', '')
        }
    }
}

// Add game form handler
addForm.addEventListener('submit', (event) => {
    // No page refresh on submit
    event.preventDefault()
    
    // Get values from form
    const title = document.getElementById('addInputTitle').value
    const selectedGenres = []
    document.querySelectorAll('.genre-select input[type="checkbox"]:checked').forEach(checkbox => {
        // Get the genre identifier from the checkbox ID and remove 'selectGenre' before genre name and lower case first letter
        const genreId = checkbox.id.replace('selectGenre', '').toLowerCase()
        
        genres.forEach(genre => {
            // Check for genre match
            if (genre[1] === genreId) {
                selectedGenres.push(genre)
            }
        })
    })
    const releaseDate = new Date(document.getElementById('addInputReleaseDate').value)
    const description = document.getElementById('addInputDescription').value
    const selectedPlatforms = []
    document.querySelectorAll('.platform-select input[type="checkbox"]:checked').forEach(checkbox => {
        const platformId = checkbox.id.replace('selectPlatform', '').toLowerCase()
        
        platforms.forEach(platform => {
            if (platform[1] === platformId) {
                selectedPlatforms.push(platform)
            }
        })
    })
    const developer = document.getElementById('addInputDeveloper').value
    const publisher = document.getElementById('addInputPublisher').value
    const logo = document.getElementById('addInputLogo').value
    const bg = document.getElementById('addInputBg').value
    
    // Game properties with variables
    const newGame = {
        title,
        genres: selectedGenres, // Save as genres because API expects genres as name
        releaseDate,
        description,
        platforms: selectedPlatforms, // Save as platforms because API expects platforms as name
        developer,
        publisher,
        logo,
        bg
    }
    
    // Send to server
    gamesApiService.create(newGame)
    .then(() => {
        // Clear form data
        addForm.reset()
        
        // Hide the modal
        // https://getbootstrap.com/docs/5.3/components/modal/#passing-options
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide()
        
        // Reload games list
        addAllGames()
    })
})

addAllGames()