# NodeJS GameDB

This is a game database web app with a NodeJS backend and a MySQL DB. I made this a while back, and spent quite a while experimenting with various design for the game card.

## Features

- Browse and search game library
- View detailed information for each game
- Responsive frontend
- RESTful API endpoints
- JSON columns in DB for some more complex game attributes

## How to Run

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Illuminum2/NodeJSGameDB.git
   cd NodeJSGameDB
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the DB:**
   ```sh
   docker compose up -d
   ```

   **Note:** The default MySQL root password is `secureDoNotChangeMe`. This can be changed by updating `docker-compose.yaml` and `createDB.js`.

4. **Set up the DB:**
   ```sh
   npm run init
   ```
   Or manually import `data/game-db.sql` into your MySQL DB

5. **Start the backend:**
   ```sh
   npm start
   ```

   It should now be running on http://localhost:3000

## Technical Details

- **Frontend**: Responsive CSS design with vanilla JS in a service-based architecture
- **Backend**: Node.js with Express.js framework for API endpoints
- **Database**: MariaDB running in Docker container

## API Endpoints

- `GET /api/games` - Retrieve all games
- `GET /api/games/:id` - Get specific game details
- `POST /api/games` - Add new game
- `PUT /api/games/:id` - Update game information
- `DELETE /api/games/:id` - Remove game

## License

This project is licensed under the [MIT License](LICENSE.md).