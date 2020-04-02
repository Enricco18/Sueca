import Player from "../classes/Player";

class PlayerController {
  constructor() {
    this.players = [];
  }

  connect(name, socket) {
    const player = new Player(name, socket);
    this.players.push(player);
    return player;
  }
  disconnect(id) {
    this.players = this.players.filter(x => {
      return x.socket.id != id;
    });
  }

  getPlayer(id) {
    let resp = this.players.filter(x => {
      x.socket.id == id;
    });

    return resp;
  }
}

export default new PlayerController();
