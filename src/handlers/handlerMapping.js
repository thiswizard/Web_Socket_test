import { movestagehander } from './stage.handler.js';
import { gameEnd, gamestart } from './game.handler.js';

const Mappinghandler = {
  2: gamestart,
  3: gameEnd,
  11: movestagehander,
};

export default Mappinghandler;
