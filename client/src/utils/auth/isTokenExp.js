import decodeToken from "./decodeToken";

const isTokenExp = token => {
  let isTokenExp = false;
  const decodedToken = decodeToken(token);
  const { expires } = decodedToken.payload;
  const now = new Date().getTime();

  // console.log("now", now);
  // console.log("expires", expires);

  if (expires < now) isTokenExp = true;

  return isTokenExp;
};

export default isTokenExp;
