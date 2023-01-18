import React, { FC, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { t, use-place-Context } from 'fe-tools';
import { Bootstrap } from 'fe-tools/lib/providers/types';
import TableFilters, {
  FiltersContent
} from 'ad-react-components/lib/Table/TableFilters';
import Button from 'ad-react-components/lib/Button/Button';
import Toolbar from 'ad-react-components/lib/Toolbar';
import TableHeader from 'ad-react-components/lib/Table/TableHeader';

import { useQuery, UseQueryResult } from 'react-query';
import { sleep } from 'react-query/types/core/utils';
import { wait } from '@testing-library/user-event/dist/utils';
import request from 'graphql-request';
import { userInfo } from 'os';
import {
  CREDITMEMO_TABLE_COLUMNS,
  CREDITMEMO_PAGE_SIZE,
  CREDIT_MEMO_URL,
  CREDITMEMO_STATUS,
  SCOPE,
  FILTER_DATE_FORMAT,
  SORT_TYPE
} from '../../../constants';
import { FETCH_MEMO_LIST_SUCCESS } from '../../../store/actions';
import {
  Container,
  StyledTable,
  Ellipses,
  TooltipContainer,
  StyledLink,
  TableHeaderLabel,
  FilterRow,
  StatusLabel,
  DateRangeField,
  StatusDropdown
} from './tableStyles';

import {
  CreditMemo,
  FILTERS,
  PageInfo
} from '../../../store/Types/creditMemo.types';

import {
  getStatusBadge,
  getSortFieldDirection,
  formatDateWithFormat,
  getSortFieldForColumn
} from '../../../utils';
import {
  setStoredCurrentPage,
  setStoredPageInfo,
  updateStoredTableFilters,
  isRedirectedFromDetailsPage,
  getCreditMemoSessionData,
  setRedirectFromDetailsPage,
  resetCreditMemoSessionData,
  isFilterApplied,
  setStoredTableOrder,
  setStoredCreditMemoCount
} from '../../../utils/sessionUtil';
import fetchPaginatedCreditMemos, {
  graphQLEndpoint
} from '../../../hook/fetchPaginatedCreditMemos';
import AlertBox from '../../Common/AlertBox';
import listing from '../../../store/mocks/creditMemoListing';
import getAllCreditMemoGQL from '../../../graphQL/queries/creditMemo';

interface CreditMemoTableProps {
  currentCreditMemoCount: number;
  creditMemos: Array<CreditMemo>;
  pageInfo: PageInfo;
}

export interface CreditMemoData {
  creditMemos: {
    nodes: [CreditMemo] | [];
    totalCount: number;
    pageInfo: PageInfo;
  };
}

export interface TableFilters1 {
  showFilter: Boolean;
  fromDate: null;
  toDate: null;
  status: string;
  name: string;
}

const NameTooltip = (props) => {
  const contentStyle = {
    ...props.contentStyle
  };

  const containerStyle = {
    maxWidth: '210px',
    ...props.containerStyle
  };

  return (
    <TooltipContainer data-e2e="nameTooltip" style={{ ...containerStyle }}>
      <Ellipses style={{ ...contentStyle }}>{props.text}</Ellipses>
    </TooltipContainer>
  );
};

const CreditMemoTable: FC<CreditMemoTableProps> = ({
  currentCreditMemoCount,
  creditMemos,
  pageInfo
}) => {
  const { bootstrap, tenant } = use-place-Context();
  const { CHANNEL_SETTINGS, localeLanguage, UserInfo } = bootstrap as Bootstrap;
  const dispatch = useDispatch();
  const tableHeaders = [
    {
      key: CREDITMEMO_TABLE_COLUMNS.CREDIT_MEMO_ID,
      value: t('credit.memo.table.credit.memo.table.header'),
      style: { width: '210px' }
    },
    {
      key: CREDITMEMO_TABLE_COLUMNS.CREATION_DATE,
      value: t('credit.memo.table.created.date.table.header'),
      style: { width: '110px' }
    },
    {
      key: CREDITMEMO_TABLE_COLUMNS.CUSTOMER,
      value: t('credit.memo.table.customer.table.header'),
      style: { width: '110px' }
    },

    {
      key: CREDITMEMO_TABLE_COLUMNS.TOTAL_CREDIT,
      value: t('credit.memo.table.total.credit.table.header'),
      style: { width: '110px' }
    },
    {
      key: CREDITMEMO_TABLE_COLUMNS.STATUS,
      value: t('credit.memo.table.status.table.header'),
      style: { width: '110px' }
    }
  ];
  const statusDropdownOptions = [
    {
      value: CREDITMEMO_STATUS.ALL,
      label: t('Show All')
    },
    {
      value: CREDITMEMO_STATUS.VOID,
      label: t('credit.memo.table.status.void')
    },
    {
      value: CREDITMEMO_STATUS.DRAFT,
      label: t('credit.memo.table.status.draft')
    },
    {
      value: CREDITMEMO_STATUS.APPLIED,
      label: t('credit.memo.table.status.applied')
    },
    {
      value: CREDITMEMO_STATUS.UNAPPLIED,
      label: t('credit.memo.table.status.unapplied')
    },
    {
      value: CREDITMEMO_STATUS.PARTIALLY_APPLIED,
      label: t('credit.memo.table.status.partially_applied')
    }
  ];

  const [tableFilters, setTableFilters] = useState<TableFilters>({
    showFilter: false,
    fromDate: null,
    toDate: null,
    status: 'All',
    name: null
  });
  const [orderBy, setOrderBy] = useState([
    {
      field: CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.sortField,
      direction: SORT_TYPE.DESC
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const { showFilter, fromDate, toDate, status, name } = tableFilters;

  const searchApiHandlerResponse = () => {
    let searchValue: string | null = null;
    if (searchText !== '') {
      searchValue = searchText;
    }
    const updatedSearchAndFilters = { ...tableFilters, name: searchValue };
    setCurrentPage(1);
    setStoredCurrentPage(1);
    setStoredPageInfo(pageInfo);
    setTableFilters(updatedSearchAndFilters);
    updateStoredTableFilters(updatedSearchAndFilters);
  };

  const [tableFiltersForQuery, setTableFiltersForQuery] =
    useState<TableFilters>({
      creditMemoStatus: null,
      creditMemoDate: null,
      searchText: '',
      scope: SCOPE,
      tenant,
      locale: 'en'
    });

  const [orderByForQuery, setOrderByForQuery] = useState([
    { field: 'CREATION_DATE', direction: 'DESC' }
  ]);
  const [alert, setAlert] = useState(false);

  const [first, setFirst] = useState(CREDITMEMO_PAGE_SIZE);
  const [after, setAfter] = useState<string | null>(null);
  const [last] = useState(null);
  const [before] = useState(null);

  // const [creditMemoData, setcreditMemoData] = useState<any>({});

  //

  // const { data, isError } = fetchPaginatedCreditMemos(
  //   orderByForQuery as [{ field: string; direction: string }],
  //   tableFiltersForQuery,
  //   first,
  //   after,
  //   last,
  //   before
  // )

  // -------------------------------------------------------

  // const getDataForCreditMemo = async () => {
  //   const res = await request(
  //     graphQLEndpoint(),
  //     getAllCreditMemoGQL,
  //     {
  //       orderBy,
  //       tableFiltersForQuery,
  //       first,
  //       after,
  //       last,
  //       before
  //     },
  //     {
  //       fetchPolicy: 'cache-and-network'
  //     }
  //   );
  //   console.log('Res:', res);
  //   return res;
  // };

  // const {
  //   data: data1,
  //   isError,
  //   isLoading
  // } = useQuery<CreditMemoData>(
  //   [
  //     ['credit-memo-data'],
  //     orderBy,
  //     tableFiltersForQuery,
  //     first,
  //     after,
  //     last,
  //     before,
  //     ''
  //   ],
  //   getDataForCreditMemo,
  //   {
  //     retry: false,
  //     suspense: false,
  //     useErrorBoundary: false,
  //     select: (data) => data,
  //     onSuccess: setDataState
  //   }
  // );

  const {
    data: data1,
    isError,
    isLoading
  } = fetchPaginatedCreditMemos(
    orderByForQuery as [{ field: string; direction: string }],
    tableFiltersForQuery,
    first,
    after,
    last,
    before
  );

  // -------------------------------------------------------

  // useEffect(() => {
  //   setDataState({
  //     creditMemos: {
  //       // @ts-ignore
  //       nodes: [],
  //       totalCount: 0,
  //       pageInfo: {
  //         startCursor: '0',
  //         endCursor: '04',
  //         hasPreviousPage: false,
  //         hasNextPage: false
  //       }
  //     }
  //   });
  //   console.log('dataState', dataState);
  // }, []);

  // const data1 = listing.data;
  // const isLoading = false;

  console.log('data121', data1);

  // const data = data121?.creditMemos;

  // // @ts-ignore
  // setDataState(data1);

  // @ts-ignore
  // setdataState(data121);
  // // const { data } = listing;
  // console.log('dataState', dataState);

  // useEffect(() => {
  //   if (!isError) {
  //     console.log('inside isError', dataState);
  //     const creditMemoData = {
  //       creditMemos: dataState?.creditMemos?.nodes,
  //       currentCreditMemoCount: dataState?.creditMemos?.totalCount,
  //       pageInfo: dataState?.creditMemos?.pageInfo
  //     };
  //
  //     dispatch({
  //       type: FETCH_MEMO_LIST_SUCCESS,
  //       payload: creditMemoData
  //     });
  //   }
  // }, [dataState]);

  let creditMemoData;

  //------------------------------------------

  if (isLoading) {
    creditMemoData = {
      creditMemos: {
        nodes: undefined,
        totalCount: 0,
        pageInfo: {
          startCursor: '0',
          endCursor: '04',
          hasPreviousPage: false,
          hasNextPage: false
        }
      }
    };
  }
  //------------------------------------------

  if (!isError && !isLoading) {
    // if (data1) {
    console.log('inside isError', data1);
    creditMemoData = {
      creditMemos: data1?.creditMemos?.nodes,
      currentCreditMemoCount: data1?.creditMemos?.totalCount,
      pageInfo: data1?.creditMemos?.pageInfo
    };

    dispatch({
      type: FETCH_MEMO_LIST_SUCCESS,
      payload: creditMemoData
    });
    // console.log('credit memo data:', isLoading);
    // console.log('credit memo data', creditMemoData);
    console.log('credit memo data from state: ', creditMemos);
  }

  const updateTableFilter = (filter) => {
    const updatedFilter = { ...tableFilters, ...filter };
    setCurrentPage(1);
    setStoredCurrentPage(1);
    setStoredPageInfo(pageInfo);
    setTableFilters(updatedFilter);
    updateStoredTableFilters(updatedFilter);
  };

  const getTableFilters = ({
    name: searchName,
    status: filterStatus,
    fromDate: filterFrom,
    toDate: filterTo
  }) => {
    console.log('userInfo:', UserInfo);
    console.log('userInfo:', UserInfo?.roles.includes('CHANNEL_ADMIN'));

    const filters: FILTERS = {
      creditMemoStatus: null,
      creditMemoDate: null,
      searchText: '',
      scope: SCOPE,
      tenant: CHANNEL_SETTINGS.partner,
      locale: localeLanguage
    };
    if (filterStatus) {
      if (filterStatus === CREDITMEMO_STATUS.ALL) {
        filters.creditMemoStatus = null;
      } else {
        filters.creditMemoStatus = filterStatus;
      }
    }
    let effectiveFrom = '';
    if (filterFrom) {
      if (filters.creditMemoDate === null) {
        filters.creditMemoDate = [];
      }
      const date = moment(filterFrom);
      date.hour(0);
      date.minute(0);
      date.second(0);
      effectiveFrom = formatDateWithFormat(date, FILTER_DATE_FORMAT);
      filters.creditMemoDate.push(`gte(${effectiveFrom})`);
    }
    let effectiveTill = '';
    if (filterTo) {
      if (filters.creditMemoDate === null) {
        filters.creditMemoDate = [];
      }
      const date = moment(filterTo);
      date.hour(23);
      date.minute(59);
      date.second(59);
      effectiveTill = formatDateWithFormat(date, FILTER_DATE_FORMAT);
      filters.creditMemoDate.push(`lte(${effectiveTill})`);
    }

    if (searchName) {
      filters.searchText = searchName;
    }

    return filters;
  };

  const getFilters = (filters) =>
    filters
      ? getTableFilters(filters)
      : getTableFilters({
          name,
          status,
          fromDate,
          toDate
        });

  const updateTableData = (updateTotalCount, filters, order) => {
    if (isRedirectedFromDetailsPage()) {
      return;
    }
    const payload = {
      orderBy: order,
      filter: getFilters(filters),
      first: CREDITMEMO_PAGE_SIZE,
      after: null,
      last: null,
      before: null
    };

    const updateTotalCountCondition =
      updateTotalCount &&
      !isFilterApplied(tableFilters) &&
      (isEmpty(filters) || !isFilterApplied(filters));
    setTableFiltersForQuery(getFilters(filters));
    setFirst(CREDITMEMO_PAGE_SIZE);
    setOrderByForQuery(order);
    if (updateTotalCountCondition) {
      setStoredCreditMemoCount(currentCreditMemoCount);
    }
    setStoredPageInfo(payload);
  };

  useEffect(() => {
    if (isRedirectedFromDetailsPage()) {
      const {
        tableFilters: filters,
        orderBy: order,
        currentPage: current
      } = getCreditMemoSessionData();

      // @ts-ignore
      setTableFilters(filters);
      setOrderBy(order);
      setCurrentPage(current);
      setTimeout(() => {
        setRedirectFromDetailsPage(false);
        updateTableData(true, filters, order);
      }, 0);
    } else {
      resetCreditMemoSessionData();
    }
  }, []);
  useEffect(() => {
    const { tableFilters: filters, orderBy: order } =
      getCreditMemoSessionData();
    setSearchText(name);
    updateTableData(true, filters, order);
  }, [status, fromDate, toDate, name]);

  // fetchPaginatedCreditMemos(
  //   orderByForQuery as [{ field: string; direction: string }],
  //   tableFiltersForQuery,
  //   first,
  //   after,
  //   last,
  //   before
  // );

  const statusDropdown = (options, value) => {
    const inputProps = {
      value,
      onChange: (e) => updateTableFilter({ status: e.target.value })
    };

    return (
      <StatusDropdown small {...inputProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label.toUpperCase()}
          </option>
        ))}
      </StatusDropdown>
    );
  };

  const showTableFilters = () => (
    <TableFilters
      showSearch
      onSearchChange={(_, input) => setSearchText(input)}
      searchValue={searchText}
      searchLabel={t('credit.memo.table.search.box.placeholder')}
      onSearchSubmit={searchApiHandlerResponse}
    >
      <Toolbar>
        <Button
          inset
          active={showFilter}
          size="small"
          onClick={() => updateTableFilter({ showFilter: !showFilter })}
        >
          {showFilter
            ? t('credit.memo.table.filter.hide')
            : t('credit.memo.table.filter.show')}
        </Button>
      </Toolbar>
      {showFilter && (
        <FiltersContent>
          <FilterRow data-testid="filter-row">
            <StatusLabel inline>{t('Status')}</StatusLabel>
            {statusDropdown(statusDropdownOptions, status)}
            <DateRangeField
              small
              fromLabel={t('credit.memo.table.filter.created.between')}
              toLabel={t('credit.memo.table.filter.created.and')}
              {...(fromDate && { fromValue: fromDate })}
              {...(toDate && { toValue: toDate })}
              onFromChange={(fromDateVal) =>
                updateTableFilter({ fromDate: fromDateVal })
              }
              onToChange={(toDateVal) =>
                updateTableFilter({ toDate: toDateVal })
              }
            />
          </FilterRow>
        </FiltersContent>
      )}
    </TableFilters>
  );

  function redirectToCreditMemoDetails(id) {
    document.body.dispatchEvent(
      new CustomEvent('ad-navigate', {
        detail: {
          path: `${CREDIT_MEMO_URL}/${id}`
        }
      })
    );
  }

  const processColumn = (item, row, key) => {
    if (key === CREDITMEMO_TABLE_COLUMNS.STATUS.key) {
      return getStatusBadge(row?.status);
    }
    if (key === CREDITMEMO_TABLE_COLUMNS.CREDIT_MEMO_ID.key) {
      return (
        <StyledLink onClick={() => redirectToCreditMemoDetails(row?.id)}>
          <div>
            <NameTooltip text={row?.creditMemoNumber} />
            <NameTooltip text={row?.description} />
          </div>
        </StyledLink>
      );
    }
    if (key === CREDITMEMO_TABLE_COLUMNS.CREATION_DATE.key) {
      return (
        <div>
          <span>{moment(row.creditMemoDate).utc().format('MM-DD-YYYY')}</span>
        </div>
      );
    }
    if (key === CREDITMEMO_TABLE_COLUMNS.CUSTOMER.key) {
      return (
        <div>
          <span>{row?.customer?.account?.recorded?.name}</span>
          <NameTooltip text={row?.description} />
        </div>
      );
    }
    return (
      <div>
        <span>{row[key]}</span>
        <NameTooltip text={row?.description} />
      </div>
    );
  };

  const showTableHeaders = (headers) =>
    headers.map((header) => {
      const headerKey = header.key.key;
      const sortKey = header.key.sortField;
      const style = header.style ? header.style : {};
      return (
        <TableHeader
          name={headerKey}
          nosort={!sortKey}
          cellFormatter={(item, row) => processColumn(item, row, headerKey)}
          style={style}
          key={headerKey}
        >
          <div>
            <TableHeaderLabel>{header.value}</TableHeaderLabel>
          </div>
        </TableHeader>
      );
    });
  const isLoadingCustom = () =>
    isEmpty(creditMemos) && creditMemos === undefined && !isLoading;
  const sortTable = (sort) => {
    if (sort) {
      const { columnName, sortAscending } = sort;
      const direction = getSortFieldDirection(sortAscending);
      const column = getSortFieldForColumn(columnName);
      let order: Array<any> = [];
      const objIndex = orderBy.findIndex((obj) => obj.field === column);
      if (objIndex > -1) {
        orderBy[objIndex].direction = direction;
        order = orderBy;
      } else if (!(column === 'CUSTOMER')) {
        const orderByValue = {
          field: column,
          direction
        };
        order = [...orderBy, orderByValue];
      } else {
        order = orderBy;
      }
      const payload = {
        first: CREDITMEMO_PAGE_SIZE,
        after: null,
        last: null,
        before: null,
        filter: getFilters(null),
        orderBy: order
      };
      setTableFiltersForQuery(getFilters(null));
      setFirst(CREDITMEMO_PAGE_SIZE);
      setOrderByForQuery(order);
      setStoredCreditMemoCount(currentCreditMemoCount);
      setStoredPageInfo(payload);
      setOrderBy(order);
      setStoredTableOrder(order);
    }
  };
  const onTableUpdate = (nextPage, sort) => {
    if (!isEmpty(sort)) {
      sortTable(sort);
      return;
    }
    let payload = {};

    console.log(
      'after in logs:',
      window.btoa(String(nextPage - 1)) === 'MA=='
        ? null
        : window.btoa(String(nextPage - 1))
    );

    // The api will return page after this given page
    const afterPage = window.btoa(String(nextPage - 2));

    payload = {
      first: CREDITMEMO_PAGE_SIZE,
      after: afterPage === 'MA==' ? null : afterPage,
      last: null,
      before: null
    };
    payload = {
      ...payload,
      orderBy,
      filter: getFilters(null)
    };

    setTableFiltersForQuery(getFilters(null));
    setFirst(CREDITMEMO_PAGE_SIZE);
    setAfter(afterPage);
    setOrderByForQuery(orderBy);
    setStoredCreditMemoCount(currentCreditMemoCount);
    setStoredPageInfo(payload);
    setCurrentPage(nextPage);
    setStoredCurrentPage(nextPage);
  };

  console.log('credit memo print', creditMemos);

  return (
    <div>
      {/* hello */}
      {/* {isError && <AlertBox alert={alert} setAlert={setAlert} />} */}
      {!isLoadingCustom() && (
        <Container data-e2e="creditMemoTable">
          <StyledTable
            data-branding="table api-table"
            data-auto-table="credit-memo:list"
            bordered
            sortable
            pageable
            pageSize={CREDITMEMO_PAGE_SIZE}
            loading={isLoading}
            onTableUpdate={(number, { sorting = {} } = {}) =>
              onTableUpdate(number, sorting)
            }
            pagination={{
              currentPage,
              disablePageNumbers: false,
              nbPages: 10,
              totalRecords: currentCreditMemoCount
            }}
            rows={creditMemos}
            data-testid="creditMemoTable"
          >
            {showTableHeaders(tableHeaders)}
            {showTableFilters()}
          </StyledTable>
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = ({ memoList }) => ({
  pageInfo: memoList.pageInfo,
  creditMemos: memoList.creditMemos,
  currentCreditMemoCount: memoList.currentCreditMemoCount
});

export default connect(mapStateToProps, {})(CreditMemoTable);
