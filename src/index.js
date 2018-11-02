import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import ReduxToastr from "react-redux-toastr";

import "bootstrap/dist/css/bootstrap.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.css";
import reducers from "./reducers";
import { PostIndex, PostNew, PostDetails } from "./components";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, applyMiddleware(thunk, promise));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <ReduxToastr progressBar />
        <Switch>
          <Route path="/post/new" component={PostNew} />
          <Route path="/post/:id" component={PostDetails} />
          <Route path="/" component={PostIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
