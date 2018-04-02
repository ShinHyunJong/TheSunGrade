// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as ActivityCreator from "../../ActionCreators/ActivityCreator";
import * as LevelCreator from "../../ActionCreators/LevelCreator";

import { NavBar } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

const style = {
  height: 250,
  width: 250,
  margin: 20,
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  display: "flex"
};

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(ActivityCreator.getActivity());
    this.props.dispatch(LevelCreator.getLevel());
  }

  handleClick = () => {
    console.log("clicked!");
  };

  render() {
    return (
      <div className="homePage">
        <NavBar
          title="더선에듀 성적표 프로그램"
          handleClick={this.handleClick}
        />
        <div className="homePage__content">
          <Paper className="homePage__content__make" style={style} zDepth={2}>
            <h4 className="homePage__content__make__text">
              채점 및 성적표 산출
            </h4>
          </Paper>
          <Link to="/test" className="link">
            <Paper className="homePage__content__make" style={style} zDepth={2}>
              <h4 className="homePage__content__make__text">시험지 생성</h4>
            </Paper>
          </Link>

          <Link to="/category" className="link">
            <Paper className="homePage__content__make" style={style} zDepth={2}>
              <h4 className="homePage__content__make__text">카테고리 입력</h4>
            </Paper>
          </Link>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
