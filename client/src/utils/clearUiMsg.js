const clearUiMsg = ({
  msg = null,
  sendServerMsg,
  shouldRemove = true,
  from = "componentUnMount"
}) => {
  if (msg === null) return;

  // component specifies that the msg should be removed
  if (shouldRemove) return sendServerMsg({ msg: null, from });
};

export default clearUiMsg;
