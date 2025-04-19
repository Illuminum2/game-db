const gameContainer = document.querySelector('.game-container')
import gamesData from './data/games.js'

// Initialize all bootstrap popovers
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let games = [ // Let because it will be used differently later
    {
        id: 0,
        title: 'BeatSaber',
        genre: 'Rhythm',
        release: new Date('21.2.2019'),
        developer: 'Beat Games',
        publisher: 'Beat Games',
        description: 'VR rhythm game where your goal is to slash the beats as they are coming at you',
        platforms: ['PCVR', 'Standalone VR']
    },
    {
        id: 1,
        title: 'Bonelab',
        genre: 'Shooter',
        release: new Date('29.9.2022'),
        developer: 'Stress Level Zero',
        publisher: 'Stress Level Zero',
        description: 'VR game where you embody an outcast escaping fate',
        platforms: ['PCVR', 'Standalone VR']
    },
    {
        id: 1,
        title: 'Bonelab',
        genre: 'Shooter',
        release: new Date('29.9.2022'),
        developer: 'Stress Level Zero',
        publisher: 'Stress Level Zero',
        description: 'VR game where you embody an outcast escaping fate',
        platforms: ['PCVR', 'Standalone VR']
    }
]


// const init = async () => {
//     const URL = baseURl + '/products.json'
//     fetch(URL)
//     .then((result) => result.json())
//     .then((result) => {
//         products = result;
//         fillTable(result)
//     })
// }

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

    // <div class="card text-bg-dark mb-3 game" style="max-width: 540px;">
    //     <div class="row g-0">
    //       <div class="col-md-4 game-img-holder">
    //         <img src="https://picsum.photos/200/300" class="img-fluid rounded-start align-items-center game-img" alt="...">
    //       </div>
    //       <div class="col-md-8">
    //         <div class="card-body">
    //           <h5 class="card-title">Title</h5>
    //           <ul class="list-group list-group-flush">
    //             <li class="list-group-item text-bg-dark">Genre</li>
    //             <li class="list-group-item text-bg-dark">Release</li>
    //             <li class="list-group-item text-bg-dark">Developer</li>
    //             <li class="list-group-item text-bg-dark">Publisher</li>
    //             <li class="list-group-item text-bg-dark">Description</li>
    //             <li class="list-group-item text-bg-dark">Platforms</li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    
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

console.log(gamesData)
//fillTable(games)