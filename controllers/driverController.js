
const driverService = require("../services/driverService")

const getDriverBookings = async () => {};

const updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  await driverService.updateLocation(req.user._id, { latitude, longitude });
};

module.exports = { getDriverBookings, updateLocation };
