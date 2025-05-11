const baseUrl = 'http://localhost:3000/game/'
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json' 
}

const get = () => {
    // No need to specify get
    return fetch(baseUrl)
    .then(httpResponse => httpResponse.json())
}

const getOne = (id) => {
    const url = `${baseUrl}/${id}`
    return fetch(url)
    .then(httpResponse => httpResponse.json())
}

const create = (game) => {
    return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(game),
        // Headers is the same as headers: headers
        headers
        
    })
    .then(httpResponse => httpResponse.json())
}

const update = (game) => {
    const url = `${baseUrl}/${game.id}`
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(game),
        headers
        
    })
    .then(httpResponse => httpResponse.json())
}

const remove = (id) => {
    const url = `${baseUrl}/${id}`
    return fetch(url, {
        method: 'DELETE',
        
    })
    .then(httpResponse => httpResponse.json())
}

export default {get, getOne, create, update, remove}

// Usage:

// gamesService.get()
// .then (_games => {
//     games = _games
// })