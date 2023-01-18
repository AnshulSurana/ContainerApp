import { combineReducers } from 'redux';
import appConfigr from './appConfigr';
import memoList from './memoList';
import memo from './memo';
import i18n from './i18n';

const rootReducer = combineReducers({
  appConfigr,
  memoList,
  memo,
  i18n
});

export default rootReducer;
