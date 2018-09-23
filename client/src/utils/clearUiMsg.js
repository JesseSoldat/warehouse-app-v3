const clearUiMsg = ({
  msg = null,
  serverMsg,
  shouldRemove = true,
  from = "componentUnMount"
}) => {
  if (msg === null) return;

  // component specifies that the msg should be removed
  if (shouldRemove) return serverMsg({ msg: null, from });
};

export default clearUiMsg;
