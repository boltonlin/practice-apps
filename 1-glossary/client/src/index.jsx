import React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App.jsx";
const soliciter = require('./soliciter.js');

ReactDOM.render(<App soliciter={soliciter} />, document.getElementById('root'));