// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import gradeJson from "../../Json/grade";
import { NavBar } from "../../Components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ImageNavigateNext from "material-ui/svg-icons/image/navigate-next";
import { Link } from "react-router-dom";

import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";
import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { Container, Row, Col } from "reactstrap";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};
const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  },
  label: {
    width: 70
  }
};
const styleAdd = {
  position: "absolute",
  right: 300,
  bottom: 100
};

class LabelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSchool: 0,
      selectedGrade: 0,
      selectedSemester: 0
    };
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  handleSchool = index => {
    this.setState({
      selectedSchool: index,
      selectedGrade: 0
    });
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

  render() {
    const grade = gradeJson.data;

    return (
      <div className="labelPage">
        <NavBar title="교과과정 선택" />
        <Container>
          <Row className="labelPage__content">
            <Col className="labelPage__content__section">
              <h2 className="labelPage__content__section__title">학교선택</h2>
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
            <Col className="labelPage__content__section">
              <h2 className="labelPage__content__section__title">학년선택</h2>
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
            <Col className="labelPage__content__section">
              <h2 className="labelPage__content__section__title">학기선택</h2>
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
            <Link
              to={{
                pathname: "/category/label/big",
                params: {
                  school: grade[this.state.selectedSchool].school,
                  grade:
                    grade[this.state.selectedSchool].grade[
                      this.state.selectedGrade
                    ].year,
                  semester:
                    grade[this.state.selectedSchool].grade[
                      this.state.selectedGrade
                    ].semester[this.state.selectedSemester]
                }
              }}
              onClick={this.handleNext}
            >
              <FloatingActionButton style={styleAdd}>
                <ImageNavigateNext />
              </FloatingActionButton>
            </Link>
          </Row>
        </Container>
      </div>
    );
  }
}

LabelPage.defaultProps = defaultProps;
LabelPage.propTypes = propTypes;

export default connect(mapStateToProps)(LabelPage);
