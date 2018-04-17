// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { NavBar, List } from "../../Components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import TextField from "material-ui/TextField";
import { ImageNavigateNext } from "material-ui/svg-icons";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};
const styleAdd = {
  position: "fixed",
  right: 300,
  bottom: 100
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class GradingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      grade: "",
      school: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  handleNext = () => {
    const { name, grade, school } = this.state;

    if (name === "" || grade === "" || school === "") {
      return null;
    }
    this.props.history.push({
      pathname: "/grading/choose_test",
      state: { name, grade, school }
    });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };

  handleGrade = e => {
    this.setState({ grade: e.target.value });
  };

  handleSchool = e => {
    this.setState({ school: e.target.value });
  };

  render() {
    return (
      <div className="gradingPage">
        <NavBar title="채점" />
        <div className="gradingPage__content">
          <h2 className="gradingPage__content__title">
            학생 정보를 입력하세요.
          </h2>
          <br />
          <br />
          <TextField onChange={this.handleName} hintText="이름" />
          <br />
          <TextField onChange={this.handleGrade} hintText="학년" />
          <br />
          <TextField onChange={this.handleSchool} hintText="학교" />
        </div>
        <FloatingActionButton style={styleAdd} onClick={this.handleNext}>
          <ImageNavigateNext />
        </FloatingActionButton>
      </div>
    );
  }
}

GradingPage.defaultProps = defaultProps;
GradingPage.propTypes = propTypes;

export default connect(mapStateToProps)(GradingPage);
