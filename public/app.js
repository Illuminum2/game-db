const gameContainer = document.querySelector('.game-container')
// import gamesApiService from "./services/games-api.service"

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

const fillTable = (games) => {
    // {
    //     id: 1,
    //     title: 'Bonelab',
    //     genre: 'Shooter',
    //     release: '29.9.2022',
    //     developer: 'Stress Level Zero',
    //     publisher: 'Stress Level Zero',
    //     description: 'VR game where you embody an outcast escaping fate',
    //     platforms: ['PCVR', 'Standalone VR']
    // }
    
    let i = 0
    games.forEach(game => {
        const {title, genre, release, developer, publisher, description, platforms} = game

        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card text-bg-dark mb-3 game" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 game-img-holder">
                    <img src="https://picsum.photos/200/300" class="img-fluid rounded-start align-items-center game-img" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-bg-dark">${genre}</li>
                            <li class="list-group-item text-bg-dark">${release}</li>
                            <li class="list-group-item text-bg-dark">${developer}</li>
                            <li class="list-group-item text-bg-dark">${publisher}</li>
                            <li class="list-group-item text-bg-dark">${description}</li>
                            <li class="list-group-item text-bg-dark">${platforms}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
        gameContainer.append(div)
        i++
    });
}

//fillTable(games)