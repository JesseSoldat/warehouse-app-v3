// create obj to use in the Message Component
const generateMsgObj = (heading, details, color, code) => ({
  heading,
  details,
  color,
  code
});

// gets a msg obj with info and color property
const buildClientMsg = ({ info = null, color = null, code = null }) => {
  switch (color) {
    case "green":
      return generateMsgObj("Success Info", info, "success", code);

    case "blue":
      return generateMsgObj("Server Info", info, "info", code);

    case "yellow":
      return generateMsgObj("Server Warning", info, "warning", code);

    case "red":
      return generateMsgObj("Server Error", info, "danger", code);

    default:
      return generateMsgObj("Unknown Error", info, "danger", code);
  }
};

export default buildClientMsg;
