import axios from "axios";

const setAxiosHeader = token =>
  token
    ? (axios.defaults.headers.common["x-auth"] = token)
    : delete axios.defaults.headers.common["x-auth"];

export default setAxiosHeader;
