// import {useDispatch} from "react-redux";
// import fetchCreditMemoDetails from "../../hook/fetchCreditMemoDetails";
// import listing from "../../store/mocks/creditMemoListing";
// import {FILTERS} from "../../store/Types/creditMemo.types";
// import getAllCreditMemoGQL from "../../graphQL/queries/creditMemo";
// import fetchPaginatedCreditMemos from "../../hook/fetchPaginatedCreditMemos";
//
// const callListingApi = (
//   orderBy: [
//     {
//       field: string;
//       direction: string;
//     }
//   ],
//   filter: FILTERS,
//   first: number,
//   after: string | null,
//   last: number | null,
//   before: string | null,
//   tenantQuery = getAllCreditMemoGQL,
//   accountMemberShipQuery = getAllCreditMemoGQL,
//   accountQuery = getAllCreditMemoGQL,
//   queryCacheName = ''
// ): any => {
//   const dispatch = useDispatch();
//   const { data, isError } = fetchPaginatedCreditMemos(
//     orderBy,
//     filter,
//     first,
//     after,
//     last,
//     before,
//     'add query',
//     ''
//   );
// };
