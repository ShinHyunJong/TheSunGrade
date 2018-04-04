// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Prompt } from "react-router-dom";
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
import Snackbar from "material-ui/Snackbar";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as TestCreator from "../../ActionCreators/TestCreator";

const defaultProps = {};
const propTypes = {};
const styles = {
  customWidth: {
    width: 200
  },
  button: {
    marginTop: 10,
    marginLeft: 25,
    backgroundColor: "red"
  },
  buttonColor: {
    backgroundColor: "#E25F70"
  },
  input: {
    marginLeft: 24,
    marginRight: 25,
    width: 155
  }
};

const mapStateToProps = state => {
  return {
    activity: state.reducer.activity,
    level: state.reducer.level,
    test: state.reducer.test
  };
};

class TestCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: [],
      smallValue: [],
      activity: [],
      level: [],
      content: [],
      percent: [],
      isPosted: []
    };
  }

  componentWillMount() {
    const { testCount } = this.props.location.params;
    let countArray = [];
    let textArray = [];
    let postArray = [];
    for (let i = 0; i < testCount; i++) {
      countArray.push(0);
      textArray.push("");
      postArray.push(false);
    }

    this.setState({
      value: countArray,
      smallValue: countArray,
      activity: countArray,
      level: countArray,
      content: textArray,
      percent: textArray,
      isPosted: postArray
    });
  }

  handleChange = (event, key, value, index) => {
    let newValue = this.state.value.slice(); //copy the array
    newValue[index] = value; //execute the manipulations
    this.setState({ value: newValue }); //set the new state
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

  handleProblem = index => {
    const { semester } = this.props.location.params;
    const problem_num = index + 1;
    const big = semester.big[this.state.value[index]].name;
    const big_index = this.state.value[index];
    const small =
      semester.big[this.state.value[index]].small[this.state.smallValue[index]];
    const small_index = this.state.smallValue[index];
    const activity = this.props.activity[this.state.activity[index]].name;
    const level = this.props.level[this.state.level[index]].name;
    const exam_id = this.props.test;
    const content = this.state.content[index];
    const accuracy = this.state.percent[index];
    console.log(problem_num);
    console.log(big);
    console.log(small);
    console.log(activity);
    console.log(level);
    console.log(exam_id);
    console.log(content);
    console.log(accuracy);
    let newValue = this.state.isPosted.slice(); //copy the array
    newValue[index] = true; //execute the manipulations
    this.setState({ isPosted: newValue }); //set the new state
    this.setState({ open: true });

    this.props.dispatch(
      TestCreator.postProblem(
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
    const { testName, testCount, semester } = this.props.location.params;
    return (
      <div className="testCreatePage">
        <Prompt
          when={true}
          message={location =>
            "이 페이지를 나가면 정보가 손실됩니다. 그래도 나가시겠습니까?"
          }
        />
        <NavBar title={testName} />
        <Container>
          {this.state.value.map((data, index) => {
            return (
              <div className="testCreatePage__content" key={index}>
                <Row className="testCreatePage__content__title">
                  {this.state.isPosted[index] === false ? (
                    <h3 className="testCreatePage__content__title__text">
                      {index + 1}번 문제
                    </h3>
                  ) : (
                    <h3 className="testCreatePage__content__title__text__isPosted">
                      {index + 1}번 문제가 등록되었습니다
                    </h3>
                  )}
                </Row>
                <Row className="testCreatePage__content__label">
                  <span className="testCreatePage__content__label__text">
                    대단원
                  </span>
                  <span className="testCreatePage__content__label__text">
                    소단원
                  </span>
                  <span className="testCreatePage__content__label__text">
                    행동영역
                  </span>
                  <span className="testCreatePage__content__label__text">
                    난이도
                  </span>
                </Row>
                <Row>
                  <DropDownMenu
                    value={this.state.value[index]}
                    onChange={(event, key, value) =>
                      this.handleChange(event, key, value, index)
                    }
                    style={styles.customWidth}
                    autoWidth={false}
                  >
                    {semester.big.map((data, bigIndex) => {
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
                    {semester.big[this.state.value[index]].small.map(
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
                    {this.props.activity.map((data, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={index}
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
                    {this.props.level.map((data, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={index}
                          primaryText={data.name}
                        />
                      );
                    })}
                  </DropDownMenu>
                </Row>
                <Row className="testCreatePage__content__input">
                  <TextField
                    onChange={e => this.handleContent(e, index)}
                    hintText="내용영역"
                    style={styles.input}
                  />
                  <TextField
                    onChange={e => this.handlePercent(e, index)}
                    hintText="정답률"
                    style={styles.input}
                  />
                </Row>
                <Row>
                  {this.state.isPosted[index] === false ? (
                    <RaisedButton
                      label="등록"
                      labelPosition="before"
                      primary={true}
                      onClick={() => this.handleProblem(index)}
                      style={styles.button}
                    />
                  ) : (
                    <RaisedButton
                      label="수정"
                      buttonStyle={styles.buttonColor}
                      labelPosition="before"
                      primary={true}
                      style={styles.button}
                    />
                  )}
                </Row>
                <Snackbar
                  open={this.state.open}
                  message="문제 등록에 성공하였습니다"
                  autoHideDuration={3000}
                  onRequestClose={this.handleRequestClose}
                />
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

TestCreatePage.defaultProps = defaultProps;
TestCreatePage.propTypes = propTypes;

export default connect(mapStateToProps)(TestCreatePage);
