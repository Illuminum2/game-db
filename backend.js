// const express = require('express')
import express from 'express'
// const gamesService = require('./services/games.service.js')
import gamesService from './services/games.service.js'

const app = express()
const port = 3000

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// Return ALL games
app.get('/game', (req, res) => {
    const games = gamesService.get()

    res.send(games)
})

// Return ONE game
app.get('/game/:id', (req, res) => {
    const id = req.params.id

    const game = gamesService.getOne(id)

    res.send(game)
})

// Create game
app.post('/game', (req, res) => {
    const game = req.body

    if (game)
    {
        const result = gamesService.create(game)

        res.status(201).send({message: 'Game created'})
    }
    else {
        res.status(422).send({message: 'Unporcessable entity'})
    }
})

// Update game
app.put('/game', (req, res) => {
    // Got id and game
    const id = req.params.id // Not use atm
    const game = req.body

    if (game) {
        const result = gamesService.update(game)

        if (result) {
            res.status(200).send({message: 'Game updated'})
        }
        else {
            res.status(422).send({message: 'Unporcessable entity'})
        }
    }
    else {
        res.status(422).send({message: 'Unporcessable entity'})
    }
})

// Delete game
app.delete('/game/:id', (req, res) => {
    // Got id
    const id = req.params.id
    
    if (id || id == 0) {
        const result = gamesService.remove(id)

        if (result) {
            res.status(204).send({message: 'Game removed'})
        }
        else {
            res.status(422).send({message: 'Unporcessable entity'})
        }
    }
    else {
        res.status(422).send({message: 'Unporcessable entity'})
    }
})