import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  time: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  ingerdients:[
    {
      ingredient: String,
      amount: Number,
      unit: String 
    }
  ]
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;