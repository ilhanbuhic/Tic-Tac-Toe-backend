import axios from "axios"

export const redeploy = function () {
  setInterval(() => {
    axios
      .get("https://tic-tac-toe-backend-ouxc.onrender.com")
      .then(() => console.log("req"))
  }, 15000)
}
