const drone = { asObject: () => ({id: "621e8b98-5732-45af-949e-a11eb9663f23", lt: 36.44455640945829, lg: 52.84810935118595, s: 0, tags: []}) }

export const connect = jest.fn();
export const subscribe = (key, channel, onMessage) => {onMessage(drone) }
export const publish = jest.fn();
const brokerMock = jest.fn().mockImplementation(() => {
  return {connect, publish, subscribe};
});

export default brokerMock;