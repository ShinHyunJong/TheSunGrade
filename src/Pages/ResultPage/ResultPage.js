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
import TheSunLogo from "../../Assets/Imgs/thesunlogo_cross.png";
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
import { fade } from "material-ui/utils/colorManipulator";

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
    this.state = {
      smallData: [],
      activityData: [],
      levelData: []
    };
  }

  componentDidMount() {
    const { exam_id, student_name } = this.props.match.params;
    const selectedTitle = this.props.location.state;
    const params = {
      exam_id,
      student_name
    };
    this.props.dispatch(TestCreator.getResult(params)).then(value => {
      this.props.dispatch(TestCreator.getResultSmall(params)).then(small => {
        this.props
          .dispatch(TestCreator.getResultActivity(params))
          .then(activity => {
            this.props
              .dispatch(TestCreator.getResultLevel(params))
              .then(level => {
                for (let i = 0; i < small.length; i++) {
                  small[i].정답률 = Number(small[i].정답률);
                  small[i].평균 = Number(small[i].평균);
                }
                for (let i = 0; i < activity.length; i++) {
                  activity[i].정답률 = Number(activity[i].정답률);
                  activity[i].평균 = Number(activity[i].평균);
                }
                for (let i = 0; i < level.length; i++) {
                  level[i].정답률 = Number(level[i].정답률);
                  level[i].평균 = Number(level[i].평균);
                }
                this.setState({
                  smallData: small,
                  activityData: activity,
                  levelData: level
                });
              });
          });
      });
    });
  }

  render() {
    const { result } = this.props;
    const { activityData, smallData, levelData } = this.state;
    const halfLength = parseInt(result.length / 2);
    const restLength = result.length - halfLength;
    const { exam_id, student_name } = this.props.match.params;
    const { selectedTitle, grade, school } = this.props.location.state;

    return (
      <div className="resultPage">
        <div className="resultPage-first">
          <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
            <img src={TheSunLogo} width={150} />
          </div>
          <div
            className="resultPage__content"
            ref={el => (this.componentRef = el)}
          >
            <div className="resultPage__content__info">
              <p>
                {student_name && student_name} 학생 / {grade && grade} 학년 /{" "}
                {school && school} 학교
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
                          <td>{data.content}</td>
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
                    result
                      .slice(halfLength, result.length)
                      .map((data, index) => {
                        return (
                          <tr
                            key={index}
                            className="resultPage__content__table__row"
                          >
                            <td>{index + halfLength + 1}</td>
                            <td>{data.content}</td>
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
            <br />
            <br />
            <p>단원별 분석</p>
            <div className="resultPage__content__table-small">
              <table className="resultPage__content__table">
                <thead>
                  <tr>
                    <th>단원명</th>
                    <th>문항수</th>
                    <th>정답수</th>
                    <th>정답률</th>
                    <th>평균 정답률</th>
                  </tr>
                </thead>
                <tbody>
                  {smallData &&
                    smallData.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className="resultPage__content__table__row"
                        >
                          <td>{data.subject}</td>
                          <td>{data.문항수}</td>
                          <td>
                            {Math.ceil((data.정답률 / 100) * data.문항수)}
                          </td>
                          <td>{data.정답률}%</td>
                          <td>{data.평균}%</td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot />
              </table>
            </div>
          </div>
        </div>
        <div className="resultPage-second">
          <div className="resultPage__content__table-graph">
            <p style={{ textAlign: "center" }}>단원별 분석(도표)</p>
            <ComposedChart width={800} height={350} data={this.state.smallData}>
              <XAxis dataKey="subject" tick={{ fontSize: 10 }} interval={0} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />

              <Bar
                type="monotone"
                dataKey="정답률"
                fill="#709fb0"
                barSize={40}
                label={{ fontSize: 10, fill: "#ffffff" }}
              />
              <Line
                type="monotone"
                dataKey="평균"
                fill="#ffffff"
                stroke="#ff7300"
              />
            </ComposedChart>
          </div>

          <div className="resultPage__content__chart">
            <div className="resultPage__content__chart__active">
              <p>행동영역별 분석</p>

              <RadarChart
                outerRadius={90}
                width={450}
                height={290}
                data={this.state.activityData}
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
                  height={290}
                  data={this.state.levelData}
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
          <button className="noprint" onClick={() => window.print()}>
            인쇄하기
          </button>
        </div>
      </div>
    );
  }
}

ResultPage.defaultProps = defaultProps;
ResultPage.propTypes = propTypes;

export default connect(mapStateToProps)(ResultPage);
