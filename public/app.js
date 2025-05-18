import gamesApiService from "./services/games-api.service.js"
import createGameElement from "./views/gameView.js"

const gamesContainer = document.querySelector('.games-container')

const deleteRadioBtn = document.getElementById('delete')

const addForm = document.querySelector('#addModal form')

const editRadioBtn = document.getElementById('edit')
const editForm = document.querySelector('#editModal form')
let currentEditGame = null // Store the game being edited

const searchBox = document.querySelector('form[role="search"] input[type="search"]')

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
let tooltipTriggerList
let tooltipList

const tooltipInit = () => {
    tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Hide tooltips on scroll
// Modified from https://stackoverflow.com/questions/58195249/remove-bootstrap-4-tooltip-on-page-scroll-on-mobile-and-re-enable-on-tap-on-togg
window.addEventListener('scroll', function () {
    tooltipList.forEach(
        tooltip => tooltip.hide()
    )
}, true)

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
        if (!this.data.title.toLowerCase().includes(query)) {
            this.element.setAttribute('hidden', '')
        }
    }
}

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

        // EventListener for game clicks
        game.element.addEventListener('click', () => {
            // Check if delete is selected in radio
            if (deleteRadioBtn.checked) {
                // Delete via API
                gamesApiService.remove(game.data.id)

                // Remove HTML element
                game.delete()
                
                // Remove Game object from gameList
                // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
                const index = gameList.indexOf(game)
                if (index > -1) {
                    gameList.splice(index, 1)
                }
            }
            // Check if edit is selected in radio
            else if (editRadioBtn.checked) {
                currentEditGame = game
                
                // Fill the edit form with game data
                document.getElementById('editInputTitle').value = game.data.title
                
                // Clear all checkboxes
                // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
                document.querySelectorAll('#editModal .genre-select input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false
                })
                
                // Check genres that match game data
                game.data.genres.forEach(gameGenre => {
                    // Upper case first letter of genre id
                    const genreName = gameGenre[1]
                    const genreId = genreName.charAt(0).toUpperCase() + genreName.slice(1)
                    const elementId = `editSelectGenre${genreId}`
                    const checkbox = document.getElementById(elementId)
                    if (checkbox) {
                        checkbox.checked = true
                    }
                })
                
                // Format date for input
                const releaseDate = new Date(game.data.releaseDate)
                const year = releaseDate.getFullYear()
                const month = String(releaseDate.getMonth() + 1).padStart(2, '0')
                const day = String(releaseDate.getDate()).padStart(2, '0')
                document.getElementById('editInputReleaseDate').value = year + '-' + month + '-' + day
                
                document.getElementById('editInputDescription').value = game.data.description
                
                // Clear all platform checkboxes
                // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
                document.querySelectorAll('#editModal .platform-select input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false
                })
                
                // Check platforms that match game data
                game.data.platforms.forEach(gamePlatform => {
                    const platformName = gamePlatform[1]
                    const platformId = platformName.charAt(0).toUpperCase() + platformName.slice(1)
                    const elementId = `editSelectPlatform${platformId}`
                    const checkbox = document.getElementById(elementId)
                    if (checkbox) {
                        checkbox.checked = true
                    }
                })
                
                document.getElementById('editInputDeveloper').value = game.data.developer
                document.getElementById('editInputPublisher').value = game.data.publisher
                document.getElementById('editInputLogo').value = game.data.logo
                document.getElementById('editInputBg').value = game.data.bg
                
                // Show the edit modal
                const editModal = new bootstrap.Modal(document.getElementById('editModal'))
                editModal.show()
            }
        })

        gamesContainer.append(game.element)
    })

    tooltipInit()
}

// Add game form handler
addForm.addEventListener('submit', (event) => {
    // No page refresh on submit
    event.preventDefault()
    
    // Get values from form
    const title = document.getElementById('addInputTitle').value
    const selectedGenres = []
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    document.querySelectorAll('.genre-select input[type="checkbox"]:checked').forEach(checkbox => {
        // Get the genre id from the checkbox ID and remove 'selectGenre' before genre name and lower case first letter
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


// Edit game form handler
editForm.addEventListener('submit', (event) => {
    // No page refresh on submit
    event.preventDefault()
    
    // if (!currentEditGame)
    //    return
    
    const title = document.getElementById('editInputTitle').value
    const selectedGenres = []
    document.querySelectorAll('#editModal .genre-select input[type="checkbox"]:checked').forEach(checkbox => {
        const genreId = checkbox.id.replace('editSelectGenre', '').toLowerCase()

        genres.forEach(genre => {
            if (genre[1] === genreId) {
                selectedGenres.push(genre)
            }
        })
    })
    const releaseDate = new Date(document.getElementById('editInputReleaseDate').value)
    const description = document.getElementById('editInputDescription').value
    const selectedPlatforms = []
    document.querySelectorAll('#editModal .platform-select input[type="checkbox"]:checked').forEach(checkbox => {
        const platformId = checkbox.id.replace('editSelectPlatform', '').toLowerCase()
        
        platforms.forEach(platform => {
            if (platform[1] === platformId) {
                selectedPlatforms.push(platform)
            }
        })
    })
    const developer = document.getElementById('editInputDeveloper').value
    const publisher = document.getElementById('editInputPublisher').value
    const logo = document.getElementById('editInputLogo').value
    const bg = document.getElementById('editInputBg').value
    
    // Update game object
    const updatedGame = {
        id: currentEditGame.data.id, // Include id for updating
        title,
        genres: selectedGenres,
        releaseDate,
        description,
        platforms: selectedPlatforms,
        developer,
        publisher,
        logo,
        bg
    }

    gamesApiService.update(updatedGame)
    .then(() => {
        editForm.reset()
        
        currentEditGame = null
        
        addAllGames()
    })
})

const search = () => {
    // Get search text and convert to lower case for search
    const searchText = searchBox.value.toLowerCase()
    
    /*
    // https://stackoverflow.com/questions/8135132/how-to-encode-url-parameters // Not needed, urlParams.set already does this
    urlParams.set('search', searchBox.value) // Circumvent toLowerCase()
    // window.location.search = urlParams.toString() // Doesn't work, causes reload
    window.history.replaceState({}, '', '?' + urlParams.toString())
    */

    window.history.pushState({}, '', `?search=${encodeURIComponent(searchBox.value)}`)

    gameList.forEach(game => {
        // First show all games
        game.show()
        
        // Exclude empty search box
        if (searchText !== '') {
            // Hide games that do not match
            game.search(searchText)
        }
    })
}

// On key release in search
searchBox.addEventListener('keyup', () => {
    search()
})

// On search enter, can't use searchBox
// https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
document.querySelector('form[role="search"]').addEventListener('submit', (event) => {
    // No page refresh on submit
    event.preventDefault()
})

await addAllGames()

const urlParams = new URLSearchParams(window.location.search)
const searchParam = urlParams.get('search')

if (searchParam) {
    // Set the search box input value
    searchBox.value = searchParam
    
    search()
}