import React from "react";
import clsx from "clsx";
import './style.css'
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { tabIcons } from "../../utils/dashboard"; 
import app_status from "../../contexts/app_status";
import { Link } from "react-router-dom";

export default class SubTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.firstChild ? true : false,
      redirect: undefined
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {}

  handleClick(){
    document.getElementById(`${this.props.tab.key}_link`).click();
  }
  
  render() {
    let tab = this.props.tab;
    let isDrawerOpen = this.props.isDrawerOpen? true: false;
    let level = this.props.level;
    return (
      <ListItem
        button
        key={`${tab.name}>${tab.name}`}
        classes={{
          root: clsx(
            isDrawerOpen && `padding-${level}`,
            this.context.active_tab === tab.key && "selected-tab"
          ),
        }}
        onClick={this.handleClick}
      >
        {tabIcons[tab.name] ? (
          <ListItemIcon color="primary">{tabIcons[tab.name]}</ListItemIcon>
        ) : (
          <></>
        )}
        <ListItemText
          classes={{
            primary: "sidenav-text-color",
          }}
          primary={tab.name}
        />
        <Link to={tab.key} id={`${tab.key}_link`} />
      </ListItem>
    );
  }
}

SubTab.contextType = app_status;