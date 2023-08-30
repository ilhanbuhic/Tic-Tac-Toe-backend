import axios from "axios"

export const redeploy = function () {
  setInterval(() => {
    axios
      .get("http://localhost:10000/")
      .then(() => console.log("req"))
      .catch((r) => {
        console.log("not on render.com")
      })
  }, 15000)
}
