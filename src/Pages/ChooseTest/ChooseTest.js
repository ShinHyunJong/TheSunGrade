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
import { green600, green400, transparent } from "material-ui/styles/colors";
import Chip from "material-ui/Chip";
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
    backgroundColor: green600
  },
  block: {
    maxWidth: 250
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
    color: "#5b5e6d"
  },
  radioButton: {
    marginBottom: 16
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row"
  },
  chip: {
    margin: 4,
    backgroundColor: green600
  },
  chipText: {
    color: "white"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const styleAdd = {
  position: "absolute",
  right: 250,
  bottom: 100
};

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

class ChooseTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedId: null,
      selectedTitle: "",
      selectedType: "0",
      selectedTypeText: "정답",
      selectedNumber: [],
      selectedQnum: 0,
      displayNumber: []
    };
  }

  componentDidMount() {
    this.props.dispatch(ActivityCreator.getActivity());
    this.props.dispatch(LevelCreator.getLevel());
    this.props.dispatch(TestCreator.getTests());
  }

  hasDuplicates = array => {
    return new Set(array).size !== array.length;
  };

  handleOpen = (index, title, num) => {
    this.setState({
      open: true,
      selectedId: index,
      selectedTitle: title,
      selectedQnum: num
    });
  };

  handleClose = () => {
    this.setState({ open: false, displayNumber: [] });
  };

  handleRadio = (event, value) => {
    this.setState({ selectedType: value });

    if (value === "0") {
      this.setState({ selectedTypeText: "정답" });
    } else {
      this.setState({ selectedTypeText: "오답" });
    }
  };

  handleNumber = e => {
    const input = e.target.value;
    let array = input.split(",");
    array.splice(array.length - 1, 1);
    const sendingArray = [];
    let displayArray = [];

    for (let i = 0; i < this.state.selectedQnum; i++) {
      sendingArray.push("");
    }

    if (this.state.selectedType === "0") {
      for (let i = 0; i < array.length; i++) {
        sendingArray.splice(array[i] - 1, 1, "O");
        displayArray.push(array[i] + "번");
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        sendingArray.splice(array[i] - 1, 1, "X");
        displayArray.push(array[i] + "번");
      }
    }

    this.setState({
      displayNumber: displayArray,
      selectedNumber: sendingArray
    });
  };

  handlePost = () => {
    const newArray = this.state.selectedNumber.slice();
    const emptyArray = getAllIndexes(newArray, "");
    let numberString = "";

    if (this.state.selectedType === "0") {
      for (let j = 0; j < emptyArray.length; j++) {
        newArray.splice(emptyArray[j], 1, "X");
      }
      numberString = newArray.join("");
    } else {
      for (let j = 0; j < emptyArray.length; j++) {
        newArray.splice(emptyArray[j], 1, "O");
      }

      numberString = newArray.join("");
    }


    const { name, grade, school } = this.props.location.state;
    const { selectedType, selectedId, selectedTitle } = this.state;

    const params = {
      name,
      grade,
      school,
      selectedId,
      selectedType,
      numberString
    };
    this.props.dispatch(TestCreator.postGrade(params)).then(value => {
      this.props.history.push({
        pathname: "/grading/" + selectedId + "/" + name,
        state: { selectedTitle, grade, school }
      });
    });
  };

  render() {
    const { name, grade, school } = this.props.location.state;
    const actions = [
      <FlatButton label="취소" onClick={this.handleClose} />,
      <FlatButton label="생성" primary={true} onClick={this.handlePost} />
    ];
    return (
      <div className="chooseTest">
        <NavBar title="시험지 선택" />
        <Tabs
          tabTemplateStyle={styles.tabs}
          tabItemContainerStyle={styles.tab}
          inkBarStyle={styles.ink}
        >
          <Tab label="초등학교" buttonStyle={styles.tabButton}>
            <Container>
              <Row className="chooseTest__content">
                <div>
                  <br />
                  <h5>1. 정/오답 선택</h5>
                  <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected={this.state.selectedType}
                    onChange={this.handleRadio}
                    style={styles.radioGroup}
                  >
                    <RadioButton
                      value="0"
                      label="정답"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="1"
                      label="오답"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                  <h5>2. 시험지 선택</h5>

                  {this.props.tests &&
                    this.props.tests
                      .filter(tests => {
                        return tests.school === "초등학교";
                      })
                      .map((data, index) => {
                        return (
                          <List
                            key={index}
                            content={data.title}
                            current={data.current_count}
                            count={data.question_num}
                            date={data.created_at}
                            onClick={() =>
                              this.handleOpen(
                                data.id,
                                data.title,
                                data.question_num
                              )
                            }
                            next={
                              <ImageNavigateNext
                                style={iconStyles}
                                color={green600}
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
                <Row className="chooseTest__content">
                  <div>
                    <br />

                    <h5>1. 정/오답 선택</h5>

                    <RadioButtonGroup
                      name="shipSpeed"
                      defaultSelected={this.state.selectedType}
                      onChange={this.handleRadio}
                      style={styles.radioGroup}
                    >
                      <RadioButton
                        value="0"
                        label="정답"
                        style={styles.radioButton}
                      />
                      <RadioButton
                        value="1"
                        label="오답"
                        style={styles.radioButton}
                      />
                    </RadioButtonGroup>
                    <h5>2. 시험지 선택</h5>

                    {this.props.tests &&
                      this.props.tests
                        .filter(tests => {
                          return tests.school === "중학교";
                        })
                        .map((data, index) => {
                          return (
                            <List
                              key={index}
                              content={data.title}
                              current={data.current_count}
                              count={data.question_num}
                              onClick={() =>
                                this.handleOpen(
                                  data.id,
                                  data.title,
                                  data.question_num
                                )
                              }
                              date={data.created_at}
                              next={
                                <ImageNavigateNext
                                  style={iconStyles}
                                  color={green600}
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
              <Row className="chooseTest__content">
                <div>
                  <br />
                  <h5>1. 정/오답 선택</h5>
                  <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected={this.state.selectedType}
                    onChange={this.handleRadio}
                    style={styles.radioGroup}
                  >
                    <RadioButton
                      value="0"
                      label="정답"
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="1"
                      label="오답"
                      style={styles.radioButton}
                    />
                  </RadioButtonGroup>
                  <h5>2. 시험지 선택</h5>

                  {this.props.tests &&
                    this.props.tests
                      .filter(tests => {
                        return tests.school === "고등학교";
                      })
                      .map((data, index) => {
                        return (
                          <List
                            key={index}
                            content={data.title}
                            current={data.current_count}
                            count={data.question_num}
                            date={data.created_at}
                            onClick={() =>
                              this.handleOpen(
                                data.id,
                                data.title,
                                data.question_num
                              )
                            }
                            next={
                              <ImageNavigateNext
                                style={iconStyles}
                                color={green600}
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
          title={
            name &&
            name +
              " " +
              this.state.selectedTitle +
              " " +
              this.state.selectedTypeText +
              "입력"
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            hintText="문항을 입력해주세요"
            multiLine={true}
            onChange={this.handleNumber}
            rowsMax={6}
            fullWidth={true}
          />
          <div className="chooseTest__content__chips">
            {this.state.displayNumber.map((data, index) => {
              return (
                <Chip key={index} style={styles.chip}>
                  <span style={styles.chipText}>{data}</span>
                </Chip>
              );
            })}
          </div>
        </Dialog>
      </div>
    );
  }
}

ChooseTest.defaultProps = defaultProps;
ChooseTest.propTypes = propTypes;

export default connect(mapStateToProps)(ChooseTest);
