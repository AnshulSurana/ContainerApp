// import { isEmpty } from 'lodash';
// import { checkApiError, getErrorTypesFromError } from '../../utils';
// import apolloClient from '../../utils/apollo-client';
// import listing from '../mocks/creditMemoListing';
// import {
//   FETCH_MEMO_LIST,
//   FETCH_MEMO_LIST_FAILURE,
//   FETCH_MEMO_LIST_SUCCESS,
//   FETCH_MEMO_DETAILS_FAILURE,
//   FETCH_MEMO_DETAILS_SUCCESS,
//   FETCHING_MEMO_DETAILS
// } from '../actions';
// import getCreditMemoDetailsGQL from '../../graphQL/queries/creditMemoDetails';
// import getAllCreditMemoGQL from '../../graphQL/queries/creditMemo';
// import { setStoredCreditMemoCount } from '../../utils/sessionUtil';
//
// const dispatchErrors = (err, type, dispatch) =>
//   dispatch({
//     type,
//     payload: checkApiError(err, type)
//   });
//
// export const getAllCreditMemos = (payload, updateTotalCount) => (dispatch) => {
//   dispatch({ type: FETCH_MEMO_LIST });
//   apolloClient
//     .query({
//       query: getAllCreditMemoGQL,
//       variables: payload
//     })
//     .then(({ data }) => {
//       if (data.errors) {
//         dispatchErrors(data.errors, FETCH_MEMO_LIST_FAILURE, dispatch);
//         return;
//       }
//
//       const creditMemoData = {
//         creditMemo: data.creditMemo.nodes,
//         currentCreditMemoCount: data.creditMemo.totalCount,
//         pageInfo: data.creditMemo.pageInfo
//       };
//       if (updateTotalCount) {
//         creditMemoData.currentCreditMemoCount = data.creditMemo.totalCount;
//         setStoredCreditMemoCount(data.creditMemo.totalCount);
//       }
//
//       dispatch({
//         type: FETCH_MEMO_LIST_SUCCESS,
//         payload: creditMemoData
//       });
//     })
//     .catch(() => {
//       const { data } = listing;
//       const creditMemoData = {
//         creditMemos: data.nodes,
//         currentCreditMemoCount: data.totalCount,
//         pageInfo: data.pageInfo
//       };
//
//       dispatch({
//         type: FETCH_MEMO_LIST_SUCCESS,
//         payload: creditMemoData
//       });
//       // dispatchErrors(err, FETCH_MEMO_LIST_FAILURE, dispatch);
//     });
// };
//
// export const getCreditMemoDetails = (payload) => (dispatch) => {
//   dispatch({ type: FETCHING_MEMO_DETAILS, payload: true });
//   apolloClient
//     .query({
//       query: getCreditMemoDetailsGQL,
//       variables: {
//         id: payload.id
//       }
//     })
//     .then(({ data }) => {
//       dispatch({ type: FETCHING_MEMO_DETAILS, payload: false });
//       if (data.errors) {
//         dispatchErrors(data.errors, FETCH_MEMO_DETAILS_FAILURE, dispatch);
//         return;
//       }
//
//       const { creditMemo, userErrors } = data;
//       if (!isEmpty(userErrors)) {
//         const errors = getErrorTypesFromError(userErrors);
//         dispatch({
//           type: FETCH_MEMO_DETAILS_FAILURE,
//           payload: errors
//         });
//       }
//
//       if (!isEmpty(creditMemo)) {
//         dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: creditMemo });
//       }
//     })
//     .catch(() => {
//       const { data } = listing;
//       const { nodes } = data;
//       const creditMemo = nodes.find(
//         (node) => String(node.creditMemoNumber) === String(payload.id)
//       );
//       // if (!isEmpty(userErrors)) {
//       //   const errors = getErrorTypesFromError(userErrors);
//       //   dispatch({
//       //     type: FETCH_MEMO_DETAILS_FAILURE,
//       //     payload: errors
//       //   });
//       // }
//       dispatch({ type: FETCHING_MEMO_DETAILS, payload: false });
//       dispatch({
//         type: FETCH_MEMO_DETAILS_SUCCESS,
//         payload: creditMemo
//       });
//       if (!isEmpty(creditMemo)) {
//         dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: creditMemo });
//       }
//       // dispatchErrors(err, FETCH_MEMO_DETAILS_FAILURE, dispatch);
//     });
// };
