import React from "react";
import clsx from "clsx";
import "./style.css";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SubTab from "../sub_tab";
import {tabIcons} from "../../utils/dashboard"

/* eslint-disable no-useless-constructor */

export default class PrimeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: true,
    }
    this.subList = this.subList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {}

  subList() {
    return this.props.tab.subtype.map((tab,index) => {
        let props = {
            tab: tab,
            isParentOpen: this.state.open,
            level: this.props.level + 1,
            isDrawerOpen: this.props.isDrawerOpen,
        }
        if (tab.type === "sub") return <SubTab key={index} {...props}/>;
        else if (tab.type === "prime") return <PrimeTab key={index} {...props}/>;
        else return false;
    });
  }

  handleClick(){
    this.setState({...this.state, open: !this.state.open})
  }
  render() {
    let tab = this.props.tab;
    let isParentOpen = this.props.isParentOpen? true: false;
    let isFirstChild = this.props.level === 0? true: false;
    let isDrawerOpen = this.props.isDrawerOpen? true: false;
    let level = this.props.level;
    return (
    <div
      key={`${tab.name}>collapse`}
      style={{
        display: isParentOpen || isFirstChild ? true : "none",
      }}
    >
      <ListItem
        button
        key={tab.name}
        classes={{
          root: clsx(
            isDrawerOpen && `padding-${level}`
          ),
        }}
        onClick={this.handleClick}
      >
        {tabIcons[tab.name] ? (
          <ListItemIcon
            classes={{
              root: clsx(
                !isParentOpen && "side-drawer-closed-icon-padding"
              ),
            }}
          >
            {tabIcons[tab.name]}
          </ListItemIcon>
        ) : (
          <></>
        )}
        <ListItemText
          classes={{
            root: clsx(
              !isParentOpen && isFirstChild && "display-none"
            ),
            primary: "sidenav-text-color",
          }}
          primary={tab.name}
        />
        <ListItemIcon
          classes={{ root: clsx(!isParentOpen && "display-none") }}
        >
          {" "}
          {this.state.open ? (
            <ExpandLess className="sidebar-tab-icon-color" />
          ) : (
            <ExpandMore className="sidebar-tab-icon-color" />
          )}
        </ListItemIcon>
      </ListItem>
      <div
        key={`${tab.name}>collapse>sublist`}
        style={{
          display: this.state.open && isParentOpen ? "block" : "none",
        }}
      >
        <List key={`${tab.name}>sublist`} component="div">
          {this.subList()}
        </List>
      </div>
    </div>
  );
  }
}