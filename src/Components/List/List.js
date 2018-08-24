// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Datetime from "react-datetime";
import RaisedButton from "material-ui/RaisedButton";
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
    const { isDelete } = this.props;
    return (
      <div className="list">
        <div>
          <Paper
            className="list__content"
            style={style}
            zDepth={1}
            onClick={this.props.onClick}
          >
            <div className="list__content__name">
              <div className="list__content__name__label" />
              <span className="list__content__name__text">
                {this.props.content}
              </span>
            </div>
            <div
              className="list__content__icon"
              onClick={this.props.onClickIcon}
            >
              <span className="list__content__icon__count">
                <span className="list__content__icon__current">
                  {this.props.current && this.props.current + "/"}
                </span>
                {this.props.count && this.props.count + "문항"}
              </span>
              {this.props.next}
            </div>
          </Paper>
          <div className="list__footer">
            <span className="list__footer__text">
              {this.props.writer && this.props.writer}
            </span>
            <span className="list__footer__text">
              {this.props.date &&
                Moment(this.props.date).format("YYYY년 MM월 DD일")}
            </span>
          </div>
        </div>
        {isDelete ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px"
            }}
          >
            <RaisedButton
              label="삭제"
              labelPosition="before"
              primary={true}
              onClick={this.props.onDeleteClick}
              style={style.button}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

List.defaultProps = defaultProps;
List.propTypes = propTypes;

export default List;
