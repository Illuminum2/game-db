// const express = require('express')
import express from 'express'
// const gamesService = require('./services/games.service.js')
import gamesService from './services/games-db.service.js'

const app = express()
const port = 3000

app.use(express.json()) // Need this for JSON requests from games-api service
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

// Return ALL games
app.get('/game', async (req, res) => {
    const games = await gamesService.get()
    res.send(games)
})

// Return ONE game
app.get('/game/:id', async (req, res) => {
    const id = req.params.id

    const game = await gamesService.getOne(id)
    res.send(game)
})

// Create game
app.post('/game', async (req, res) => {
    const game = req.body

    if (game)
    {
        const result = await gamesService.create(game)

        res.status(201).send({message: 'Game created'})
    }
    else {
        res.status(422).send({message: 'Unporcessable entity'})
    }
})

// Update game
app.put('/game/:id', async (req, res) => {
    // Got id and game
    const id = req.params.id // Not used atm
    const game = req.body

    if (game) {
        const result = await gamesService.update(game)

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
app.delete('/game/:id', async (req, res) => {
    // Got id
    const id = req.params.id
    
    if (id || id == 0) {
        const result = await gamesService.remove(id)

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