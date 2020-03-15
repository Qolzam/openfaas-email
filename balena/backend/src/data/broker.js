
const emitter = require('emitter-io')


class Broker {
  constructor(host, port) {
    this.host = host
    this.port = port
    this.client = null
    
    this.connect = this.connect.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.publish = this.publish.bind(this)
  }

  /**
   * Connect to the broker
   */
  connect() {
    if (!this.host) {
      throw Error('To connect to boroker the host is required!')
    }
    if (!this.port) {
      throw Error('To connect to boroker the port is required!')
    }
    this.client = emitter.connect({ host: this.host, port: this.port })
    this.client.on('connect', () => {
      console.log('Connected')
    })

    this.client.on('disconnect', () => {
      console.log('Disconnected')
    })


    this.client.on('error', (m) => {
      console.log(`Error: ${m}`)
    })
  }

  /**
   *  Subscribe to the broker channel
   * @param {string} key Channel key
   * @param {string} channel Channel name
   * @param {(message) => void} onMessage Callback function receive message from the broker channel
   */
  subscribe(key, channel, onMessage) {
    console.log({key, channel})
    if (this.clinet === null) {
      throw Error('Client is not connected! please invoke "connect()" first.')
    }

    if (!key) {
      throw Error('To subscribe channel the key is required!')
    }

    if (!channel) {
      throw Error('To subscribe channel the channel is required!')
    }

    this.client.subscribe({
      key,
      channel,
    })

    this.client.on('message', (m) => {
      onMessage(m)
    })
  }

  /**
   *
   * @param {string} key Channel key
   * @param {string} channel Channel name
   * @param {object} message The data to publish
   */
  publish(key, channel, message) {
    if (this.clinet === null) {
      throw Error('Client is not connected! please invoke "connect()" first.')
    }

    if (!key) {
      throw Error('To publish channel the key is required!')
    }

    if (!channel) {
      throw Error('To publish channel the channel is required!')
    }

    this.client.publish({
      key,
      channel,
      message: JSON.stringify(message),
    })
  }
}

export default Broker
