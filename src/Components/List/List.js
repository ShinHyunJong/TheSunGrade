// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import Paper from "material-ui/Paper";

const defaultProps = {};
const propTypes = {};

const style = {
  height: 80,
  width: 500,
  margin: 20,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list">
        <Paper className="list__content" style={style} zDepth={1}>
          <div className="list__content__name">
            <div className="list__content__name__label" />
            <div className="list__content__name__text">
              {this.props.content}
            </div>
          </div>
          <div className="list__content__icon" onClick={this.props.onClickIcon}>
            {this.props.next}
          </div>
        </Paper>
      </div>
    );
  }
}

List.defaultProps = defaultProps;
List.propTypes = propTypes;

export default List;
