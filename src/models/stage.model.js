const stages = {}; 
// { abc123: [] }
export const createStage = (uuid) => {
  stages[uuid] = []; 
};

export const getStage = (uuid) => {
  return stages[uuid];
};
// { abc123: [ { id: 1, stamp: '2024-12-19T10:00:00Z' } ] }
export const setStage = (uuid, id, stamp) => {
  return stages[uuid].push({ id, stamp });
};

export const clearStage = (uuid) => {
  return (stages[uuid] = []);
};
