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
            row.genres = JSON.parse(row.genres)
            row.platforms = JSON.parse(row.platforms)

            const releaseDate = new Date(row.releaseDate)
            const year = releaseDate.getFullYear() // Crash here because not defined, conversion issue probably
            const month = String(releaseDate.getMonth() + 1).padStart(2, '0');
            const day = String(releaseDate.getDate()).padStart(2, '0');
            row.releaseDate = year + '-' + month + '-' + day
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
            row.genres = JSON.parse(row.genres)
            row.platforms = JSON.parse(row.platforms)

            const releaseDate = new Date(row.releaseDate)
            const year = releaseDate.getFullYear()
            const month = String(releaseDate.getMonth() + 1).padStart(2, '0');
            const day = String(releaseDate.getDate()).padStart(2, '0');
            row.releaseDate = year + '-' + month + '-' + day

            return row
        }
        return {}; // Return empty {} if row is null
    })
}

const create = (game) => {
    // Destructoring
    const {title, genres, releaseDate, description, platforms, developer, publisher, logo, bg} = game

    let genresData = JSON.stringify(genres)
    let platformsData = JSON.stringify(platforms)

    const release = new Date(game.releaseDate)

    const year = release.getFullYear()
    // Month and day start with 0 and padding
    const month = String(release.getMonth() + 1).padStart(2, '0');
    const day = String(release.getDate()).padStart(2, '0');
    const date = year + '-' + month + '-' + day

    const values = [title, genresData, date, description, platformsData, developer, publisher, logo, bg]

    connection
    .then(conn => {
        return conn.query('INSERT INTO Game (title, genres, releaseDate, description, platforms, developer, publisher, logo, bg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', values)
    })
    .then(([result]) => {
        // Need to return promise
        return { id: result.insertId, affected: result.affectedRows }
    })
}

const update = (game) => {
    const {id, title, genres, releaseDate, description, platforms, developer, publisher, logo, bg} = game

    let genresData = JSON.stringify(genres)
    let platformsData = JSON.stringify(platforms)

    const release = new Date(game.releaseDate)

    const year = release.getFullYear()
    // Month and day start with 0 and padding
    const month = String(release.getMonth() + 1).padStart(2, '0');
    const day = String(release.getDate()).padStart(2, '0');
    const date = year + '-' + month + '-' + day

    const values = [title, genresData, date, description, platformsData, developer, publisher, logo, bg, id]

    return connection
    .then(conn => {
        return conn.query('UPDATE Game SET title = ?, genres = ?, releaseDate = ?, description = ?, platforms = ?, developer = ?, publisher = ?, logo = ?, bg = ? WHERE id = ?', values)
    })
    .then(([result]) => {
        // Need to return promise
        return { id: result.insertId, affected: result.affectedRows }
    })
}

const remove = (id) => {
    return connection
    .then(conn => {
        return conn.query('DELETE Game FROM Game WHERE id = ?', id)
    })
    .then(([result]) => {
        // Need to return promise
        return { id: result.insertId, affected: result.affectedRows }
    })
}

export default {get, getOne, create, update, remove}