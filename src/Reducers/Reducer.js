/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@mgail.com
*/

import { combineReducers } from "redux";

import DefaultAction from "../Actions/DefaultAction";
import {
  SUCCEED_TO_GET_ACTIVITY,
  FAILED_TO_GET_ACTIVITY
} from "../ActionCreators/ActivityCreator";
import {
  SUCCEED_TO_GET_TEST,
  SUCCEED_TO_POST_TEST,
  SUCCEED_TO_GET_TEST_ONE,
  SUCCEED_TO_POST_GRADE,
  SUCCEED_TO_GET_RESULT
} from "../ActionCreators/TestCreator";

import { SUCCEED_TO_GET_LEVEL } from "../ActionCreators/LevelCreator";

const initialState = {
  data: null,
  activity: null,
  level: null,
  tests: null,
  test: null,
  test_one: null,
  grade: [],
  result: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DefaultAction.SUCCEED_TO_DEFAULT_ACTION:
      return Object.assign({}, state, {
        data: action.data
      });
    case SUCCEED_TO_GET_ACTIVITY:
      return Object.assign({}, state, {
        activity: action.payload
      });
    case SUCCEED_TO_GET_LEVEL:
      return Object.assign({}, state, {
        level: action.payload
      });
    case SUCCEED_TO_GET_TEST:
      return Object.assign({}, state, {
        tests: action.payload
      });
    case SUCCEED_TO_GET_TEST_ONE:
      return Object.assign({}, state, {
        test_one: action.payload
      });
    case SUCCEED_TO_POST_TEST:
      return Object.assign({}, state, {
        test: action.payload
      });
    case SUCCEED_TO_POST_GRADE:
      return Object.assign({}, state, {
        grade: action.payload
      });
    case SUCCEED_TO_GET_RESULT:
      return Object.assign({}, state, {
        result: action.payload
      });

    default:
      return state;
  }
};

const Reducer = combineReducers({ reducer });
export default Reducer;
