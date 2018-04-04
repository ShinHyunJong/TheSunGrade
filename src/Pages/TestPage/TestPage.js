// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { NavBar, List } from "../../Components";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { Link, Prompt } from "react-router-dom";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import gradeJson from "../../Json/grade";
import { ImageNavigateNext } from "material-ui/svg-icons";
import { green600, green400 } from "material-ui/styles/colors";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as ActivityCreator from "../../ActionCreators/ActivityCreator";
import * as LevelCreator from "../../ActionCreators/LevelCreator";
import * as TestCreator from "../../ActionCreators/TestCreator";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    tests: state.reducer.tests
  };
};

const iconStyles = {
  width: 30,
  height: 30,
  marginRight: 10
};

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  label: {
    width: 80
  },
  inputStyle: {
    marginLeft: 70,
    marginRight: 70
  }
};

const styleAdd = {
  position: "absolute",
  right: 250,
  bottom: 100
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      testName: "",
      testCount: 0,
      selectedSchool: 0,
      selectedGrade: 0,
      selectedSemester: 0,
      nameStatus: false,
      countStatus: false
    };
  }

  componentDidMount() {
    this.props.dispatch(ActivityCreator.getActivity());
    this.props.dispatch(LevelCreator.getLevel());
    this.props.dispatch(TestCreator.getTests());
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleName = e => {
    this.setState({ testName: e.target.value });
  };

  handleCount = e => {
    this.setState({ testCount: e.target.value });
  };

  handleSchool = index => {
    this.setState({
      selectedSchool: index,
      selectedGrade: 0
    });
  };

  handleNext = () => {
    console.log("next!");
  };

  handleGrade = index => {
    this.setState({
      selectedGrade: index,
      selectedSemester: 0
    });
  };

  handleSemester = index => {
    this.setState({ selectedSemester: index });
  };

  handlePost = async() => {
    const grade = gradeJson.data;
    if (this.state.testName === "") {
      this.setState({ nameStatus: true });
    } else if (this.state.testCount === 0) {
      this.setState({ countStatus: true });
    } else {
      await this.props
        .dispatch(
          TestCreator.postTest(
            this.state.testName,
            grade[this.state.selectedSchool].school,
            this.state.selectedSchool,
            grade[this.state.selectedSchool].grade[this.state.selectedGrade]
              .year,
            this.state.selectedGrade,
            grade[this.state.selectedSchool].grade[this.state.selectedGrade]
              .semester[this.state.selectedSemester].index,
            this.state.selectedSemester,
            this.state.testCount
          )
        )
        .then(value => {
          this.props.history.push({
            pathname: "/test/" + value,
            params: {
              testName: this.state.testName,
              testCount: this.state.testCount,
              school: grade[this.state.selectedSchool].school,
              grade:
                grade[this.state.selectedSchool].grade[this.state.selectedGrade]
                  .year,
              semester:
                grade[this.state.selectedSchool].grade[this.state.selectedGrade]
                  .semester[this.state.selectedSemester]
            }
          });
        });
    }
  };

  render() {
    const grade = gradeJson.data;
    const actions = [
      <FlatButton label="취소" onClick={this.handleClose} />,
      <FlatButton label="생성" primary={true} onClick={this.handlePost} />
    ];
    return (
      <div className="testPage">
        <NavBar title="시험지 목록" />
        <Dialog
          title="시험지 추가하기"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <Row className="testPage__dialog">
            <h2 className="testPage__dialog__title">이름</h2>

            {this.state.nameStatus === false ? (
              <TextField
                onChange={this.handleName}
                fullWidth={true}
                hintText="ex) 중1-1 입학테스트"
                style={styles.inputStyle}
              />
            ) : (
              <TextField
                onChange={this.handleName}
                fullWidth={true}
                errorText="시험지 이름을 입력하세요"
                hintText="ex) 중1-1 입학테스트"
                style={styles.inputStyle}
              />
            )}

            <h2 className="testPage__dialog__title">문항수</h2>

            {this.state.countStatus === false ? (
              <TextField
                onChange={this.handleCount}
                fullWidth={true}
                hintText="ex) 30"
                style={styles.inputStyle}
              />
            ) : (
              <TextField
                onChange={this.handleCount}
                fullWidth={true}
                errorText="시험지 문항수를 입력하세요"
                hintText="ex) 30"
                style={styles.inputStyle}
              />
            )}

            <Col className="testPage__dialog__section">
              <h2 className="testPage__dialog__section__title">학교선택</h2>
              <RadioButtonGroup
                name="shipSpeed"
                defaultSelected={grade[this.state.selectedSchool].school}
              >
                {grade.map((grade, index) => {
                  return (
                    <RadioButton
                      key={index}
                      onClick={() => this.handleSchool(index)}
                      value={grade.school}
                      label={grade.school}
                      style={styles.radioButton}
                      iconStyle={styles.icon}
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                    />
                  );
                })}
              </RadioButtonGroup>
            </Col>
            <Col className="testPage__dialog__section">
              <h2 className="testPage__dialog__section__title">학년선택</h2>
              <RadioButtonGroup
                name="shipSpeed3"
                defaultSelected={
                  grade[this.state.selectedSchool].grade[
                    this.state.selectedGrade
                  ].year
                }
              >
                {grade[this.state.selectedSchool].grade.map((grade, index) => {
                  return (
                    <RadioButton
                      key={index}
                      onClick={() => this.handleGrade(index)}
                      value={grade.year}
                      label={grade.year}
                      style={styles.radioButton}
                      iconStyle={styles.icon}
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                    />
                  );
                })}
              </RadioButtonGroup>
            </Col>
            <Col className="testPage__dialog__section">
              <h2 className="testPage__dialog__section__title">학기선택</h2>
              <RadioButtonGroup
                name="shipSpeed2"
                defaultSelected={
                  grade[this.state.selectedSchool].grade[
                    this.state.selectedGrade
                  ].semester[this.state.selectedSemester].index
                }
              >
                {grade[this.state.selectedSchool].grade[
                  this.state.selectedGrade
                ].semester.map((grade, index) => {
                  return (
                    <RadioButton
                      key={index}
                      value={grade.index}
                      onClick={() => this.handleSemester(index)}
                      label={grade.index}
                      style={styles.radioButton}
                      iconStyle={styles.icon}
                      labelStyle={styles.label}
                      inputStyle={styles.input}
                    />
                  );
                })}
              </RadioButtonGroup>
            </Col>
          </Row>
        </Dialog>
        <Container>
          <Row className="testPage__content">
            {this.props.tests &&
              this.props.tests.map((data, index) => {
                return (
                  <Link key={index} to={"/test/" + data.id}>
                    <List
                      content={data.title}
                      next={
                        <ImageNavigateNext
                          style={iconStyles}
                          color={green600}
                        />
                      }
                    />
                  </Link>
                );
              })}
          </Row>
          <FloatingActionButton
            style={styleAdd}
            label="Modal Dialog"
            onClick={this.handleOpen}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Container>
      </div>
    );
  }
}

TestPage.defaultProps = defaultProps;
TestPage.propTypes = propTypes;

export default connect(mapStateToProps)(TestPage);
