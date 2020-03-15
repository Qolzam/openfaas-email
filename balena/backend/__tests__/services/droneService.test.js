import Broker from 'data/broker'
import DroneService from '../../src/services/droneService'
import Db from '../../src/data/db'


describe('The Database instance', () => {
  
  jest.mock('data/broker')
  const droneChannel ='drone/'
  const droneChannelKey = 'sjdnksdjnlksn09joiqwdnoi'
  const frontendChannel = 'frontend/'
  const frontendChannelKey = 'aknda98dyas87dgs76sd7ias'

  const db = new Db()
  const broker = new Broker()
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods:
      Broker.mockClear();
    });
  it('Should not throw error in handling drone position', () => {
    const droneService = new DroneService(db, broker,frontendChannelKey, frontendChannel,droneChannelKey,droneChannel)
    expect(() => droneService.positionHandler())
    .not
    .toThrow();
  });

})