#10 pin bowling API

## Provides 4 API end points:

1. Start a new game - _./api/new_ (POST)

2. Record a player's frame result - _./api/result/:gameId/:playerId_ (PATCH)

3. Fetch a player's current score and frame by frame history - _./api/result/:gameId/:playerId_ (GET)

4. Fetch the results/scores for a given game - _./api/history/:gameId_ (GET)

This has been implemented within Node.js

## Dependencies

1. MongoDB \** In this implementation the database name is *tenpin* and the collection is *games\*

2. Node.js depenencies

```javascript
yarn add
```

## Testing

```javascript
yarn test
```

Requires _jest_ to be installed

The test includes 3 unit tests in an attempt to provide some confidence on the ten pin scoring calculation object _Scoring_

- Average Game
- Perfect Game
- Tragic Game

Also the tesing suite includes 2 end-to-end tests

- Game Creation
- Game Simulation

## Start the Server

```javascript
yarn start
```

The server will start on port 3900 as set within ./config/default.json

## Data Structure

Each game is stored within it own document inside the _games_ collection and has the following structure

```json
{
  "players": [
    {
      "id": 1,
      "name": "A. Player"
    }
  ],
  "results": [
    {
      "id": 1,
      "results": []
    }
  ],
  "scores": [
    {
      "id": 1,
      "scores": []
    }
  ],
  "ballValues": [
    {
      "id": 1,
      "ballValues": []
    }
  ],
  "_id": "hex * 24",
  "__v": 0
}
```
