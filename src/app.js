import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';

const app = express();
const server = createServer(app);
const PORT = 3019;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
initSocket(server);

server.listen(PORT, async () => {
  console.log(`${PORT} server is running`);

  try {
    const gameassets = await loadGameAssets();
    console.log(gameassets);
    console.log('success load game assets');
  } catch (error) {
    console.error('fail load game assets', error);
  }
});
