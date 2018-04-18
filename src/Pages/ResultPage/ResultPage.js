// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import ReactDOM from "react-dom";
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
import ReactToPrint from "react-to-print";
import {
  LineChart,
  BarChart,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";

const defaultProps = {};
const propTypes = {};

const data = [
  { name: "정수와 유리수(1상)", 정답률: 70, 평균: 80.5 },
  { name: "문자와 식(1상)", 정답률: 60, 평균: 64 },
  { name: "자연수(1상)", 정답률: 65, 평균: 50 },
  { name: "일차방정식(1상)", 정답률: 55, 평균: 70 },
  { name: "좌표평면과 그래프(1상)", 정답률: 55, 평균: 40 },
  { name: "식의 계산(2상)", 정답률: 55, 평균: 70 },
  { name: "부등식(2상)", 정답률: 85, 평균: 60 },
  { name: "연립방정식(2상)", 정답률: 55, 평균: 70 },
  { name: "일차함수", 정답률: 45, 평균: 10 },
  { name: "유리수와 순환소수", 정답률: 55, 평균: 70 }
];

const data2 = [
  { subject: "이해", 정답률: 90, 평균: 70 },
  { subject: "계산", 정답률: 20, 평균: 50 },
  { subject: "외적연관", 정답률: 55, 평균: 80 }
];

const data3 = [
  { subject: "개념", 정답률: 90, 평균: 70 },
  { subject: "응용", 정답률: 20, 평균: 50 },
  { subject: "심화", 정답률: 55, 평균: 80 }
];

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
    const { result } = this.props;
    const halfLength = parseInt(result.length / 2);
    const restLength = result.length - halfLength;
    const { exam_id, student_name } = this.props.match.params;
    const { selectedTitle, grade, school } = this.props.location.state;

    return (
      <div className="resultPage">
        <div
          className="resultPage__content"
          ref={el => (this.componentRef = el)}
        >
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
          <br />
          <p>단원별 분석</p>
          <ComposedChart width={900} height={300} data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Text width={10} />
            <Legend />

            <Bar
              type="monotone"
              dataKey="정답률"
              fill="#709fb0"
              label={{ fontSize: 10, color: "#ffffff" }}
            />
            <Line
              type="monotone"
              dataKey="평균"
              fill="#ffffff"
              stroke="#ff7300"
            />
          </ComposedChart>
          <br />
          <div className="resultPage__content__chart">
            <div className="resultPage__content__chart__active">
              <p>행동영역별 분석</p>

              <RadarChart
                outerRadius={90}
                width={450}
                height={250}
                data={data2}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} tickCount={5} domain={[0, 100]} />
                <Radar
                  name="평균"
                  dataKey="평균"
                  stroke="#ff7300"
                  fill="#ff7300"
                  fillOpacity={0.6}
                />
                <Radar
                  name="정답률"
                  dataKey="정답률"
                  stroke="#709fb0"
                  fill="#709fb0"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </div>
            <div>
              <div className="resultPage__content__chart__level">
                <p>난이도별 분석</p>
                <RadarChart
                  outerRadius={90}
                  width={450}
                  height={250}
                  data={data3}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} tickCount={5} domain={[0, 100]} />

                  <Radar
                    name="평균"
                    dataKey="평균"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="정답률"
                    dataKey="정답률"
                    stroke="#709fb0"
                    fill="#709fb0"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </div>
            </div>
          </div>
          <button onClick={() => window.print()}>인쇄하기</button>
        </div>
      </div>
    );
  }
}

ResultPage.defaultProps = defaultProps;
ResultPage.propTypes = propTypes;

export default connect(mapStateToProps)(ResultPage);
