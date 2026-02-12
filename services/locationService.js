const redisClient = require("../utils/redisClient");

class LocationService {
  async setDriverSocket(driverId, socketId) {
    await redisClient.set(`driver:${driverId}`, socketId);
  }

  async getDriverSocket(driverId) {
    return await redisClient.get(`driver:${driverId}`);
  }

  async delDriverSocket(driverId) {
    return await redisClient.del(`driver:${driverId}`);
  }

  async addDriverLocation(driverId, latitude, longitude) {
    try {
      await redisClient.sendCommand([
        "GEOADDS",
        "drivers",
        latitude.toString(),
        longitude.toString(),
        driverId.toString(),
      ]);
    } catch (error) {}
  }
  async findNearByDrivers(latitude, longitude, radiusKM) {
    const nearByDrivers = await redisClient.sendCommand([
      "GEORADIUS",
      "drivers",
      latitude.toString(),
      longitude.toString(),
      radiusKM.toString(),
      "km",
      "WITHCOORD",
    ]);

    return nearByDrivers;
  }

  async storeNotifiedDrivers(bookingId, driversIds) {
    for (const driverId of driversIds)
      await redisClient.sadd(`notifiedDriversFor : ${bookingId}`, driverId);
  }

  async getNotifiedDrivers(bookingId) {
    return await redisClient.smembers(`notifiedDriversFor : ${bookingId}`);
  }
}

module.exports = new LocationService();
