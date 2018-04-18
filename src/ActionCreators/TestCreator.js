import { ServerEndPoint } from "../Configs/Server";
export const SUCCEED_TO_GET_TEST = "SUCCEED_TO_GET_TEST";
export const FAILED_TO_GET_TEST = "FAILED_TO_GET_TEST";

export const SUCCEED_TO_GET_TEST_ONE = "SUCCEED_TO_GET_TEST_ONE";
export const FAILED_TO_GET_TEST_ONE = "FAILED_TO_GET_TEST_ONE";

export const SUCCEED_TO_POST_TEST = "SUCCEED_TO_POST_TEST";
export const FAILED_TO_POST_TEST = "FAILED_TO_POST_TEST";

export const SUCCEED_TO_GET_PROBLEM = "SUCCEED_TO_GET_PROBLEM";
export const FAILED_TO_GET_PROBLEM = "FAILED_TO_GET_PROBLEM";

export const SUCCEED_TO_POST_PROBLEM = "SUCCEED_TO_POST_PROBLEM";
export const FAILED_TO_POST_PROBLEM = "FAILED_TO_POST_PROBLEM";

export const SUCCEED_TO_UPDATE_PROBLEM = "SUCCEED_TO_UPDATE_PROBLEM";
export const FAILED_TO_UPDATE_PROBLEM = "FAILED_TO_UPDATE_PROBLEM";

export const SUCCEED_TO_POST_GRADE = "SUCCEED_TO_POST_GRADE";
export const FAILED_TO_POST_GRADE = "FAILED_TO_POST_GRADE";

export const SUCCEED_TO_GET_RESULT = "SUCCEED_TO_GET_RESULT";
export const FAILED_TO_GET_RESULT = "FAILED_TO_POST_RESULT";

export const getProblem = exam_id => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint + "api/exam/problem/" + exam_id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_PROBLEM,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_PROBLEM,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getTest = exam_id => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam/" + exam_id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_TEST_ONE,
        payload: responseJson.result
      });
      return responseJson.result[0];
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_TEST_ONE,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

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
export const postTest = (
  title,
  school,
  school_index,
  grade,
  grade_index,
  semester,
  semester_index,
  question_num,
  writer
) => {
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
          school_index: school_index,
          grade: grade,
          grade_index: grade_index,
          semester: semester,
          semester_index: semester_index,
          question_num: question_num,
          writer: writer
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
  big,
  big_index,
  small,
  small_index,
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
          big: big,
          big_index: big_index,
          small: small,
          small_index: small_index,
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

export const updateProblem = (
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
) => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam/problem", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          problem_num: problem_num,
          big: big,
          big_index: big_index,
          small: small,
          small_index: small_index,
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
        type: SUCCEED_TO_UPDATE_PROBLEM,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_UPDATE_PROBLEM,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postGrade = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/exam/result", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: params.name,
          grade: params.grade,
          school: params.school,
          selectedId: params.selectedId,
          selected: params.numberString
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_GRADE,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_GRADE,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const getResult = params => {
  return async dispatch => {
    try {
      let response = await fetch(
        ServerEndPoint +
          `api/exam/result?exam_id=${params.exam_id}&student_name=${
            params.student_name
          }`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_RESULT,
        payload: responseJson.result
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_RESULT,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
