import request from 'graphql-request';
import { useQuery, UseQueryResult } from 'react-query';
import getAllCreditMemoGQL from '../graphQL/queries/creditMemo';
import { END_POINTS } from '../constants';
import { CreditMemo, PageInfo, FILTERS } from '../store/Types/creditMemo.types';
import { CreditMemoData } from '../components/CreditMemoListing/CreditMemoTable/CreditMemoTable';
export const graphQLEndpoint = (): string =>
  `${window.location.origin}${END_POINTS.GQL_PREVIEW_URL}`;
const fetchPaginatedCreditMemos = (
  orderBy: [
    {
      field: string;
      direction: string;
    }
  ],
  filter: FILTERS,
  first: number,
  after: string | null,
  last: number | null,
  before: string | null,
  query = getAllCreditMemoGQL,
  queryCacheName = ''
): UseQueryResult<CreditMemoData> =>
  useQuery(
    [
      ['credit-memo-data'],
      orderBy,
      filter,
      first,
      after,
      last,
      before,
      queryCacheName
    ],
    async () =>
      request(
        graphQLEndpoint(),
        query,
        {
          orderBy,
          filter,
          first,
          after,
          last,
          before
        },
        {
          fetchPolicy: 'no-cache'
        }
      ),
    {
      retry: false,
      suspense: false,
      useErrorBoundary: false,
      cacheTime: 0,
      select: (data) => data
    }
  );
export default fetchPaginatedCreditMemos;
