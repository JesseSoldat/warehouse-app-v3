const errMsg = (method, target) => {
  return `An error occured while trying to ${method} the ${target}.`;
};

// info: The message to be displayed
// color: color of the messag
// type: An Error code used for when you passed a callback into the Message component
// but you do not want to show the btn for that callback because you performed another
// type of request
const msgObj = (info, color, code = null) => ({
  info,
  color,
  code
});

// options or code not sure which one is best
// gives the server away to communicate some instructions to the client
// based on the clients request
// unlike the msg which is only used in the message component
// the options can be used in any component
const serverRes = (res, status, msg = null, payload = null, options = null) => {
  res.status(status).send({ msg, payload, options });
};

module.exports = { serverRes, errMsg, msgObj };
