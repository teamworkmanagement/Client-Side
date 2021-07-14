// eslint-disable-next-line
const avaBgColors = [
  "1CCE67",
  "01DCE9",
  "FF6263",
  "FFCC12",
  "EA90EE",
  "FF8E50",
  "63B4FF",
  "9F63FF",
];
// eslint-disable-next-line
const avaColor = "3C4B64";
export const getAvaImageLink = (username) => {
  const max = 7;
  const min = 0;
  // eslint-disable-next-line
  const colorIndex = Math.floor(Math.random() * (max - min + 1) + min);
  return `https://ui-avatars.com/api/?background=${"FBEAEA"}&color=${"FF5454"}&name=${username}`;
};
