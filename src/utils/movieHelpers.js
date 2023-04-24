export const capitalize = (word) => {
  const firstChar = word.charAt(0);
  const restChar = word.slice(1);
  return `${firstChar.toUpperCase()}${restChar}`;
};

export const capitalizeObject = (obj) => {
  const modifyObject = {};
  Object.entries(obj).forEach(([key, value]) => {
    const [firstWord, ...restWords] = String(key).split("_");
    const newKey = `${firstWord}${restWords
      .map((word) => capitalize(word))
      .join("")}`;
    modifyObject[newKey] = value;
  });
  return modifyObject;
};

export const movieAdapter = (rawMovies = []) =>
  rawMovies.map((movie) => capitalizeObject(movie));

export const makeQueryFromFilter = (filter) => {

}
