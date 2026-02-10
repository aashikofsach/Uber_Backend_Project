const redis = require("redis");
// const dotenv = require('dotenv');

// dotenv.config();

const redisClient = new redis.createClient({
    url : process.env.REDIS_URI
});

redisClient.on("connect", ()=>
{
    console.log("connected to redis");
}) ;
redisClient.on("error",(error)=>{
    console.log("Connection to redis failed", error);
})

redisClient.connect();

module.exports = {redisClient} ;