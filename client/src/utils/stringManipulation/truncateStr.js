const truncateStr = (text = "", limit = 15) =>
  text.length > limit ? text.slice(0, limit) + " ..." : text;

export default truncateStr;
