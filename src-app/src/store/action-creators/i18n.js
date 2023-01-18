import { checkStatus, createOptions, parseJSON } from '../../utils/fetchHelper';
import {
  FETCHING_TRANSLATIONS,
  FETCHING_TRANSLATIONS_FAILURE,
  FETCHING_TRANSLATIONS_SUCCESS
} from '../actions';

const fetchTranslations = (bootstrap) => async (dispatch) => {
  const { locale } = bootstrap;
  const tenant = bootstrap.CHANNEL_SETTINGS.partner.toUpperCase();
  const namespace = 'credit-memo-ui';
  const i18n = { locale, tenant, namespace };
  dispatch({ type: FETCHING_TRANSLATIONS, payload: i18n });
  const options = createOptions('GET');
  fetch(
    `/api/v1/translation/${tenant}/${locale}?namespace=${namespace}`,
    options
  )
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: FETCHING_TRANSLATIONS_SUCCESS,
        payload: data
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCHING_TRANSLATIONS_FAILURE,
        payload: error
      });
    });
};

export default fetchTranslations;
