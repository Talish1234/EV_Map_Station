const mongoose = require("mongoose");

const chargerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  location: {
    type: [Number],
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.length === 2;
      },
      message: "Location must be an array with [latitude, longitude]."
    }
  },
  poweroutput: {
    type: Number,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive",],
    default: "Active",
  },
  type: {
    type: String,
    enum: ["ac_level_1", "ac_level_2", "dc_ccs", "dc_GB/T"],
    default: "dc_ccs",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Charger = mongoose.model("Charger", chargerSchema);

module.exports = Charger;
