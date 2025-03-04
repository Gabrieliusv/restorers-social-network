import React, { useEffect } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import "./App.css";
import { loadUser, noToken } from "./redux/actions/authActions";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoute";
import Landing from "./components/layout/Landing";
import Profile from "./components/layout/profile/Profile";
import Blog from "./components/layout/blog/Blog";
import About from "./components/layout/About";
import Restauratoriai from "./components/layout/restauratoriai/Restauratoriai";
import Restauratorius from "./components/layout/restauratoriai/Restauratorius";
import Navbar from "./components/layout/Navbar";
import Login from "./components/layout/Login";
import Signup from "./components/layout/Signup";
import UserNavbar from "./components/layout/UserNavbar";
import CreateProfile from "./components/layout/profile/CreateProfile";
import EditProfile from "./components/layout/profile/EditProfile";
import CreateBlogPost from "./components/layout/blog/CreateBlogPost";
import NewMembers from "./components/layout/adminPanel/NewMembers";
import SubmittedBlogPosts from "./components/layout/adminPanel/SubmittedBlogPosts";
import BlogPost from "./components/layout/blog/BlogPost";

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
        <Route exact path='/restauratoriai/:id' component={Restauratorius} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/blog/:id' component={BlogPost} />
        <Route exact path='/about' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/profile/create' component={CreateProfile} />
        <PrivateRoute exact path='/profile/edit' component={EditProfile} />
        <PrivateRoute exact path='/newBlogPost' component={CreateBlogPost} />
        <AdminRoute exact path='/newMembers' component={NewMembers} />
        <AdminRoute
          exact
          path='/SubmittedBlogPosts'
          component={SubmittedBlogPosts}
        />
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
