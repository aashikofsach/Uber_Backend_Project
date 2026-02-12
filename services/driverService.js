// Point to be noted : we have our driver location saved in db, but its more efficient to store them in redis db to fetch the locations
// more fatser

const driverRepository = require("../repository/driverRepository");
const locationService = require("../services/locationService");

const updateLocation = async (driverId, { latitude, longitude }) => {
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  if (isNaN(latitude) || isNaN(longitude))
    throw new Error("Invalid Coordinates");

  await locationService.addDriverLocation(driverId, latitude, longitude);

  // below we are passing type as point , probably its not necessary to send right ?
  await driverRepository.updateDriverLocation(driverId , {
    type : "Point",
    coordinates :[longitude , latitude ]
  })
};

module.exports = { updateLocation };
