import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link } from "react-router-dom";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faUser, faComment, faSpinner } from '@fortawesome/fontawesome-free-solid'
library.add(faGlobe, faUser, faComment, faSpinner)


const rootEl = document.getElementById('root')

ReactDOM.render(
     <BrowserRouter>
          <App />
     </BrowserRouter>
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