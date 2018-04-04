// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Datetime from "react-datetime";
import Moment from "moment";

const defaultProps = {};
const propTypes = {};

const style = {
  height: 80,
  width: 500,
  marginTop: 20,
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
            <span className="list__content__name__text">
              {this.props.content}
            </span>
          </div>
          <div className="list__content__icon" onClick={this.props.onClickIcon}>
            <span className="list__content__icon__count">
              {this.props.count && this.props.count + "문항"}
            </span>
            {this.props.next}
          </div>
        </Paper>
        <div className="list__footer">
          <span className="list__footer__text">
            {this.props.date &&
              Moment(this.props.date).format("YYYY년 MM월 DD일")}
          </span>
        </div>
      </div>
    );
  }
}

List.defaultProps = defaultProps;
List.propTypes = propTypes;

export default List;
