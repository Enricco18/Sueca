class Player {
  constructor(name, socket) {
    this.name = name;
    this.rooms = [];
    this.socket = socket;
  }
}

export default Player;
