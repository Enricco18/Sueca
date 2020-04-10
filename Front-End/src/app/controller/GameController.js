import Game from "../classes/Game";

class GameController {
  constructor() {
    this.count = -1;
    this.games = [];
  }
  createGame(players) {
    this.count++;
    let cache = { game: new Game(this.count, players) };
    let { game } = cache;
    let { dealer, deck } = game;
    dealer.shuffle(deck.cards);
    this.games.push(cache);

    return { game: cache.game, gameId: this.count };
  }

  turn(id, player) {
    const resp = this.games[id].game.turn(player);
    return resp;
  }
}
export default new GameController();
