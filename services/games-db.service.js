import mysql from 'mysql2/promise' // Short hand of '../node_modules/mysql2/promise'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secureDoNotChangeMe',
    database: 'game-db'
})

const get = () => {
    return connection
    .then(conn => {
        const result = conn.query('SELECT * FROM Game')
        return result
    })
    .then(([rows, fields]) => {
        rows.forEach(row => {
            // Convert strings back to arrays
            row.genres = JSON.parse(row.genres);
            row.platforms = JSON.parse(row.platforms);
        });

        return rows
    })
}

const getOne = (id) => {
    return connection
    .then(conn => {
        const result = conn.query('SELECT * FROM Game WHERE id = ?', [id])
        return result
    })
    .then(([rows, fields]) => rows)
    .then(rows => rows && rows.length > 0 ? rows[0] : null) // Return null if not found
    .then(row => {
        if (row) {
            // Convert strings back to arrays
            row.genres = JSON.parse(row.genres);
            row.platforms = JSON.parse(row.platforms);

            return row
        }
        return {}; // Return empty {} if row is null
    })
}

const create = (game) => {
    // Destructoring
    const {title, genres, releaseDate, description, platforms, developer, publisher, logo, bg} = game
    const values = [title, genres, releaseDate, description, platforms, developer, publisher, logo, bg]

    connection
    .then(conn => {
        conn.query('INSERT INTO Game (title, genres, releaseDate, description, platforms, developer, publisher, logo, bg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', values)
    })
}

const update = (game) => {
    const {title, genres, releaseDate, description, platforms, developer, publisher, logo, bg} = game
    const values = [title, genres, releaseDate, description, platforms, developer, publisher, logo, bg]

    connection
    .then(conn => {
        conn.query('UPDATE Game SET name = ?, genres = ?, releaseDate = ?, platforms = ?, developer = ?, publisher = ?, logo = ?, bg = ?', values)
    })
}

const remove = (id) => {
        connection
    .then(conn => {
        conn.query('DELETE Game FROM Game WHERE id = ?', id)
    })
}

export default {get, getOne, create, update, remove}