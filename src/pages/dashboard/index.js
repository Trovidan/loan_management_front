/* eslint-disable no-useless-constructor */
import React from 'react'
import clsx from 'clsx'
import "./style.css";
import { Switch, Route} from 'react-router-dom'
//material-ui & css 
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { side_nav_tabs, routes } from '../../utils/dashboard.js'
import PrimeTab from "../../containers/prime_tab"
import SubTab from "../../containers/sub_tab";
import MenuIcon from "@material-ui/icons/Menu"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import app_status from '../../contexts/app_status';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      twinContent: <></>,
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.listJSX = this.listJSX.bind(this);
    this.renderList = this.renderList.bind(this);
    this.restrictedRoute = this.restrictedRoute.bind(this);
    this.renderRoutes = this.renderRoutes.bind(this);
    this.update_active_tab = this.update_active_tab.bind(this);
  }

  componentDidMount() {
    if (window.location.pathname !== this.context.active_tab)
      this.update_active_tab();
  }

  componentDidUpdate(){
    if (window.location.pathname !== this.context.active_tab)
      this.update_active_tab();
  }

  toggleSideBar(){
    this.setState({ ...this.state, open: !this.state.open });
  };

  listJSX() {
    return (
      <div role="presentation" className="sidenav-option-list">
        <List>{side_nav_tabs.map((tab) => this.renderList(tab))}</List>
      </div>
    );
  }

  renderList(tab) {
    let props = {
      tab: tab,
      isParentOpen: this.state.open,
      level: 0,
      isDrawerOpen: this.state.open,
    };
    if (tab.type === "prime") return <PrimeTab key={tab.key} {...props} />;
    else if (tab.type === "sub") return <SubTab key={tab.key} {...props} />;
    else return <></>;
  }

  restrictedRoute(route, props) {
    return (
      <Route key={route.path} path={route.path} exact={route.exact}>
        <route.component {...props} />
      </Route>
    ); 
  }

  renderRoutes(props) {
    return <>{routes.map((route) => {return this.restrictedRoute(route, props)})}</>;
  }
  
  update_active_tab(){
    this.context.set_active_tab(window.location.pathname);
  }
  
  render() {
    return (
      <div style={{position: "relative" }}>
        <Drawer
          id="collapsible-sidebar"
          open={this.state.open}
          variant="permanent"
          onClose={this.toggleSideBar}
          classes={{
            paper: clsx(
              !this.state.open && "side-drawer-closed",
              this.state.open && "side-drawer-open"
            ),
          }}
          onClick={(e)=>{
            if(!this.state.open)
              this.toggleSideBar();
          }}
        >
          <Button
            className={clsx(
              "collapsible-sidebar-open-btn-container",
              this.state.open && "display-none"
            )}
          >
            <MenuIcon classes={{ root: "sidebar-tab-icon-color" }} />
          </Button>
          <div
            className="collapsible-sidebar-close-btn-container"
            style={{
              display: this.state.open ? "flex" : "none",
            }}
            onClick={this.toggleSideBar}
          >
            <ArrowBackIosIcon classes={{ root: "sidebar-tab-icon-color" }} />
          </div>
          <Divider />
          {this.listJSX()}
        </Drawer>
        <main
          id="main-content"
          className={clsx(
            this.state.open && "side-drawer-open-twin-content",
            !this.state.open && "side-drawer-closed-twin-content"
          )}
        >
          <Switch>
            {this.renderRoutes({
              ...this.props,
              isDrawerOpen: this.state.open,
            })}
          </Switch>
        </main>
      </div>
    );
  }
}

Dashboard.contextType = app_status