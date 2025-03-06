{/* <tr>
    <th scope="col">Title</th>
    <th scope="col">Genre</th>
    <th scope="col">Release</th>
    <th scope="col">Developer</th>
    <th scope="col">Publisher</th>
    <th scope="col">Description</th>
    <th scope="col">Platforms</th>
    <th scope="col"></th>
</tr> */}

let games = [ // Let because it will be used differently later
    {
        id: 0,
        title: 'BeatSaber',
        genre: 'Rhythm',
        release: '21.2.2019',
        developer: 'Beat Games',
        publisher: 'Beat Games',
        description: 'VR rhythm game where your goal is to slash the beats as they are coming at you',
        platforms: ['PCVR', 'Standalone VR']
    },
    {
        id: 1,
        title: 'Bonelab',
        genre: 'Shooter',
        release: '29.9.2022',
        developer: 'Stress Level Zero',
        publisher: 'Stress Level Zero',
        description: 'VR game where you embody an outcast escaping fate',
        platforms: ['PCVR', 'Standalone VR']
    }
]

const tableBody = document.querySelector('tbody')
// const baseURl = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store'


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
    
    let i = 0
    games.forEach(game => {
        const {title, genre, release, developer, publisher, description, platforms} = game

        const tr = document.createElement('tr')
        tr.innerHTML = `
                <th scope="col">${title}</th>
                <th scope="col">${genre}</th>
                <th scope="col">${release}</th>
                <th scope="col">${developer}</th>
                <th scope="col">${publisher}</th>
                <th scope="col">${description}</th>
                <th scope="col">${platforms}</th>
                <th scope="col"></th>
        `
        tableBody.append(tr)
        i++
    });
}

fillTable(games)