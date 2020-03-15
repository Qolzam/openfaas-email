
  /**
   * Whether drone has stop tag or not
   * 
   * @param {object} drone State of drones
   */
  const isDroneStop = (drone) => ( drone && drone.tags && drone.tags.indexOf('Stop') > -1);

  /**
   * Check if drone is stopped
   * We assume drone send data each second
   * @param {object} droneState Drone state from Database
   * @param {object} drone New message from drone 
   */
  const checkDroneStatus = (droneState, drone) => {
    const droneStopped = isDroneStop(droneState)
      if (drone.s === 0 && !droneStopped) {
        drone.stopTime = (droneState && droneState.stopTime > -1) ? droneState.stopTime + 1 : 0
        if (drone.stopTime > 10) {
          drone.tags.push('Stop')
        }
      } else if (drone.s > 0 && droneStopped) {
        drone.tags = []
      }
    return drone
  }

  export default {checkDroneStatus}