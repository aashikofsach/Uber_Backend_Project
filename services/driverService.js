// Point to be noted : we have our driver location saved in db, but its more efficient to store them in redis db to fetch the locations
// more fatser

const driverRepository = require("../repository/driverRepository");
const locationService = require("../services/locationService");

const updateLocation = async (driverId, { latitude, longitude }) => {
  const latitude = parseFloat(latitude);
  const longitude = parseFloat(longitude);

  if (isNaN(latitude) || isNaN(longitude))
    throw new Error("Invalid Coordinates");

  await locationService.addDriverLocation(driverId, latitude, longitude);

  // below we are passing type as point , probably its not necessary to send right ?
  await driverRepository.updateDriverLocation(driverId , {
    type : "Point",
    coordinates :[latitude , longitude ]
  })
};

module.exports = { updateLocation };
