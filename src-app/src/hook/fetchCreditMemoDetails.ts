import request from 'graphql-request';
import { useQuery, UseQueryResult } from 'react-query';
import getCreditMemoDetailsGQL from '../graphQL/queries/creditMemoDetails';
import { END_POINTS } from '../constants';
import { CreditMemo } from '../store/Types/creditMemo.types';
interface CreditMemoData {
  creditMemo: CreditMemo;
}
export const graphQLEndpoint = (): string =>
  `${window.location.origin}${END_POINTS.GQL_PREVIEW_URL}`;
const fetchCreditMemoDetails = (
  id: string,
  locale: string,
  query = getCreditMemoDetailsGQL,
  queryCacheName = '1'
): UseQueryResult<CreditMemoData> =>
  useQuery(
    ['credit-memo-details', queryCacheName, id, locale],
    async () =>
      request(
        graphQLEndpoint(),
        query,
        {
          id,
          locale
        },
        {
          fetchPolicy: 'no-cache'
        }
      )
    // {
    //   cacheTime: 1000,
    //   retry: false,
    //   suspense: false,
    //   useErrorBoundary: false,
    //   refetchOnWindowFocus: false,
    //   select: (data) => data
    // }
  );
export default fetchCreditMemoDetails;
