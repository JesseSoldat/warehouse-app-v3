// https://davidwalsh.name/query-string-javascript
// getUrlParameter('post'); // "1234"
// getUrlParameter('action'); // "edit"

const getUrlParameter = name => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export default getUrlParameter;
