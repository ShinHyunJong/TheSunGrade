// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import FlatButton from "material-ui/FlatButton";
const defaultProps = {};
const propTypes = {};
const styles = {
  title: {
    cursor: "pointer"
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        title={<span style={styles.title}>{this.props.title}</span>}
        onTitleClick={this.props.handleClick}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
