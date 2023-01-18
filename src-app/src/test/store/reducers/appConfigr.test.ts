import reducer from '../../../store/reducers/appConfigr';
import {
  SET_FLAG,
  SET_FLAG_FAILURE,
  SET_FLAG_STARTED,
  SET_FLAG_SUCCESS
} from '../../../store/actions';
import { REDUX_STATE_STATUS } from '../../../constants';

describe('AppConfigr reducer', () => {
  const initialState = {
    getFeatureFlagStatus: REDUX_STATE_STATUS.NOT_STARTED
  };

  it('Should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('Should handle SET_FLAG', () => {
    const action = {
      type: SET_FLAG,
      flagKey: 'a_flag_name',
      flagEnabled: true
    };
    expect(reducer({}, action)).toEqual({
      a_flag_name: true
    });

    const actionStarted = {
      type: SET_FLAG_STARTED,
      getFeatureFlagStatus: REDUX_STATE_STATUS.STARTED
    };
    expect(reducer({}, actionStarted)).toEqual({
      getFeatureFlagStatus: REDUX_STATE_STATUS.STARTED
    });

    const actionSuccess = {
      type: SET_FLAG_SUCCESS,
      getFeatureFlagStatus: REDUX_STATE_STATUS.SUCCESS
    };
    expect(reducer({}, actionSuccess)).toEqual({
      getFeatureFlagStatus: REDUX_STATE_STATUS.SUCCESS
    });

    const actionFailure = {
      type: SET_FLAG_FAILURE,
      getFeatureFlagStatus: REDUX_STATE_STATUS.FAILURE
    };
    expect(reducer({}, actionFailure)).toEqual({
      getFeatureFlagStatus: REDUX_STATE_STATUS.FAILURE
    });
  });
});
