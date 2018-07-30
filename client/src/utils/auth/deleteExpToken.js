import axios from "axios";

const deleteExpToken = async token => {
  try {
    await axios.post("/api/token", { token });
  } catch (err) {
    console.log("deleteExpToken err", err);
  }
};

export default deleteExpToken;
