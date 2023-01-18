export const CREDITMEMO_TABLE_COLUMNS = {
  CREDIT_MEMO_ID: { key: 'creditMemoNumber', sortField: 'CREDIT_MEMO_NUMBER' },
  CREATION_DATE: { key: 'creditMemoCreationDate', sortField: 'CREATION_DATE' },
  CUSTOMER: { key: 'customer', sortField: 'CUSTOMER' },
  TOTAL_CREDIT: { key: 'total', sortField: 'TOTAL' },
  STATUS: { key: 'status', sortField: 'STATUS' }
};

export const CREDITMEMO_STATUS = {
  ALL: 'All',
  UNAPPLIED: 'UNAPPLIED',
  APPLIED: 'APPLIED',
  PARTIALLY_APPLIED: 'PARTIALLY_APPLIED',
  VOID: 'VOID',
  DRAFT: 'DRAFT'
};

export const SORT_TYPE = {
  ASC: 'ASC',
  DESC: 'DESC'
};

export const REDUX_STATE_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};

export const END_POINTS = {
  APPCONFIGR: '/api/appconfigr/v1/evaluation/',
  // GQL_URL: '/api/graphql',
  GQL_PREVIEW_URL: '/api/graphql/preview'
};

export const CREDITMEMO_ERROR = {
  SESSION_TIMEOUT: 'SessionTimeoutError'
};
export const CREDITMEMO_PAGE_SIZE = 1;
export const CUSTOMER_CREDIT_MEMO_URL = '/credit-memo';
export const CREDITMEMO_TABLE_DEFAULT_SORT =
  CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.sortField;
export const CREDIT_MEMO_URL = '/channel/marketplace/credit-memo';

export const DATE_FORMAT = 'MMM DD, YYYY';

export const SCOPE = 'MARKETPLACE';

export const FILTER_DATE_FORMAT = 'YYYY-MM-DD';
