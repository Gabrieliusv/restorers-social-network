import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
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
import UserNavbar from './components/layout/UserNavbar';
import CreateProfile from './components/layout/CreateProfile';
import EditProfile from './components/layout/EditProfile';

let App = ({ isAuthenticated }) => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    } else {
      store.dispatch(noToken());
    }
  }, []);

  return (
    <Router>
      {!isAuthenticated ? <Navbar /> : <UserNavbar />}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/restauratoriai' component={Restauratoriai} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/profile/create' component={CreateProfile} />
        <PrivateRoute exact path='/profile/edit' component={EditProfile} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

App = connect(mapStateToProps)(App);

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
