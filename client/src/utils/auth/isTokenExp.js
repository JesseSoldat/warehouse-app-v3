import decodeToken from "./decodeToken";

const isTokenExp = token => {
  let tokenIsExpired = false;
  const decodedToken = decodeToken(token);
  const { expires, role } = decodedToken.payload;
  const now = new Date().getTime();

  // console.log("now", now);
  // console.log("expires", expires);

  if (expires < now) tokenIsExpired = true;

  return { role, tokenIsExpired };
};

export default isTokenExp;
