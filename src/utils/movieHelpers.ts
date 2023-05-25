import { ObjectType } from "@/types/meta";

export const capitalize = (word: string) => {
  const firstChar = word.charAt(0);
  const restChar = word.slice(1);
  return `${firstChar.toUpperCase()}${restChar}`;
};

export const capitalizeObject = (obj: any) => {
  const modifyObject: ObjectType = {};
  Object.entries(obj).forEach(([key, value]) => {
    const [firstWord, ...restWords] = String(key).split('_');
    const newKey = `${firstWord}${restWords.map((word) => capitalize(word)).join('')}`;
    modifyObject[newKey] = value;
  });
  return modifyObject;
};

export const movieAdapter = (rawMovies: Array<any> = []) => rawMovies.map((movie) => capitalizeObject(movie));

export const camelizeObject = (obj: any) => {
  const modifyObject: ObjectType = {};
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = key.replace(/[A-Z]/, (letter) => `_${letter.toLowerCase()}`);
    modifyObject[newKey] = value;
  });
  return modifyObject;
};