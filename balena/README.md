# Telar Drones Fun
A simple experimental drone IoT full-stack project for fun ;)

### Get started with Telar drones
1. Run below command
``` sh
docker-compose up
```
2. Open http://localhost:3030/ to see drone data.
3. Open http://localhost:3030/drone to add drones.


### Test
From project root directory.
* Backend
```sh
cd backend 
npm test
```
or
```sh
cd backend 
yarn test
```

### Components
- **Backend** Handle analyzing, manipulating, saving data from drone. (Node.js-based)
- **Fontend** Displaying drone information such id, location and status using [React](https://reactjs.org/).
- **Load balancer (nginx)** Routing user http request using [nginx](https://www.nginx.com/).
- **Simulator** Simulate drones data using [express](https://expressjs.com/) to serve html file and [geodesy](https://github.com/chrisveness/geodesy) geo library that helps for calculation (distance,bearing, latitude/longitude).
- **Broker** MQTT broker for handling messages using [emitter.io](https://emitter.io/).

### Conceptual Diagram
                        |Frontend|  <=>   |Websocket| 
                            /\                 |
    |User|  => |Load Balancer (nginx)|         |
                            \/                 |
                   |Simulator/Drone| => |Broker (MQTT)| <=> |Backend|

### TODO
- [ ] Add database

### DirectoryStructure 
    root-directory
    ├── backend
    │   ├── src
    │   │    ├── data
    │   │    ├── helpers
    │   │    └── services
    ├── frontend
    │   ├── src
    │   │    ├── assets
    │   │    ├── components
    │   │    │      └── map
    │   │    └── containers
    │   │    │      └── home
    │   │    ├── services
    │   │    └── styles
    ├── nginx
    └── simulator

### Configurations

| Environment Variable  | Description                                          |  Default      |
| --------------------- | ---------------------------------------------------- | ------------- |
| FRONTEND_CHANNEL_KEY  | The key of message broker channel for frontend.      |      -        |
| FRONTEND_CHANNEL      | The name of message broker channel for frontend.     |   frontend/   |
| DRONE_CHANNEL_KEY     | The key of message broker channel for drone.         |      -        |
| DRONE_CHANNEL         | The name of message broker channel for drone.        |    drone/     |
| BROKER_HOST           | Message broker host address.                         |  127.0.0.1    |
| BROKER_PORT           | Message broker port.                                 |    8080       |

### Author
Amirhossein Movahedi (@qolzam)

### Reference
[Packet's IoT](https://github.com/packet-labs/iot)
