import reducer from '../../../store/reducers/memo';
import {
  FETCH_MEMO_DETAILS_SUCCESS,
  FETCH_MEMO_DETAILS_FAILURE,
  FETCHING_MEMO_DETAILS
} from '../../../store/actions';

describe('Memo Details reducer', () => {
  const initialState = {
    creditMemo: {},
    loadingDetails: false
  };

  it('Should return the initial state', () => {
    expect(reducer(initialState, { type: 'any', payload: {} })).toEqual(
      initialState
    );
  });

  it('Should handle Memo Details actions', () => {
    const action = {
      type: FETCH_MEMO_DETAILS_SUCCESS,
      payload: { something: 'something' }
    };
    expect(reducer(initialState, action)).toEqual({
      creditMemo: { something: 'something' }
    });

    const actionStarted = {
      type: FETCH_MEMO_DETAILS_FAILURE,
      payload: { failed: 'failed' }
    };
    expect(reducer(initialState, actionStarted)).toEqual({
      failed: 'failed'
    });

    const actionFailure = {
      type: FETCHING_MEMO_DETAILS,
      payload: { something: 'something' }
    };
    expect(reducer(initialState, actionFailure)).toEqual({
      creditMemo: {},
      loadingDetails: { something: 'something' }
    });
  });
});
