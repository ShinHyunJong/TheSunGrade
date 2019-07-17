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
import { blue900, green400, transparent } from "material-ui/styles/colors";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as ActivityCreator from "../../ActionCreators/ActivityCreator";
import * as LevelCreator from "../../ActionCreators/LevelCreator";
import * as TestCreator from "../../ActionCreators/TestCreator";
import { Tabs, Tab } from "material-ui/Tabs";

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
  ink: {
    backgroundColor: blue900
  },
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  label: {
    width: 80
  },
  tabs: {},

  inputStyle: {
    marginLeft: 70,
    marginRight: 70
  },
  tab: {
    backgroundColor: transparent,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.075)"
  },
  tabButton: {
    color: "#162d84"
  }
};

const styleAdd = {
  position: "absolute",
  right: 200,
  bottom: 100
};

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDelete: false,
      testName: "",
      testCount: 0,
      testWriter: "",
      selectedSchool: 0,
      selectedGrade: 0,
      selectedSemester: 0,
      nameStatus: false,
      countStatus: false,
      writerStatus: false,
      deleteId: 0,
      tests: []
    };
  }

  componentDidMount() {
    this.props.dispatch(ActivityCreator.getActivity());
    this.props.dispatch(LevelCreator.getLevel());
    this.props.dispatch(TestCreator.getTests()).then(tests => {
      this.setState({ tests });
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenDelete = id => {
    this.setState({ openDelete: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  handleName = e => {
    this.setState({ testName: e.target.value });
  };

  handleCount = e => {
    this.setState({ testCount: e.target.value });
  };

  handleWriter = e => {
    this.setState({ testWriter: e.target.value });
  };

  handleSchool = index => {
    this.setState({
      selectedSchool: index,
      selectedGrade: 0
    });
  };

  handleDelete = () => {
    const { deleteId } = this.state;
    const newTest = this.state.tests.slice();
    const removeIndex = newTest
      .map((data, index) => {
        return data.id;
      })
      .indexOf(deleteId);
    newTest.splice(removeIndex, 1);
    this.setState({ tests: newTest });
    const params = { exam_id: deleteId };
    this.props.dispatch(TestCreator.deleteTest(params)).then(value => {
      this.setState({ openDelete: false });
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
    } else if (this.state.testWriter === "") {
      this.setState({ writerStatus: true });
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
            this.state.testCount,
            this.state.testWriter
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

  handleTestDetail = id => {
    this.props.history.push({
      pathname: "/test/" + id
    });
  };

  render() {
    const grade = gradeJson.data;
    const actions = [
      <FlatButton label="취소" onClick={this.handleClose} />,
      <FlatButton label="생성" primary={true} onClick={this.handlePost} />
    ];
    const actionDelete = [
      <FlatButton label="취소" onClick={this.handleCloseDelete} />,
      <FlatButton label="삭제" primary={true} onClick={this.handleDelete} />
    ];
    return (
      <div className="testPage">
        <NavBar title="시험지 목록" />
        <Tabs
          tabTemplateStyle={styles.tabs}
          tabItemContainerStyle={styles.tab}
          inkBarStyle={styles.ink}
        >
          <Tab label="초등학교" buttonStyle={styles.tabButton}>
            <Container>
              <Row className="testPage__content">
                <div>
                  {this.state.tests &&
                    this.state.tests
                      .filter(tests => {
                        return tests.school === "초등학교";
                      })
                      .map((data, index) => {
                        return (
                          <List
                            key={index}
                            isDelete
                            onClick={() => this.handleTestDetail(data.id)}
                            onDeleteClick={() => this.handleOpenDelete(data.id)}
                            content={data.title}
                            current={data.current_count}
                            count={data.question_num}
                            writer={data.writer}
                            date={data.created_at}
                            next={
                              <ImageNavigateNext
                                style={iconStyles}
                                color={blue900}
                              />
                            }
                          />
                        );
                      })}
                </div>
              </Row>
            </Container>
          </Tab>
          <Tab label="중학교" buttonStyle={styles.tabButton}>
            <div>
              <Container>
                <Row className="testPage__content">
                  <div>
                    {this.state.tests &&
                      this.state.tests
                        .filter(tests => {
                          return tests.school === "중학교";
                        })
                        .map((data, index) => {
                          return (
                            <List
                              isDelete
                              key={index}
                              onClick={() => this.handleTestDetail(data.id)}
                              onDeleteClick={() =>
                                this.handleOpenDelete(data.id)
                              }
                              content={data.title}
                              current={data.current_count}
                              writer={data.writer}
                              count={data.question_num}
                              date={data.created_at}
                              next={
                                <ImageNavigateNext
                                  style={iconStyles}
                                  color={blue900}
                                />
                              }
                            />
                          );
                        })}
                  </div>
                </Row>
              </Container>
            </div>
          </Tab>
          <Tab label="고등학교" buttonStyle={styles.tabButton}>
            <Container>
              <Row className="testPage__content">
                <div>
                  {this.state.tests &&
                    this.state.tests
                      .filter(tests => {
                        return tests.school === "고등학교";
                      })
                      .map((data, index) => {
                        return (
                          <List
                            isDelete
                            key={index}
                            onClick={() => this.handleTestDetail(data.id)}
                            content={data.title}
                            current={data.current_count}
                            count={data.question_num}
                            writer={data.writer}
                            date={data.created_at}
                            onDeleteClick={() => this.handleOpenDelete(data.id)}
                            next={
                              <ImageNavigateNext
                                style={iconStyles}
                                color={blue900}
                              />
                            }
                          />
                        );
                      })}
                </div>
              </Row>
            </Container>
          </Tab>
        </Tabs>
        <Dialog
          className="chooseTest__modal"
          title="정말 삭제하시겠습니까?"
          actions={actionDelete}
          modal={true}
          open={this.state.openDelete}
        />
        <Dialog
          className="testPage__modal"
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

            <h2 className="testPage__dialog__title">작성자</h2>

            {this.state.writerStatus === false ? (
              <TextField
                onChange={this.handleWriter}
                fullWidth={true}
                hintText="ex) 윤기은"
                style={styles.inputStyle}
              />
            ) : (
              <TextField
                onChange={this.handleWriter}
                fullWidth={true}
                errorText="작성자를 입력하세요"
                hintText="ex) 윤기은"
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

        <FloatingActionButton style={styleAdd} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

TestPage.defaultProps = defaultProps;
TestPage.propTypes = propTypes;

export default connect(mapStateToProps)(TestPage);
