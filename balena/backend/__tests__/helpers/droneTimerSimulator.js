import droneHelper from 'helpers/droneHelper'
function checkWithInterval(droneState, drone) {
 
setInterval(() => {
 droneState = droneHelper.checkDroneStatus(droneState, drone)
  }, 1000);
}

export default { checkWithInterval };