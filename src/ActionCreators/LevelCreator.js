import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_LEVEL = "SUCCEED_TO_GET_LEVEL";
export const FAILED_TO_GET_LEVEL = "FAILED_TO_GET_LEVEL";

export const SUCCEED_TO_POST_LEVEL = "SUCCEED_TO_POST_LEVEL";
export const FAILED_TO_POST_LEVEL = "FAILED_TO_POST_LEVEL";

export const SUCCEED_TO_DELETE_LEVEL = "SUCCEED_TO_DELETE_LEVEL";
export const FAILED_TO_DELETE_LEVEL = "FAILED_TO_DELETE_LEVEL";

export const getLevel = () => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/level", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_LEVEL,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_LEVEL,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postLevel = level => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/level", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          level: level
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_LEVEL,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_LEVEL,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const deleteLevel = level => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/level", {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          level: level
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_DELETE_LEVEL,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_DELETE_LEVEL,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
