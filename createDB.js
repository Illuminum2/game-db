import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secureDoNotChangeMe',
    database: 'game-db',
    multipleStatements: true // This is needed, because there are mutliple statements in the file
})

const executeSqlFile = async () => {
    // Modified file from PHPMyAdmin -> Table -> Export -> SQL
    const sqlFilePath = path.join('./data/game-db.sql');
    // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    const sqlFile = await fs.readFile(sqlFilePath, 'utf-8');

    await connection.query(sqlFile);
    await connection.end()
}

await executeSqlFile();