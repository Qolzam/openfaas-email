import helperTimer from './droneTimerSimulator'

describe('Drone helper funuctions.', () => {
  jest.useFakeTimers();
  let drone = {}
  let droneState = {}
  beforeEach(() => {

    drone = { id: "621e8b98-5732-45af-949e-a11eb9663f23", lt: 36.44455640945829, lg: 52.84810935118595, s: 0, tags: [] }
    droneState = { id: "621e8b98-5732-45af-949e-a11eb9663f23", lt: 36.44455640945829, lg: 52.84810935118595, s: 0, tags: [] }
  })


  it('Stop time after 10 seconds must be 11.', () => {
    helperTimer.checkWithInterval(droneState, drone)
    jest.advanceTimersByTime(15000);
    expect(drone.stopTime).toEqual(11);
  });

  it('After 10 seconds drone must have stop status.', () => {
    helperTimer.checkWithInterval(droneState, drone)
    jest.advanceTimersByTime(15000);
    expect(drone.tags).toContain('Stop');
  });
})