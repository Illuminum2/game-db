import games from '../data/games.js'

// This is a fake ID
let gamesID = games.length

const get = () => {
    return games
}

const getOne = (id) => {
    const index = games.findIndex(g => g.id === id)
    return games[index]
}

const create = (game) => {
    game.id = ++gamesID
    games = [game, ...games]
}

const update = (game) => {
    const index = games.findIndex(g => g.id === game.id)

    if (index >= 0) {
        games[index] = game
        return true
    }
    else {
        return false
    }
}

const remove = (id) => {
    const index = games.findIndex(g => g.id = id)

    if (index >= 0) {
        games.splice(index, 1)
        return true
    }
    else {
        return false
    }
}

export default {get, getOne, create, update, remove}