import React from 'react';
import { t } from 'fe-tools';
import moment from 'moment';
import { isArray, isEmpty } from 'lodash';
import { replaceRedirectToLoginPage } from 'fe-tools/lib/utils/redirectToLoginPage';

import Date from 'ad-react-components/lib/i18n/Date';
import Number from 'ad-react-components/lib/i18n/Number';
import Percent from 'ad-react-components/lib/i18n/Percent';
import Currency from 'ad-react-components/lib/i18n/Currency';

import {
  CREDITMEMO_ERROR,
  CREDITMEMO_STATUS,
  CREDITMEMO_TABLE_COLUMNS,
  SORT_TYPE
} from '../constants';
import { StatusBadge } from '../components/CreditMemoListing/CreditMemoTable/tableStyles';

export const formatDate = (date, locale, formats = {}) => (
  <Date date={moment(date).toDate()} locale={locale} formats={formats} />
);

export const formatCurrency = (
  amount,
  currency,
  locale,
  formats = { currencyFormat: {} }
) => (
  <Currency
    currency={currency}
    formats={formats}
    number={amount}
    locale={locale}
  />
);

export const formatNumber = (number, locale, formats = {}) => (
  <Number number={number} locale={locale} formats={formats} />
);

export const formatPercentage = (number, locale, formats = {}) => (
  <Percent number={number} locale={locale} formats={formats} />
);

export const formatDateWithFormat = (date, format) => {
  return moment(date).format(format);
};
export const getSortFieldForColumn = (columnName) => {
  const columnDefinition = Object.values(CREDITMEMO_TABLE_COLUMNS).find(
    (value) => value.key === columnName
  );
  return columnDefinition ? columnDefinition.sortField : 'CREATED_DATE';
};
export const getSortFieldDirection = (sortAscending) =>
  sortAscending ? SORT_TYPE.ASC : SORT_TYPE.DESC;

export const checkApiError = (err: any, type) => {
  const apiErrors: String[] = [];

  if (isEmpty(err)) {
    return apiErrors;
  }

  if (isArray(err)) {
    err.forEach((error: { extensions: { code; message } }) => {
      if (error.extensions.code === 'DOWNSTREAM_SERVICE_ERROR') {
        replaceRedirectToLoginPage();
        apiErrors.push(CREDITMEMO_ERROR.SESSION_TIMEOUT);
      }
      if (error.extensions.code === 'INTERNAL_SERVER_ERROR') {
        const regex = '/^.*Unauthorized$g';
        if (regex.match(error.extensions.message)) {
          replaceRedirectToLoginPage();
          apiErrors.push(CREDITMEMO_ERROR.SESSION_TIMEOUT);
        } else {
          apiErrors.push(type);
        }
      } else {
        apiErrors.push(error.extensions.code);
      }
    });
  } else if (err.networkError && err.networkError.statusCode === 401) {
    replaceRedirectToLoginPage();
    apiErrors.push(CREDITMEMO_ERROR.SESSION_TIMEOUT);
  } else {
    apiErrors.push(type);
  }

  return apiErrors;
};

export const getErrorTypesFromError = (errors) =>
  errors.reduce((oldVal, currentVal) => [...oldVal, currentVal.typename], []);

export const getStatus = (status) => {
  const label = CREDITMEMO_STATUS[status.toUpperCase()];
  const translation = `credit.memo.table.status.${label.toLowerCase()}`;
  return t(translation).toUpperCase();
};

export const getBadgeType = (status) => {
  if (status === CREDITMEMO_STATUS.APPLIED) {
    return 'success';
  }
  if (status === CREDITMEMO_STATUS.UNAPPLIED) {
    return 'error';
  }
  if (status === CREDITMEMO_STATUS.PARTIALLY_APPLIED) {
    return 'pending';
  }
  if (status === CREDITMEMO_STATUS.VOID) {
    return '';
  }

  return '';
};

export const getBadge = (type, label) => {
  const xlation = `credit.memo.table.status.${label.toLowerCase()}`;
  return (
    <StatusBadge outline type={type}>
      {t(xlation).toUpperCase()}
    </StatusBadge>
  );
};

export const getStatusBadge = (status) => {
  if (status === CREDITMEMO_STATUS.APPLIED) {
    return getBadge(
      getBadgeType(CREDITMEMO_STATUS.APPLIED),
      CREDITMEMO_STATUS.APPLIED
    );
  }
  if (status === CREDITMEMO_STATUS.UNAPPLIED) {
    return getBadge(
      getBadgeType(CREDITMEMO_STATUS.UNAPPLIED),
      CREDITMEMO_STATUS.UNAPPLIED
    );
  }
  if (status === CREDITMEMO_STATUS.PARTIALLY_APPLIED) {
    return getBadge(
      getBadgeType(CREDITMEMO_STATUS.PARTIALLY_APPLIED),
      CREDITMEMO_STATUS.PARTIALLY_APPLIED
    );
  }
  if (status === CREDITMEMO_STATUS.VOID) {
    return getBadge(
      getBadgeType(CREDITMEMO_STATUS.VOID),
      CREDITMEMO_STATUS.VOID
    );
  }

  return getBadge(getBadgeType(''), CREDITMEMO_STATUS.DRAFT);
};
