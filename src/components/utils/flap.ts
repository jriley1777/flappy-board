export const charArray = `abcdefghijklmnopqrstuvwxyz0123456789 ,./<>?;:'"[]\`~!@#$%^&*()-=_+\\|`
  .toUpperCase()
  .split("");
const buildCharMap = () => {
    let charMap: any = {};
    charArray.forEach((char,index) => charMap[char] = index);
    return charMap;
};
const charMap = buildCharMap();

export const flipTo = (src: string[], destination: string[]) => {
  let start = src.map(x => x.toUpperCase());
  let end = destination.map(x => x.toUpperCase());
  if (start === end) {
    return end;
  }
  if (start.length !== end.length) {
      return start;
  }
  start.forEach((x, i) => {
    if(x !== end[i]) {
        start[i] = getNextLetter(x);
    }
  });
  return start;
};

export const getNextLetter = (letter: string) => {
  return charMap[letter] === 0
    ? charArray[charArray.length - 1]
    : charArray[charMap[letter] - 1]; 
}