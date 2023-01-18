import {
  FETCHING_TRANSLATIONS,
  FETCHING_TRANSLATIONS_FAILURE,
  FETCHING_TRANSLATIONS_SUCCESS
} from '../actions';

const initialState = {
  locale: 'en-US',
  tenant: '-place-',
  namespace: 'credit-memo-ui',
  translations: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_TRANSLATIONS:
      return {
        ...state,
        tenant: payload.tenant,
        locale: payload.locale
      };
    case FETCHING_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        translations: { ...state.translations, ...payload }
      };
    case FETCHING_TRANSLATIONS_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
