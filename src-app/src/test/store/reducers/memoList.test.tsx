// import reducer from '../../../store/reducers/memoList';
// import {
//   FETCH_MEMO_LIST_SUCCESS,
//   FETCH_MEMO_LIST_FAILURE,
//   FETCH_MEMO_LIST
// } from '../../../store/actions';
//
// describe('Memo List reducer', () => {
//   const initialState = {
//     creditMemos: [],
//     currentCreditMemoCount: 0,
//     pageInfo: {}
//   };
//
//   it('Should return the initial state', () => {
//     expect(reducer(initialState, { type: 'any', payload: {} })).toEqual(
//       initialState
//     );
//   });
//
//   it('Should handle Memo Details actions', () => {
//     const action = {
//       type: FETCH_MEMO_LIST_SUCCESS,
//       payload: { creditMemos: [{ something: 'something' }] }
//     };
//     expect(reducer(initialState, action)).toEqual({
//       creditMemos: [{ something: 'something' }],
//       pageInfo: {},
//       currentCreditMemoCount: 0
//     });
//
//     const actionStarted = {
//       type: FETCH_MEMO_LIST_FAILURE,
//       payload: { creditMemos: [{ failed: 'failed' }] }
//     };
//     expect(reducer(initialState, actionStarted)).toEqual({
//       creditMemos: [{ failed: 'failed' }],
//       pageInfo: {},
//       currentCreditMemoCount: 0
//     });
//
//     const actionFailure = {
//       type: FETCH_MEMO_LIST,
//       payload: { creditMemos: [{ something: 'something' }] }
//     };
//     expect(reducer(initialState, actionFailure)).toEqual({
//       creditMemos: [{ something: 'something' }],
//       pageInfo: {},
//       currentCreditMemoCount: 0
//     });
//   });
// });
