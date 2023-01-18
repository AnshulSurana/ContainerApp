import isEmpty from 'lodash';
import { CREDITMEMO_TABLE_COLUMNS, SORT_TYPE } from '../constants';
import { CreditMemoData } from '../store/Types/creditMemo.types';

export const saveCreditMemoSessionData = (creditMemoData) => {
  sessionStorage.setItem('creditMemoData', JSON.stringify(creditMemoData));
};

export const getCreditMemoSessionData = () => {
  const creditMemoData: string | null =
    sessionStorage.getItem('creditMemoData');
  let parsedCreditMemo: CreditMemoData = {
    tableFilters: {
      showFilter: false,
      fromDate: null,
      toDate: null,
      status: null,
      name: ''
    },
    orderBy: [
      {
        field: CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.sortField,
        direction: SORT_TYPE.DESC
      }
    ],
    isRedirectedFromDetailsPage: false,
    currentPage: 1,
    totalCreditMemoCount: 0,
    pageInfo: {},
    deletedCreditMemo: ''
  };
  if (creditMemoData !== 'null') {
    if (typeof creditMemoData === 'string') {
      parsedCreditMemo = JSON.parse(creditMemoData);
    } // ok
  }
  return parsedCreditMemo;
};

export const setStoredPageInfo = (pageInfo) => {
  const creditMemoData = getCreditMemoSessionData();
  creditMemoData.pageInfo = pageInfo;
  saveCreditMemoSessionData(creditMemoData);
};

export const setStoredCreditMemoCount = (count) => {
  const creditMemoData = getCreditMemoSessionData();
  creditMemoData.totalCreditMemoCount = count;
  saveCreditMemoSessionData(creditMemoData);
};

export const setStoredCurrentPage = (page) => {
  const creditMemoData = getCreditMemoSessionData();
  creditMemoData.currentPage = page;
  saveCreditMemoSessionData(creditMemoData);
};

export const isRedirectedFromDetailsPage = () => {
  const creditMemoData: CreditMemoData = getCreditMemoSessionData();
  return creditMemoData.isRedirectedFromDetailsPage;
};

export const setRedirectFromDetailsPage = (isRedirected) => {
  const creditMemoData: CreditMemoData = getCreditMemoSessionData();
  creditMemoData.isRedirectedFromDetailsPage = isRedirected;
  saveCreditMemoSessionData(creditMemoData);
};

export const getStoredTableFilters = () => {
  const creditMemoData: CreditMemoData = getCreditMemoSessionData();
  return creditMemoData.tableFilters;
};

export const updateStoredTableFilters = (filter) => {
  const creditMemoData: CreditMemoData = getCreditMemoSessionData();
  let { tableFilters } = creditMemoData;

  if (isEmpty(tableFilters)) {
    tableFilters = {};
  }

  tableFilters = { ...tableFilters, ...filter };
  creditMemoData.tableFilters = tableFilters;
  saveCreditMemoSessionData(creditMemoData);
};

export const getStoredTableOrder = () => {
  const creditMemoData = getCreditMemoSessionData();
  return creditMemoData.orderBy;
};

export const setStoredTableOrder = (orderBy) => {
  const creditMemoData = getCreditMemoSessionData();
  creditMemoData.orderBy = orderBy;
  saveCreditMemoSessionData(creditMemoData);
};

export const isFilterApplied = ({ name, status, fromDate, toDate }) =>
  !isEmpty(name) || !isEmpty(status) || !isEmpty(fromDate) || !isEmpty(toDate);

export const resetCreditMemoSessionData = () => {
  const creditMemoData = {
    tableFilters: {
      showFilter: false,
      fromDate: null,
      toDate: null,
      status: null,
      name: ''
    },
    orderBy: [
      {
        field: CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.sortField,
        direction: SORT_TYPE.DESC
      }
    ],
    isRedirectedFromDetailsPage: false,
    currentPage: 1,
    totalCreditMemoCount: 0,
    pageInfo: {},
    deletedCreditMemo: ''
  };
  saveCreditMemoSessionData(creditMemoData);
};
