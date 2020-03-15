
import droneHelper from '../helpers/droneHelper'

// Drone collection name
const droneCollection = 'drones'


class DroneService {

  /**
   * Drone service constructor
   * @param {Db} db Database instance 
   * @param {Broker} broker Broker instance
   * @param {string} frontendChannelKey Frontend broker channel key
   * @param {string} frontendChannel Frontend broker channel name
   * @param {string} droneChannelKey Drone broker channel key
   * @param {string} droneChannel Drone broker channel name
   */
  constructor(db, broker, frontendChannelKey, frontendChannel, droneChannelKey, droneChannel) {
    this.db = db
    this.broker = broker
    this.frontendChannelKey = frontendChannelKey
    this.frontendChannel = frontendChannel
    this.droneChannelKey = droneChannelKey
    this.droneChannel = droneChannel

    this.onDroneMessage = this.onDroneMessage.bind(this)
    this.positionHandler = this.positionHandler.bind(this)
  }
  
  /**
   * Handle drone incoming message
   * @param {object} message Income data
   */
  onDroneMessage(message) {
    let drone = message.asObject()

    const drones = this.db.getAll(droneCollection)
    const droneState = drones[drone.id]

    drone.tags = (droneState && droneState.tags) ? droneState.tags : []
   
    drone = droneHelper.checkDroneStatus(droneState,drone)
   
    
    this.db.save(droneCollection, drone)
    this.broker.publish(this.frontendChannelKey, this.frontendChannel, drone)
    console.log('drone, ', drone)
  }

  /**
   * Position handler
   */
  positionHandler() {
    this.broker.subscribe(this.droneChannelKey, this.droneChannel, this.onDroneMessage)
  }
}

export default DroneService
