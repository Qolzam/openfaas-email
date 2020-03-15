import * as React from 'react';

import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
// import OlLayerVector from 'ol/layer/Vector';
import OlSourceOSM from 'ol/source/OSM';
import OlSourceVector from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import OlStyle from 'ol/style/Style';
import OlStyleFill from 'ol/style/Fill';
import OlStyleIcon from 'ol/style/Icon';
import OlStyleText from 'ol/style/Text';
import OlStyleStroke from 'ol/style/Stroke';
import mapMarker from '../../assets/drone_location.png';
import broker from '../../services/broker';
import TableComponent from './table';

const OlLayerVector = require('ol/layer/Vector').default;

const osmLayer = new OlLayerTile({
  source: new OlSourceOSM(),
});

function getFeatureStyle() {
  return new OlStyle({
    image: new OlStyleIcon(({
      src: mapMarker,
      color: 'red',
    })),
    text: new OlStyleText({
      text: '',
      fill: new OlStyleFill({
        color: 'rgb(0, 0, 0)',
      }),
      stroke: new OlStyleStroke({
        color: 'rgb(255, 255, 255)',
        width: 2,
      }),
    }),
  });
}


export default class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.points = {};
    this.mapDivId = `map-${Math.random()}`;
    this.cerateNewFeatureLayer = this.cerateNewFeatureLayer.bind(this);
    this.map = new OlMap({
      view: new OlView({
        center: [
          52.8261,
          36.4484,
        ],
        projection: 'EPSG:4326',
        zoom: 13,
      }),
      layers: [
        osmLayer,
      ],
      interactions: [],
    });
  }

  componentDidMount() {
    this.map.setTarget(this.mapDivId);
    broker.subscribe((message) => {
      const drone = message.asObject();

      this.setState({
        [drone.id]: { ...drone },
      }, () => {
        if (this.points[drone.id]) {
          this.points[drone.id].setCoordinates([drone.lg, drone.lt]);
        } else {
          this.cerateNewFeatureLayer(drone);
        }
      });
    });
  }

  componentWillUnmount() {
    broker.unsubscribe();
  }

  cerateNewFeatureLayer(drone) {
    this.points[drone.id] = new OlGeomPoint([
      drone.lg,
      drone.lt,
    ]);
    const feature = new OlFeature({
      geometry: this.points[drone.id],
    });

    const layer = new OlLayerVector({
      source: new OlSourceVector({
        features: [feature],
      }),
      style: getFeatureStyle(),
    });
    this.map.addLayer(layer);
  }


  render() {
    const dataTable = [];
    const drons = { ...this.state };
    Object.keys(drons).forEach((key) => {
      const drone = drons[key];
      drone.key = key;
      dataTable.push(drone);
    });
    return (
      <div style={{ height: '100%' }}>
        <dir style={{ padding: 20 }}>
          <TableComponent data={dataTable} />
        </dir>
        <div
          id={this.mapDivId}
          style={{
            height: '100%',
          }}
        />

      </div>
    );
  }
}
