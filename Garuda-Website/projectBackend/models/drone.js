const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema({
  status: {
    type: string,
    default: "free",
    required: true,
    enum: ["enrouted", "free"],
  },
});

module.exports=mongoose.model("Drone",droneSchema);
