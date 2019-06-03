#10 pin bowling API

## Provides 4 API end points:

### Start a new game - ./api/new (POST)

### Record a player's frame result - ./api/result/:gameId/:playerId (PATCH)

### Fetch a player's current score and frame by frame history - ./api/result/:gameId/:playerId (GET)

### Fetch the results/scores for a given game - ./api/history/:gameId (GET)
