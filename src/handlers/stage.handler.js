import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

export const movestagehander = (userId, payload) => {
  
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  currentStages.sort((a, b) => a.id - b.id); // 오름 차순형태로 정렬렬
  const currentStage = currentStages[currentStages.length - 1];

 
  if (currentStage.id !== payload.currentStage) {
    return { status: 'fail', message: 'Current stage mismatch' };
  }

  const serverTime = Date.now(); // 현재 날짜
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000; 


  if (elapsedTime < 100 || elapsedTime > 105) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }


  const { stages } = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetStage)) {
    return { status: 'fail', message: 'Target stage does not exist' };
  }

  setStage(userId, payload.targetStage, serverTime);
  return { status: 'success' };
};
