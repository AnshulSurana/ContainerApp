import {
  FETCH_MEMO_DETAILS_SUCCESS,
  FETCH_MEMO_DETAILS_FAILURE,
  FETCHING_MEMO_DETAILS
} from '../actions';

const initialState = {
  creditMemo: {},
  loadingDetails: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MEMO_DETAILS_SUCCESS:
      return {
        ...state,
        creditMemo: payload
      };
    case FETCH_MEMO_DETAILS_FAILURE:
      return {
        ...state.creditMemo,
        ...payload
      };
    case FETCHING_MEMO_DETAILS:
      return {
        ...state,
        loadingDetails: payload
      };
    default:
      return state;
  }
};
