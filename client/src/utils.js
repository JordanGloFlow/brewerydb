export function pickRandomBeer(list) {
  const dataLength = list.length;
  const randomNum = Math.floor(Math.random() * dataLength) + 0;
  return list[randomNum];
}
