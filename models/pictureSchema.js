import mongoose from "mongoose"

const pictureSchema = new mongoose.Schema({
  name: String,
  picture: Buffer,
})

export const Picture = mongoose.model("Picture", pictureSchema)
