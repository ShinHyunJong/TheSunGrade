import { ServerEndPoint } from "../Configs/Server";
export const SUCCEED_TO_GET_TEST = "SUCCEED_TO_GET_TEST";
export const FAILED_TO_GET_TEST = "FAILED_TO_GET_TEST";

export const SUCCEED_TO_POST_TEST = "SUCCEED_TO_POST_TEST";
export const FAILED_TO_POST_TEST = "FAILED_TO_POST_TEST";

export const SUCCEED_TO_POST_PROBLEM = "SUCCEED_TO_POST_PROBLEM";
export const FAILED_TO_POST_PROBLEM = "FAILED_TO_POST_PROBLEM";

export const getTests = () => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_TEST,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_TEST,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
export const postTest = (title, school, grade, semester, question_num) => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          school: school,
          grade: grade,
          semester: semester,
          question_num: question_num
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_TEST,
        payload: responseJson.insert_id
      });
      return responseJson.insert_id;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_TEST,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postProblem = (
  problem_num,
  small,
  activity,
  level,
  exam_id,
  content,
  accuracy
) => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam/problem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problem_num: problem_num,
          small: small,
          activity: activity,
          level: level,
          exam_id: exam_id,
          content: content,
          accuracy: accuracy
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_PROBLEM,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_PROBLEM,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
