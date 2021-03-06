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
import ContentAdd from "material-ui/svg-icons/content/add";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import gradeJson from "../../Json/grade";
import Snackbar from "material-ui/Snackbar";

import * as TestActionCreator from "../../ActionCreators/TestCreator";
import * as LevelCreator from "../../ActionCreators/LevelCreator";
import * as ActivityCreator from "../../ActionCreators/ActivityCreator";

const defaultProps = {};
const propTypes = {};
const styleAdd = {
  position: "fixed",
  right: 250,
  bottom: 100
};

const mapStateToProps = state => {
  return {
    activity: state.reducer.activity,
    level: state.reducer.level
  };
};

const styles = {
  customWidth: {
    width: 200
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "red"
  },
  buttonColor: {
    backgroundColor: "#E25F70"
  },
  input: {
    marginTop: 8,
    marginLeft: 24,
    marginRight: 25,
    width: 155
  },
  input2: {
    marginLeft: 35,
    marginRight: 25,
    width: 155
  }
};

class TestDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      value: [],
      smallValue: [],
      problems: [],
      question_num: [],
      activity: [],
      level: [],
      content: [],
      percent: [],
      leftTest: [],
      isPosted: [],
      leftNumber: 0,
      open: false,
      openEdit: false
    };
  }

  componentDidMount() {
    const { test_id } = this.props.match.params;
    const oriArray = [];
    const valueArray = [];
    const booleanArray = [];
    const levelArray = [];
    const activityArray = [];
    this.props.dispatch(LevelCreator.getLevel()).then(levels => {
      this.props.dispatch(ActivityCreator.getActivity()).then(activities => {
        this.props.dispatch(TestActionCreator.getTest(test_id)).then(value => {
          this.setState({ test: value });
          for (let i = 0; i < value.question_num; i++) {
            oriArray.push("");
            valueArray.push(0);
            booleanArray.push(false);
            activityArray.push(activities[0].name);
            levelArray.push(levels[0].name);
          }
          this.setState(state => ({
            question_num: oriArray,
            activity: activityArray,
            level: levelArray,
            value: valueArray,
            smallValue: valueArray,
            content: oriArray,
            percent: oriArray,
            isPosted: booleanArray
          }));
          this.props
            .dispatch(TestActionCreator.getProblem(test_id))
            .then(value2 => {
              const leftLength = value.question_num - value2.length;
              const leftArray = [];
              for (let i = 0; i < leftLength; i++) {
                leftArray.push("");
              }
              this.setState({
                leftTest: leftArray,
                leftNumber: value2.length,
                problems: value2
              });
              let newValue = this.state.value.slice(); //copy the array
              let newSmall = this.state.smallValue.slice();
              let newActivity = this.state.activity.slice();
              let newLevel = this.state.level.slice();
              let newContent = this.state.content.slice();
              let newPercent = this.state.percent.slice(); //copy the array
              let newIsPosted = this.state.isPosted.slice();

              for (let i = 0; i < value2.length; i++) {
                newValue.splice(
                  value2[i].problem_num - 1,
                  1,
                  value2[i].big_index
                );
                newSmall.splice(
                  value2[i].problem_num - 1,
                  1,
                  value2[i].small_index
                );
                newIsPosted.splice(value2[i].problem_num - 1, 1, true);
                newActivity.splice(
                  value2[i].problem_num - 1,
                  1,
                  value2[i].activity
                );
                newLevel.splice(value2[i].problem_num - 1, 1, value2[i].level);
                newContent.splice(
                  value2[i].problem_num - 1,
                  1,
                  value2[i].content
                );
                newPercent.splice(
                  value2[i].problem_num - 1,
                  1,
                  value2[i].accuracy
                );
              }
              this.setState({
                value: newValue,
                smallValue: newSmall,
                activity: newActivity,
                level: newLevel,
                content: newContent,
                percent: newPercent,
                isPosted: newIsPosted
              });
            });
        });
      });
    });
  }

  handleBig = (event, key, value, index) => {
    let newValue = this.state.value.slice(); //copy the array
    newValue[index] = value; //execute the manipulations
    let newSmall = this.state.smallValue.slice();
    newSmall[index] = 0;
    this.setState({ value: newValue });
    this.setState({ smallValue: newSmall }); //set the new state
  };

  handleSmall = (event, key, value, index) => {
    let newValue = this.state.smallValue.slice(); //copy the array
    newValue[index] = value; //execute the manipulations
    this.setState({ smallValue: newValue }); //set the new state
  };

  handleActivity = (event, key, value, index) => {
    let newValue = this.state.activity.slice(); //copy the array
    newValue[index] = value; //execute the manipulations
    this.setState({ activity: newValue }); //set the new state
  };

  handleLevel = (event, key, value, index) => {
    let newValue = this.state.level.slice(); //copy the array
    newValue[index] = value; //execute the manipulations
    this.setState({ level: newValue }); //set the new state
  };

  handleContent = (e, index) => {
    let newValue = this.state.content.slice(); //copy the array
    newValue[index] = e.target.value; //execute the manipulations
    this.setState({ content: newValue }); //set the new state
  };

  handlePercent = (e, index) => {
    let newValue = this.state.percent.slice(); //copy the array
    newValue[index] = e.target.value; //execute the manipulations
    this.setState({ percent: newValue }); //set the new state
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleRequestClose2 = () => {
    this.setState({
      openEdit: false
    });
  };

  handleProblem = index => {
    const { test } = this.state;
    const { test_id } = this.props.match.params;

    const gradeData = gradeJson.data;
    const semester =
      gradeData[test.school_index].grade[test.grade_index].semester[
        test.semester_index
      ];
    const problem_num = index + 1;
    const big = semester.big[this.state.value[index]].name;
    const big_index = this.state.value[index];
    const small =
      semester.big[this.state.value[index]].small[this.state.smallValue[index]];
    const small_index = this.state.smallValue[index];
    const activity = this.state.activity[index];
    const level = this.state.level[index];
    const exam_id = test_id;
    let content = "";
    if (this.state.content[index] === "" || null || undefined) {
      content = small;
    } else {
      content = this.state.content[index];
    }
    this.state.content[index];
    const accuracy = this.state.percent[index];
    console.log("문제번호 " + problem_num);
    console.log("대단원: " + big);
    console.log("대단원인덱스: " + big_index);
    console.log("소단원: " + small);
    console.log("소단원인덱스: " + small_index);
    console.log("행동영역: " + activity);
    console.log("난이도: " + level);
    console.log("시험아이디: " + exam_id);
    console.log("내용영역: " + content);
    console.log("정확도: " + accuracy);
    let newValue = this.state.isPosted.slice(); //copy the array
    newValue[index] = true; //execute the manipulations
    this.setState({ isPosted: newValue, open: true }); //set the new state
    // this.setState({ open: true });

    this.props.dispatch(
      TestActionCreator.postProblem(
        problem_num,
        big,
        big_index,
        small,
        small_index,
        activity,
        level,
        exam_id,
        content,
        accuracy
      )
    );
  };

  handleUpdate = index => {
    const { test } = this.state;
    const { test_id } = this.props.match.params;

    const gradeData = gradeJson.data;
    const semester =
      gradeData[test.school_index].grade[test.grade_index].semester[
        test.semester_index
      ];
    const problem_num = index + 1;
    const big = semester.big[this.state.value[index]].name;
    const big_index = this.state.value[index];
    const small =
      semester.big[this.state.value[index]].small[this.state.smallValue[index]];
    const small_index = this.state.smallValue[index];
    const activity = this.state.activity[index];
    const level = this.state.level[index];
    const exam_id = test_id;
    let content = "";
    if (this.state.content[index] === "" || null || undefined) {
      content = small;
    } else {
      content = this.state.content[index];
    }
    const accuracy = this.state.percent[index];
    console.log("문제번호 " + problem_num);
    console.log("대단원: " + big);
    console.log("대단원인덱스: " + big_index);
    console.log("소단원: " + small);
    console.log("소단원인덱스: " + small_index);
    console.log("행동영역: " + activity);
    console.log("난이도: " + level);
    console.log("시험아이디: " + exam_id);
    console.log("내용영역: " + content);
    console.log("정확도: " + accuracy);
    let newValue = this.state.isPosted.slice(); //copy the array
    newValue[index] = true; //execute the manipulations
    this.setState({ isPosted: newValue, openEdit: true }); //set the new state
    // this.setState({ open: true });

    this.props.dispatch(
      TestActionCreator.updateProblem(
        problem_num,
        big,
        big_index,
        small,
        small_index,
        activity,
        level,
        exam_id,
        content,
        accuracy
      )
    );
  };

  handleUpdateNew = index => {
    console.log(this.state.activity[index]);
    const { test } = this.state;
    const { test_id } = this.props.match.params;

    const gradeData = gradeJson.data;
    const semester =
      gradeData[test.school_index].grade[test.grade_index].semester[
        test.semester_index
      ];
    const problem_num = index + 1;
    const big = semester.big[this.state.value[index]].name;
    const big_index = this.state.value[index];
    const small =
      semester.big[this.state.value[index]].small[this.state.smallValue[index]];
    const small_index = this.state.smallValue[index];
    const activity = this.props.activity[this.state.activity[index]].name;
    const level = this.props.level[this.state.level[index]].name;
    const exam_id = test_id;
    const content = this.state.content[index];
    const accuracy = this.state.percent[index];
    console.log(problem_num);
    console.log(big);
    console.log(big_index);
    console.log(small);
    console.log(small_index);
    console.log(activity);
    console.log(level);
    console.log(exam_id);
    console.log(content);
    console.log(accuracy);
    let newValue = this.state.isPosted.slice(); //copy the array
    newValue[index] = true; //execute the manipulations
    this.setState({ isPosted: newValue, openEdit: true }); //set the new state
    // this.setState({ open: true });

    this.props.dispatch(
      TestActionCreator.updateProblem(
        problem_num,
        big,
        big_index,
        small,
        small_index,
        activity,
        level,
        exam_id,
        content,
        accuracy
      )
    );
  };

  render() {
    const {
      test,
      problems,
      leftTest,
      leftNumber,
      question_num,
      isPosted
    } = this.state;
    const { activity, level } = this.props;
    const gradeData = gradeJson.data;
    if (test === undefined || test === null || test.length === 0) {
      return (
        <div className="testDetailPage">
          <NavBar title="" />
        </div>
      );
    } else {
      const semester =
        gradeData[test.school_index].grade[test.grade_index].semester[
          test.semester_index
        ].big;

      return (
        <div className="testDetailPage">
          <NavBar title={test.title} />
          <Container>
            {question_num &&
              question_num.map((data, index) => {
                return (
                  <div className="testDetailPage__content" key={index}>
                    <Row className="testDetailPage__content__title">
                      {isPosted[index] === true ? (
                        <h3 className="testDetailPage__content__title__text__isPosted">
                          {index + 1}번 문제가 등록되었습니다.
                        </h3>
                      ) : (
                        <h3 className="testDetailPage__content__title__text">
                          {index + 1}번 문제
                        </h3>
                      )}
                    </Row>
                    <Row className="testDetailPage__content__label">
                      <span className="testDetailPage__content__label__text">
                        대단원
                      </span>
                      <span className="testDetailPage__content__label__text">
                        소단원
                      </span>
                      <span className="testDetailPage__content__label__text">
                        행동영역
                      </span>
                      <span className="testDetailPage__content__label__text">
                        난이도
                      </span>
                      <span className="testDetailPage__content__label__text">
                        정확도
                      </span>
                    </Row>
                    <Row>
                      <DropDownMenu
                        value={this.state.value[index]}
                        onChange={(event, key, value) =>
                          this.handleBig(event, key, value, index)
                        }
                        style={styles.customWidth}
                        autoWidth={false}
                      >
                        {semester.map((data, bigIndex) => {
                          return (
                            <MenuItem
                              key={bigIndex}
                              value={bigIndex}
                              primaryText={data.name}
                            />
                          );
                        })}
                      </DropDownMenu>

                      <DropDownMenu
                        value={this.state.smallValue[index]}
                        onChange={(event, key, value) =>
                          this.handleSmall(event, key, value, index)
                        }
                        style={styles.customWidth}
                        autoWidth={false}
                      >
                        {semester[this.state.value[index]].small.map(
                          (data, smallIndex) => {
                            return (
                              <MenuItem
                                key={smallIndex}
                                value={smallIndex}
                                primaryText={data}
                              />
                            );
                          }
                        )}
                      </DropDownMenu>

                      <DropDownMenu
                        value={this.state.activity[index]}
                        onChange={(event, key, value) =>
                          this.handleActivity(event, key, value, index)
                        }
                        style={styles.customWidth}
                        autoWidth={false}
                      >
                        {activity &&
                          activity.map((data, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={data.name}
                                primaryText={data.name}
                              />
                            );
                          })}
                      </DropDownMenu>

                      <DropDownMenu
                        value={this.state.level[index]}
                        onChange={(event, key, value) =>
                          this.handleLevel(event, key, value, index)
                        }
                        style={styles.customWidth}
                        autoWidth={false}
                      >
                        {level &&
                          level.map((data, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={data.name}
                                primaryText={data.name}
                              />
                            );
                          })}
                      </DropDownMenu>
                      <TextField
                        onChange={e => this.handlePercent(e, index)}
                        hintText="정답률"
                        value={this.state.percent[index]}
                        style={styles.input}
                      />
                    </Row>
                    <Row className="testDetailPage__content__input">
                      <Col sm={{ offset: 2 }}>
                        <input
                          onChange={e => this.handleContent(e, index)}
                          placeholder="내용영역"
                          value={this.state.content[index]}
                          style={styles.input2}
                        />
                      </Col>
                    </Row>
                    <Snackbar
                      open={this.state.open}
                      message="문제 등록에 성공하였습니다"
                      autoHideDuration={3000}
                      onRequestClose={this.handleRequestClose}
                    />
                    <Snackbar
                      open={this.state.openEdit}
                      message="문제 수정에 성공하였습니다"
                      autoHideDuration={3000}
                      onRequestClose={this.handleRequestClose2}
                    />

                    {isPosted[index] === true ? (
                      <RaisedButton
                        label="수정"
                        buttonStyle={styles.buttonColor}
                        labelPosition="before"
                        onClick={() => this.handleUpdate(index)}
                        primary={true}
                        style={styles.button}
                      />
                    ) : (
                      <RaisedButton
                        label="등록"
                        labelPosition="before"
                        onClick={() => this.handleProblem(index)}
                        primary={true}
                        style={styles.button}
                      />
                    )}
                  </div>
                );
              })}
            <hr />
          </Container>
        </div>
      );
    }
  }
}

TestDetailPage.defaultProps = defaultProps;
TestDetailPage.propTypes = propTypes;

export default connect(mapStateToProps)(TestDetailPage);
