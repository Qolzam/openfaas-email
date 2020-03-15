import * as emitter from 'emitter-io';

// Environment Variables
const host = process.env.REACT_APP_BROKER_HOST || '127.0.0.1'
const port = process.env.REACT_APP_BROKER_PORT || 8080
const channel = process.env.REACT_APP_FRONTEND_CHANNEL;
const key = process.env.REACT_APP_FRONTEND_CHANNEL_KEY;

// Connect to the broker
const client = emitter.connect({ host, port });

// Broker events
client.on('error', (m) => {
  console.log(`Error: ${m}`);
});
client.on('connect', () => {
  console.log('Connected');
});
client.on('disconnect', () => {
  console.log('Disconnected');
});

/**
 * Subscribe to the broker channel
 * @param {(message) => void} onMessage Callback function to handle income message
 */
function subscribe(onMessage) {
  client.subscribe({
    key,
    channel,
  });
  client.on('message', (m) => {
    onMessage(m);
  });
}

/**
 * Unsubscribe
 */
function unsubscribe() {
  client.unsubscribe({
    key,
    channel,
  });
}


export default {
  subscribe,
  unsubscribe
};
