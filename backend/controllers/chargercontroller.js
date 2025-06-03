const axios = require("axios");
const catchAsync = require("../utils/catchAsync");

const Charger = require("../model/chargerModel");

const getAllChargers = catchAsync(async (req, res) => {
  const chargers = await Charger.find();
  res.status(200).json({
    message: "Chargers retrieved successfully",
    chargers,
  });
});

const addCharger = catchAsync(async (req, res) => {
  const { name, latitude, longitude, type, poweroutput, status } = req.body;
  if (!name || !latitude || !longitude || !type || !poweroutput) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  const { data } = await axios.get(url);

  const locationName = data.display_name || "----";
  const stateName = data.address.state || "----";
  const newCharger = await Charger.create({
    name,
    location: [latitude, longitude],
    poweroutput,
    type,
    status: status || "Active",
    locationName,
    stateName,
  });
  res.status(201).json({
    message: "Charger added successfully",
    station: newCharger,
  });
});

const updateCharger = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, type, poweroutput, status } = req.body;
  if (!name || !latitude || !longitude || !type || !poweroutput) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  const { data } = await axios.get(url);

  const locationName = data.display_name || "----";
  const stateName = data.address.state || "----";
  const updateStation = await Charger.findByIdAndUpdate(
    id,
    {
      name,
      location: [latitude, longitude],
      poweroutput,
      type,
      status: status || "Active",
      locationName,
      stateName,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    message: "Station Updated successfully",
    data: {
      charger: updateStation,
    },
  });
});

const deleteCharger = catchAsync(async (req, res) => {
  const { id } = req.params;
  const charger = await Charger.findByIdAndDelete(id);
  if (!charger) {
    return res.status(404).json({
      status: "fail",
      message: "Charger not found",
    });
  }
  res.status(204).json({
    status: "success",
    message: "Charger deleted successfully",
  });
});

module.exports = {
  addCharger,
  getAllChargers,
  updateCharger,
  deleteCharger
};
