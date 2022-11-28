import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './utils/style/main.css';
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import User from './pages/User.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import store from './utils/store'


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/user' component={User} />
        </Switch>
        <Footer />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
