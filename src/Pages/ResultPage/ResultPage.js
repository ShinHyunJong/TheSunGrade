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
import TheSunLogo from "../../Assets/Imgs/thesunlogo_down.png";
import RaisedButton from "material-ui/RaisedButton";

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

  handleBack = () => {
    const { exam_id, student_name } = this.props.match.params;
    const params = { student_name, exam_id };
    this.props.dispatch(TestCreator.deleteResult(params)).then(value => {
      this.props.history.goBack();
    });
  };

  render() {
    const { result } = this.props;
    const { activityData, smallData, levelData } = this.state;
    const halfLength = parseInt(result.length / 2);
    const restLength = result.length - halfLength;
    const { exam_id, student_name } = this.props.match.params;
    const { selectedTitle, grade, school } = this.props.location.state;
    const answerLength = result.filter((data, index) => {
      return data.result === "O";
    }).length;

    return (
      <div className="resultPage">
        <div className="resultPage-first">
          <div
            className="resultPage__content"
            ref={el => (this.componentRef = el)}
          >
            <div style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
              <h3 style={{ textAlign: "center", margin: 10 }}>
                {selectedTitle}
              </h3>
            </div>
            <div className="resultPage__content__info">
              <div
                style={{
                  marginBottom: 5,
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <span className="resultPage-icon">
                  <i className="xi-profile-o" />
                </span>
                학생정보
              </div>
              <table style={{ width: "100%" }}>
                <thead style={{ width: "100%" }}>
                  <tr>
                    <th>이름</th>
                    <th>학년</th>
                    <th>학교</th>
                    <th>시험종류</th>
                    <th>정답수/총문항</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{student_name && student_name}</td>
                    <td>{grade && grade}</td>
                    <td>{school && school}</td>
                    <td>입학테스트</td>
                    <td>{`${answerLength}/${result.length}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div
              style={{
                width: "100%",
                marginBottom: 5,
                alignItems: "center",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <span className="resultPage-icon">
                <i className="xi-list" />
              </span>
              평가내용
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

            <div
              style={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <span className="resultPage-icon">
                <i className="xi-list" />
              </span>
              단원별 분석
            </div>
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
                            {Math.floor((data.정답률 / 100) * data.문항수)}
                          </td>
                          <td>{data.정답률}%</td>
                          <td>{data.평균}%</td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot />
              </table>
              <img src={TheSunLogo} style={{ height: 250, width: "auto" }} />
            </div>
          </div>
        </div>
        <div className="resultPage-second">
          <div className="resultPage__content">
            <div className="resultPage__content__table-graph">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                  borderTop: "2px solid #037367",
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottom: "2px solid #037367",
                  alignItems: "center"
                }}
              >
                <span className="resultPage-icon">
                  <i className="xi-chart-bar" />
                </span>
                도표 분석
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10
                }}
              >
                <span className="resultPage-icon">
                  <i className="xi-list" />
                </span>
                단원별 분석
              </div>
              <ComposedChart
                width={800}
                height={350}
                data={this.state.smallData}
              >
                <XAxis dataKey="subject" tick={{ fontSize: 10 }} interval={0} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />

                <Bar
                  type="monotone"
                  dataKey="정답률"
                  fill="#037367"
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 10
                  }}
                >
                  <span className="resultPage-icon">
                    <i className="xi-lightbulb-o" />
                  </span>
                  행동영역별 분석
                </div>
                <div className="resultPage__content__chart__active-border">
                  <RadarChart
                    outerRadius={130}
                    width={500}
                    height={320}
                    margin={{ top: 30 }}
                    data={this.state.activityData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis
                      angle={160}
                      tickCount={5}
                      domain={[0, 100]}
                    />
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
                      stroke="#037367"
                      fill="#037367"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </div>
              </div>
              <div>
                <div className="resultPage__content__chart__level">
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      marginBottom: 10,
                      flexDirection: "row"
                    }}
                  >
                    <span className="resultPage-icon">
                      <i className="xi-trending-up" />
                    </span>
                    난이도별 분석
                  </div>
                  <RadarChart
                    outerRadius={130}
                    width={500}
                    height={320}
                    data={this.state.levelData}
                    margin={{ top: 30 }}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis
                      angle={160}
                      tickCount={5}
                      domain={[0, 100]}
                    />

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
                      stroke="#037367"
                      fill="#037367"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div>
            <p>
              1)
              <span className="resultPage__content__chart-number">
                내용영역
              </span>
              은 단원명입니다.
            </p>
            <p>
              2)
              <span className="resultPage__content__chart-number">채점은 </span>
              <span style={{ color: "#037367", fontWeight: "700" }}>O</span>/
              <span style={{ color: "#ff7300", fontWeight: "700" }}>X</span> 로
              판단하시면 됩니다.
            </p>
            <p>
              3)
              <span className="resultPage__content__chart-number">정답률</span>
              은 같은 시험을 치른 학생들 평균입니다.
            </p>
            <p>
              4)
              <span className="resultPage__content__chart-number">
                단원별 분석 그래프
              </span>
              는{" "}
              <span style={{ color: "#037367", fontWeight: "700" }}>녹색</span>{" "}
              막대그래프가 학생 정답률이며{" "}
              <span style={{ color: "#ff7300", fontWeight: "700" }}>
                주황색
              </span>{" "}
              그래프는 평균 정답률입니다.
            </p>
            <p>
              5)
              <span className="resultPage__content__chart-number">
                행동영역별 분석과 난이도 분석 그래프
              </span>
              는{" "}
              <span style={{ color: "#037367", fontWeight: "700" }}>녹색</span>{" "}
              삼각형이 학생 정답률이며{" "}
              <span style={{ color: "#ff7300", fontWeight: "700" }}>
                주황색
              </span>{" "}
              삼각형은 평균 정답률입니다.
            </p>
          </div>

          <button className="noprint" onClick={() => window.print()}>
            인쇄하기
          </button>
          <br />
          <br />
          <button className="noprint" onClick={this.handleBack}>
            삭제하고 뒤로 돌아가기
          </button>
        </div>
      </div>
    );
  }
}

ResultPage.defaultProps = defaultProps;
ResultPage.propTypes = propTypes;

export default connect(mapStateToProps)(ResultPage);
