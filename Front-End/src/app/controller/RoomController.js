import GameController from "./GameController";
import Room from "../classes/Room";

class RoomController {
  constructor() {
    this.count = -1;
    this.rooms = [];
  }
  createRoom(owner) {
    let { game, gameId } = GameController.createGame(owner);
    this.count++;
    this.rooms.push(new Room(this.count, game, owner));
    return { gameId, roomId: this.count };
  }
}
export default new RoomController();
