const randomMinMaxNum = (min, max) => {
  max = ++max;
  return Math.floor(Math.random() * (max - min)) + 1;
};

module.exports = randomMinMaxNum;
