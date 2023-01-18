// import getCreditMemoDetailsGQL from '../../graphQL/queries/creditMemoDetails';
// import listing from '../../store/mocks/creditMemoListing';
// import fetchCreditMemoDetails from '../../hook/fetchCreditMemoDetails';
//
// const { data } = listing;
// const { nodes } = data;
// const creditMemo = nodes.find(
//   (node) => String(node.creditMemoNumber) === '8564321'
// );
// const store = {
//   memoList: {
//     creditMemos: nodes
//   },
//   memo: {
//     creditMemo,
//     loadingDetails: false
//   }
// };
//
// jest.mock('react-query', () => ({
//   useQuery: jest.fn().mockReturnValue({
//     isLoading: false,
//     isError: false,
//     data: store
//   })
// }));
//
// describe('fetchCreditMemoDetails hook testing', () => {
//   it('Should test fetchCreditMemoDetails hook', () => {
//     const result: any = fetchCreditMemoDetails(
//       '8564321',
//       'en-AU',
//       getCreditMemoDetailsGQL,
//       ''
//     );
//     expect(result).toStrictEqual({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//   });
// });
