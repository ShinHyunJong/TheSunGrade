import { ServerEndPoint } from "../Configs/Server";

export const SUCCEED_TO_GET_ACTIVITY = "SUCCEED_TO_GET_ACTIVITY";
export const FAILED_TO_GET_ACTIVITY = "FAILED_TO_GET_ACTIVITY";

export const SUCCEED_TO_POST_ACTIVITY = "SUCCEED_TO_POST_ACTIVITY";
export const FAILED_TO_POST_ACTIVITY = "FAILED_TO_POST_ACTIVITY";

export const SUCCEED_TO_DELETE_ACTIVITY = "SUCCEED_TO_DELETE_ACTIVITY";
export const FAILED_TO_DELETE_ACTIVITY = "FAILED_TO_DELETE_ACTIVITY";

export const getActivity = () => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/activity", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_GET_ACTIVITY,
        payload: responseJson.result
      });
      return responseJson.result;
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_ACTIVITY,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const postActivity = activity => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/activity", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          activity: activity
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_POST_ACTIVITY,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_ACTIVITY,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const deleteActivity = activity => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/category/activity", {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          activity: activity
        })
      });
      let responseJson = await response.json();
      console.log(responseJson);
      await dispatch({
        type: SUCCEED_TO_DELETE_ACTIVITY,
        payload: responseJson
      });
      return responseJson;
    } catch (error) {
      dispatch({
        type: FAILED_TO_DELETE_ACTIVITY,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};
