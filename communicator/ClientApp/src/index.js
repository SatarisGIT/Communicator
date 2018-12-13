import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const rootEl = document.getElementById('root')

ReactDOM.render(
     <Router>
          <App />
     </Router>
     ,
     rootEl
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



// add these lines
if (module.hot && process.env.NODE_ENV !== 'production') {

     console.warn("HOT!")
     module.hot.accept();
}