import { render } from "react-dom";
import App from './components/App.jsx';
const soliciter = require('./soliciter');

render(<App soliciter={soliciter} />, document.getElementById("root"));

// for reference
// <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>