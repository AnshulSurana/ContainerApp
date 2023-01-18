import { REDUX_STATE_STATUS } from '../../constants';
import {
  SET_FLAG,
  SET_FLAG_FAILURE,
  SET_FLAG_STARTED,
  SET_FLAG_SUCCESS
} from '../actions';

const initialState = {
  getFeatureFlagStatus: REDUX_STATE_STATUS.NOT_STARTED
};

export default (state = initialState, { type, flagKey, flagEnabled }) => {
  switch (type) {
    case SET_FLAG:
      return {
        ...state,
        [flagKey]: flagEnabled
      };
    case SET_FLAG_STARTED:
      return {
        ...state,
        getFeatureFlagStatus: REDUX_STATE_STATUS.STARTED
      };
    case SET_FLAG_SUCCESS:
      return {
        ...state,
        getFeatureFlagStatus: REDUX_STATE_STATUS.SUCCESS
      };
    case SET_FLAG_FAILURE:
      return {
        ...state,
        getFeatureFlagStatus: REDUX_STATE_STATUS.FAILURE
      };
    default:
      return state;
  }
};
