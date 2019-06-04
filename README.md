#10 pin bowling API

## Provides 4 API end points:

1. Start a new game - _./api/new_ (POST)

2. Record a player's frame result - _./api/result/:gameId/:playerId_ (PATCH)

3. Fetch a player's current score and frame by frame history - _./api/score/:gameId/:playerId_ (GET)

4. Fetch the results/scores for a given game - _./api/history/:gameId_ (GET)

This has been implemented within Node.js

## Dependencies

1. MongoDB - In this implementation the database name is _tenpin_ and the collection is _games_

2. Node.js dependencies

```javascript
$ yarn add
```

## Testing

```javascript
$ yarn test
```

Requires _jest_ to be installed

The test includes 3 unit tests in an attempt to provide some confidence on the ten pin scoring calculation object _Scoring_

- Average Game
- Perfect Game
- Tragic Game

Also the testing suite includes 2 end-to-end tests

- Game Creation
- Game Simulation

The completion of the end-to-end tests will tear-down the test data

## Start the Server

```javascript
$ yarn start
```

The server will start on port 3900 as set within ./config/default.json

---

## Consuming/Using the APIs

###### Start a new game - _./api/new_ (POST)

     Header - Content-Type: application/json

     Body - for 2 players

```json
{ "1": "A. Player", "2": "B. Player2" }
```

- Body - for 1 player

```json
{ "1": "A. Player" }
```

- Server response

```json
{
  "_id": "5cf64bfca7695f365b0b6b5f",
  "players": [
    {
      "id": 1,
      "name": "A. Player"
    }
  ]
}
```

Where the value given under "\_id" is the game's id.

###### Record a player's frame result - _./api/result/:gameId/:playerId_ (PATCH)

     URL: /api/result/5cf64bfca7695f365b0b6b5f/1

     Where the first request parameter is the game's id _5cf64bfca7695f365b0b6b5f_ and the second request parameter is the player's id

     Header - Content-Type: application/json

     Body

```json
{ "result": "3/" }
```

- Where the results for the first 9 frames may be entered in the pattern

```
/^[XxFf0-9-]{1}[Ff0-9-/]?$/
```

and the 10th frame takes the form

```
/^[XxFf0-9-]{1}[XxFf0-9-/]?[XxFf0-9-/]?$
```

- "Ff0"- => The ball has missed one or more of the standing pins or has ended up in the gutter
- "Xx" => A STRIKE
- "/" => the second ball in the frame has knocked down the reming pins - SPARE

- Server response

```json
{
  "_id": "5cf64bfca7695f365b0b6b5f",
  "players": {
    "id": 1,
    "name": "A. Player"
  },
  "results": {
    "id": 1,
    "results": ["3/"]
  }
}
```

###### Fetch a player's current score and frame by frame history - _./api/score/:gameId/:playerId_ (GET)

..\* URL: /api/score/5cf64bfca7695f365b0b6b5f/1

..\* Server response

```json
[{ "frameScore": 20, "runningTotal": 20, "status": "spare", "totalThrows": 2 }]
```

###### Fetch the results/scores for a given game - _./api/history/:gameId_ (GET)

     URL: /api/history/5cf64bfca7695f365b0b6b5f

    Server response
    The response is given in the format of the data structure as shown below

---

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

Where "id" equates to a player and "\_id" equates to a single game.

In the case of 2 players, each parent array - _players_ _results_ _scores_ and _ballValues_ will have 2 items. For example:

```json
"players": [
    {
      "id": 1,
      "name": "A. Player1"
    },
     {
      "id": 2,
      "name": "B. Player2"
    }
  ]
```

The _child arrays_ _results_ _scores_ and _ballValues_ per player will build as the game progresses as shown in the following forms

```json
"results":["3/","x","45","x","ff","7/","x","34","6/","2/x"]
"scores":[
    {"frameScore": 20,"runningTotal": 20,"status": "spare","totalThrows": 2},
    {"frameScore": 19,"runningTotal": 39,"status": "strike","totalThrows": 3},
    {"frameScore": 9,"runningTotal": 48,"status": "open","totalThrows": 5},
    {"frameScore": 10,"runningTotal": 58,"status": "strike","totalThrows": 6},
    {"frameScore": 0,"runningTotal": 58,"status": "open","totalThrows": 8},
    {"frameScore": 20,"runningTotal": 78,"status": "spare","totalThrows": 10},
    {"frameScore": 17,"runningTotal": 95,"status": "strike","totalThrows": 11},
    {"frameScore": 7,"runningTotal": 102,"status": "open","totalThrows": 13},
    {"frameScore": 12,"runningTotal": 114,"status": "spare","totalThrows": 15},
    {"frameScore": 20,"runningTotal": 134,"status": "tenthFrame","totalThrows": 18}
]
"ballValues": [3,7,10,4,5,10,0,0,7,3,10,3,4,6,4,2,8,10]
```
