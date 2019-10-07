import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import './App.css';
import { loadUser, noToken } from './redux/actions/authActions';
import PrivateRoute from './components/routing/PrivateRoute';
import Landing from './components/layout/Landing';
import Profile from './components/layout/Profile';
import Blog from './components/layout/Blog';
import About from './components/layout/About';
import Restauratoriai from './components/layout/Restauratoriai';
import Navbar from './components/layout/Navbar';
import Login from './components/layout/Login';
import Signup from './components/layout/Signup';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    } else {
      store.dispatch(noToken());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/restauratoriai' component={Restauratoriai} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <PrivateRoute exact path='/profile' component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
