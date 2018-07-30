// milliSecond from now
const milliFromNow = milli => {
  // returns a timestamp
  return new Date().getTime() + milli;
};

// days from now
const daysFromNow = (now, days) => {
  // returns a timestamp
  return (expires = new Date().setDate(now.getDate() + days));
};

module.exports = { milliFromNow, daysFromNow };
