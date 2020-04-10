import app from "./app";
import http from "http";
import io from "socket.io";

import GameController from "./app/controller/GameController";
import RoomController from "./app/controller/RoomController";
import PlayerController from "./app/controller/PlayerController";

class Socket {
  constructor() {
    this.http = http.Server(app);
    this.io = io(this.http);
    this.setEvents(this.connections);
  }

  setEvents() {
    const io = this.io;
    io.on("connection", function(socket) {
      const { id } = socket;
      let player = null;
      let gameId = null;
      let roomId = null;
      socket.on("createPlayer", ({ name }) => {
        player = PlayerController.connect(name, socket);
        socket.emit("createdPlayer", player.socket.id);
      });
      //Room
      socket.on("createRoom", () => {
        let ids = RoomController.createRoom(player);
        gameId = ids.gameId;
        roomId = ids.roomId;
        let resp = RoomController.rooms.map(x => {
          return { roomId: x.id, name: `Sala ${x.id}` };
        });
        console.log(resp);
        io.emit("updateRooms", resp);
      });

      socket.on("enterRoom", ({ room }) => {
        roomId = room;
        RoomController.rooms[roomId].addPlayer(player);
        gameId = RoomController.rooms[roomId].game.id;
        console.log({ roomId, gameId });
      });

      socket.on("getRooms", () => {
        console.log(`passou`);
        let resp = RoomController.rooms.map(x => {
          return { roomId: x.id, name: `Sala ${x.id}` };
        });
        io.emit("updateRooms", resp);
      });

      //Inicialização
      socket.on("createGame", () => {
        RoomController.rooms[roomId].isClosed = true;
      });

      //Rodada
      socket.on("turnGame", playerId => {
        let response = GameController.turn(gameId, player);
        io.emit("returnTable", { ...response });
      });

      //Disconect
      socket.on("disconnect", () => {
        PlayerController.disconnect(id);
      });

      console.log("connected");
    });
  }
}

export default new Socket().http;
