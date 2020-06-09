import { Router } from 'express';
import { uuid } from 'uuidv4';
import db from '../db_volatile';

const router = new Router();

router.get('/', (req, res) => {
  return res.send('hello World');
});

router.get('/players', (req, res) => {
  return res.status(200).json(db.players);
});

router.post('/players', (req, res) => {
  const { name, socketID } = req.body;
  const player = { name, socketID };

  db.players.push(player);
  return res.status(200).json(player);
});

router.put('/players/:socketID', (req, res) => {
  const { socketID } = req.params;
  const { newName } = req.body;
  const index = db.players.findIndex((item) => item.socketID === socketID);
  if (index < 0) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  db.players[index].name = newName;

  return res.status(200).json(db.players[index]);
});

router.delete('/players/:socketID', (req, res) => {
  const { socketID } = req.params;
  const index = db.players.findIndex((item) => item.socketID === socketID);
  if (index < 0) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  db.players.splice(index, 1);

  return res.status(200).json({ message: 'ok' });
});

router.get('/rooms', (req, res) => {
  return res.status(200).json(db.rooms);
});

router.post('/rooms', (req, res) => {
  const { roomName, socketID } = req.body;

  const index = db.players.findIndex((item) => item.socketID === socketID);
  if (index < 0) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  const player = db.players[index];

  const room = {
    id: uuid(),
    roomName,
    creator: player,
    moderator: player,
    players: [player],
  };

  db.rooms.push(room);
  return res.status(200).json(room);
});

// router.put('/players/:socketID', (req, res) => {});

// router.delete('/players/:socketID', (req, res) => {});
export default router;
