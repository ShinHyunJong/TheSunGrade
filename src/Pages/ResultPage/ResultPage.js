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
import * as TestCreator from "../../ActionCreators/TestCreator";
import cx from "classnames";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    result: state.reducer.result
  };
};

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
    const { exam_id, student_name } = this.props.match.params;
    const selectedTitle = this.props.location.state;
    const params = {
      exam_id,
      student_name
    };
    this.props.dispatch(TestCreator.getResult(params));
  }

  render() {
    console.log(this.props);
    const { result } = this.props;
    const halfLength = parseInt(result.length / 2);
    const restLength = result.length - halfLength;
    const { exam_id, student_name } = this.props.match.params;
    const { selectedTitle, grade, school } = this.props.location.state;

    return (
      <div className="resultPage">
        <div className="resultPage__content">
          <h4 className="resultPage__content__title">
            {selectedTitle + " 결과"}
          </h4>
          <div className="resultPage__content__info">
            <p>
              {student_name} 학생 / {grade} 학년 / {school} 학교{" "}
            </p>
          </div>
          <div className="resultPage__content__tableArea">
            <table className="resultPage__content__table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>내용영역</th>
                  <th>행동영역</th>
                  <th>난이도</th>
                  <th>채점</th>
                  <th>정답률</th>
                </tr>
              </thead>
              <tbody>
                {result &&
                  result.slice(0, halfLength).map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="resultPage__content__table__row"
                      >
                        <td>{index + 1}</td>
                        <td>{data.small}</td>
                        <td>{data.activity}</td>
                        <td>{data.level}</td>
                        <td
                          className={cx(
                            "resultPage__content__table__row__right",
                            {
                              resultPage__content__table__row__wrong:
                                data.result === "X"
                            }
                          )}
                        >
                          {data.result}
                        </td>
                        <td>{data.accuracy}%</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot />
            </table>

            <table className="resultPage__content__table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>내용영역</th>
                  <th>행동영역</th>
                  <th>난이도</th>
                  <th>채점</th>
                  <th>정답률</th>
                </tr>
              </thead>
              <tbody>
                {result &&
                  result.slice(halfLength, result.length).map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="resultPage__content__table__row"
                      >
                        <td>{index + halfLength + 1}</td>
                        <td>{data.small}</td>
                        <td>{data.activity}</td>
                        <td>{data.level}</td>
                        <td
                          className={cx(
                            "resultPage__content__table__row__right",
                            {
                              resultPage__content__table__row__wrong:
                                data.result === "X"
                            }
                          )}
                        >
                          {data.result}
                        </td>
                        <td>{data.accuracy}%</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot />
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ResultPage.defaultProps = defaultProps;
ResultPage.propTypes = propTypes;

export default connect(mapStateToProps)(ResultPage);
