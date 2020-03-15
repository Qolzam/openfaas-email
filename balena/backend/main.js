import DroneService from "./src/services/droneService";
import Db from "./src/data/db";
import Broker from "./src/data/broker";

// Environment variables
const port = process.env.BROKER_PORT || 8080
const host = process.env.BROKER_HOST || '127.0.0.1'

const droneChannel = process.env.DRONE_CHANNEL || 'drone/'
const droneChannelKey = process.env.DRONE_CHANNEL_KEY
const frontendChannel = process.env.FRONTEND_CHANNEL || 'frontend/'
const frontendChannelKey = process.env.FRONTEND_CHANNEL_KEY


/**
 * Startup function
 */
function startup() {
    const db = new Db()
    const broker = new Broker(host,port)
    broker.connect()
    const droneService = new DroneService(db,broker,frontendChannelKey,frontendChannel,droneChannelKey,droneChannel)

    // Invoce drone position handler
    droneService.positionHandler()
}

startup()
