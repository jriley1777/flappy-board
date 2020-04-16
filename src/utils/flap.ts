export const NUM_COLS = 23;
export const NUM_ROWS = 9
export const ARRAY_LENGTH = NUM_COLS * NUM_ROWS;

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

export const buildMessageLetterArray = (text: string) => {
  let array = text.toUpperCase().split("");
  let i = array.length;
  let cen = Math.floor(ARRAY_LENGTH / 2) - Math.floor(i / 2);
  return [
    ...new Array(cen).fill(" "),
    ...array,
    ...new Array(ARRAY_LENGTH - (cen + array.length)).fill(" "),
  ];
};

export const changeMessage = (category?: number) => {
  let pick = category || Math.floor(Math.random() * 4);
  switch (pick) {
    case 0:
      return buildMessageLetterArray("This is a splitboard!");
    case 1:
      return buildMessageLetterArray("Have a nice day!");
    case 2:
      return buildMessageLetterArray("Hello :)");
    case 3:
      return buildMessageLetterArray("flapboard");
  }
};