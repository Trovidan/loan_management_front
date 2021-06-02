import './App.css'; 
import React from 'react'
import app_status from './contexts/app_status';
import {Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import login from './adapters/login';
import verify_token from './adapters/verify_token';
import {app_routes} from './utils/routes';  
import cookie from './utils/cookie';
import loading from './utils/loading';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      power: 3,
      user_details: {},
      verified: false,
      active_tab: "/resource_management/resources",
    };
    this.renderRoutes = this.renderRoutes.bind(this);
    this.login_user = this.login_user.bind(this);
    this.verify_user = this.verify_user.bind(this);
    this.reset_app = this.reset_app.bind(this);
    this.set_active_tab = this.set_active_tab.bind(this);
  }
  
  componentDidMount(){
    this.verify_user();
  }

  reset_app(){
    cookie.remove("token", { path: "/" });
    this.setState({
      auth: false,
      power: 3,
      user_details: {},
      verified: true
    });
  }

  //render routes for application
  renderRoutes() {
    let routes = (
      <>
        {app_routes.map((route,index) => (
          <ProtectedRoute {...route} key={index} auth={this.state.auth} />
        ))}
      </>
    );
    return routes;
  }

  //verifies user credentials
  login_user(email, password) {
    return new Promise((resolve,reject)=>{
      login(email, password)
        .then((result) => {
          resolve(result);
          window.location.reload();
        })
        .catch((err) => {
          reject(err);
        });
    })
  }

  //fetches user_data after token verification
  verify_user(forced) {
    if (!forced && this.state.verified ) {
      return;
    }
    const token = cookie.get("token", { path: "/" });
    if (token === undefined) {
      this.reset_app();
      return;
    }
    verify_token()
      .then((details) => {
        this.setState({
          ...this.state,
          auth: true,
          power: details.power,
          user_details: details,
          verified: true
        });
        return;
      })
      .catch((err) => {
        this.reset_app()
        return;
      });
    return;
  }

  set_active_tab(tab_key){
    this.setState({...this.state, active_tab: tab_key})
  }
  
  render() {
    let provider_val = {
      auth: this.state.auth,
      power: this.state.power,
      user_details: this.state.user_details,
      active_tab: this.state.active_tab,
      login_user: this.login_user,
      logout_user: this.reset_app,
      verify_user: this.verify_user,
      set_active_tab: this.set_active_tab
    };
    if(!this.state.verified){
      return loading();
    }

    return (
      <app_status.Provider value={provider_val}>
        <div className="App">
          <Router>
            <Switch>{this.renderRoutes()}</Switch>
          </Router>
        </div>
      </app_status.Provider>
    );
  }
}

//Function to render routes conditionaly
function ProtectedRoute({path, exact, auth, onLogged, Component, fallback, universal}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        let logCondition = onLogged ? auth : !auth;
        if (logCondition || universal) {
          return <Component />;
        } else {
          return <Redirect to={fallback} />;
        }
      }}
    />
  );
}
