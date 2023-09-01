import express from "express"
import mongoose from "mongoose"
import { Picture } from "./models/pictureSchema.js"
import multer from "multer"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err)
  })

// Middleware to parse JSON
app.use(express.json())
app.use(cors())

// Configure multer for handling formData
const storage = multer.memoryStorage() // Store uploaded files in memory as buffers
const upload = multer({ storage })

app.get("/", async (req, res) => {
  return {}
})

// Endpoint to upload a picture with a name using formData
app.post("/api/picture/upload", upload.single("file"), async (req, res) => {
  const name = req.body.name
  const picture = req.file

  if (!name || !picture) {
    return res.status(400).json({ error: "Name and picture are required." })
  }

  try {
    const newPicture = new Picture({ name, picture: picture.buffer })
    await newPicture.save()
    return res.json({ message: "Picture uploaded successfully." })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Server error." })
  }
})

const convertFullNameToLowerCase = function (fullName) {
  const lowerCasedParts = fullName.split(" ").map((part) => part.toLowerCase())
  return lowerCasedParts
}

const formatFullName = function (parts, reverse) {
  return reverse ? parts.slice().reverse().join(" ") : parts.join(" ")
}

const validateNameMatch = function (inputName, specialName, reversed = false) {
  if (!(inputName && specialName)) {
    return false
  }

  const inputNameParts = convertFullNameToLowerCase(inputName)
  const formattedInputName = formatFullName(inputNameParts, reversed)

  const specialNameParts = convertFullNameToLowerCase(specialName)
  const formattedSpecialName = formatFullName(specialNameParts)

  return formattedSpecialName === formattedInputName
}

// Endpoint to get user picture by name
app.get("/api/picture", async (req, res) => {
  const { name } = req.query

  if (!name) {
    return res.status(400).json({ error: "Name parameter missing." })
  }

  try {
    const user = await Picture.find({})
    const specialPerson = user[0]

    if (
      !(
        validateNameMatch(name, specialPerson.name) ||
        validateNameMatch(name, specialPerson.name, true)
      )
    ) {
      return res.status(404).json({ error: "User not found." }) // Ne vraca sliku
    }

    const picture = specialPerson.picture.toString("base64")
    res.status(200).send({ picture })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Server error." })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
