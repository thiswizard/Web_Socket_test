import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
let gameAssets = {}; 

const fileURL = fileURLToPath(import.meta.url);
const directory_name = path.dirname(fileURL);
const basePath = path.join(directory_name, '../../assets');

const readassetsAsync = async (filename) => {
  try{
    let result = await fs.promises.readFile(path.join(basePath,filename), 'utf8')
    return JSON.parse(result) // JSON -> 자바스크립트 객체
}
  catch(error){
    console.error("readassetsAsync error",error)}
}

export const loadGameAssets = async () => {
  try {
    const [stages, items, itemUnlocks] = await Promise.all([
      readassetsAsync('stage.json'),
      readassetsAsync('item.json'),
      readassetsAsync('item_unlock.json'),
    ]);
    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch (error) {
    console.error('fail load game assets: ' , error);
  }
};

export const getGameAssets = () => {
  return gameAssets;
};
