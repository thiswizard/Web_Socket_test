import { getGameAssets } from '../init/assets.js';
import { clearStage, getStage, setStage } from '../models/stage.model.js';

export const gamestart = (uuid, payload) => {
  const { stages } = getGameAssets();
  clearStage(uuid);
  setStage(uuid, stages.data[0].id, payload.timestamp);
  console.log('stage:', getStage(uuid)); 
  return { status: 'success' };
};




export const gameEnd = (uuid, payload) => {
  const { timestamp: gameEndTime, score } = payload;
  const stages = getStage(uuid);
  if (!stages.length) {
    return { status: 'fail', message: 'No Stage' };
  }

 
  let Score = 0;
  stages.forEach((stage, index) => {
    let stageEndTime;
    if (index === stages.length - 1) {
      stageEndTime = gameEndTime;
    } else {
      stageEndTime = stages[index + 1].timestamp;
    }
    const stageDuration = (stageEndTime - stage.timestamp) / 1000; 
    Score += stageDuration; 
  });
  
  if (Math.abs(score - Score) > 5) {
    return { status: 'fail', message: 'score is fail' };
  }

  return { status: 'success', message: 'Game end', score };
};
