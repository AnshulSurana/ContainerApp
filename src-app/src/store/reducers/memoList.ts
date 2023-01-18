import {
  FETCH_MEMO_LIST_SUCCESS,
  FETCH_MEMO_LIST_FAILURE,
  FETCH_MEMO_LIST,
  FETCH_UPDATED_CURRENT_PAGE
} from '../actions';
import {
  CREDITMEMO_STATUS,
  CREDITMEMO_TABLE_COLUMNS,
  SCOPE,
  SORT_TYPE
} from '../../constants';

const initialState = {
  creditMemos: [],
  currentCreditMemoCount: 0,
  pageInfo: {},
  currentPageNo: 1,
  tableFiltersRedux: {
    creditMemoStatus: CREDITMEMO_STATUS.ALL,
    creditMemoDate: null,
    searchText: '',
    scope: SCOPE,
    tenant: null,
    locale: 'en'
  },
  orderByRedux: [
    {
      field: CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.sortField,
      direction: SORT_TYPE.DESC
    }
  ]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MEMO_LIST_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case FETCH_MEMO_LIST_FAILURE:
      return {
        ...state,
        ...payload
      };
    case FETCH_MEMO_LIST:
      return {
        ...state,
        ...payload
      };
    // remove this
    case FETCH_UPDATED_CURRENT_PAGE:
      return {
        ...state,
        ...payload
      };
    // remove this
    case FETCH_UPDATED_CURRENT_PAGE:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
