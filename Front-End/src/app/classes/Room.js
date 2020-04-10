class Room {
  constructor(id, game, owner) {
    this.id = id;
    this.game = game;
    this.owner = owner;
    this.isClosed = false;
  }

  addPlayer(player) {
    this.game.players.push(player);
  }
}

export default Room;
