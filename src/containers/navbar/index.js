/* eslint-disable no-useless-constructor */
import React from "react";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom"; 
import app_status from "../../contexts/app_status";
import { initials, StyledBadge } from "./utils";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayProfileOptions: null,
    };
    this.handle_profile_click = this.handle_profile_click.bind(this);
  }
  handle_profile_click(e){
    document.getElementById("profile_link").click();
  }
  render() {
    let name = this.context.user_details.name
    return (
      <div className="Navbar-body">
        {this.props.searchJSX}
        <div>
          <IconButton
            aria-label="Notification"
            aria-haspopup="true"
            children={
              <>
                <NotificationsIcon style={{ width: "32px", height: "32px" }} />
              </>
            }
            style={{
              padding: "8px",
            }}
          />
        </div>
        <div className="navbar-user-profile">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              variant="rounded"
              className="profile_image_border"
              onClick={(e) => {
                this.setState({
                  ...this.state,
                  displayProfileOptions: e.currentTarget,
                });
              }}
            >
              {initials(name)}
            </Avatar>
          </StyledBadge>
          <Menu
            keepMounted
            anchorEl={this.state.displayProfileOptions}
            open={Boolean(this.state.displayProfileOptions)}
            onClose={() => {
              this.setState({ ...this.state, displayProfileOptions: null });
            }}
          >
            <MenuItem onClick={this.handle_profile_click}>Profile</MenuItem>
            <MenuItem onClick={this.context.logout_user}>Sign Out</MenuItem>
          </Menu>
        </div>
        <Link id="profile_link" to="/profile" />
      </div>
    );
  }
}

Navbar.contextType = app_status;