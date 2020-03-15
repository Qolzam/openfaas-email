import React from 'react';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
import './styles/react-geo.css';

import jss from 'jss';
import preset from 'jss-preset-default';
import HomeComponent from './containers/home';

jss.setup(preset());
function App() {
  return (
    <HomeComponent />
  );
}

export default App;
