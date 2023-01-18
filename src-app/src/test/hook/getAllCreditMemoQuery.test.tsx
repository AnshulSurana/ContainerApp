// import getAllCreditMemoGQL from '../../graphQL/queries/creditMemo';
// import listing from '../../store/mocks/creditMemoListing';
// import fetchPaginatedCreditMemos from '../../hook/fetchPaginatedCreditMemos';
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
// describe('fetchPaginatedCreditMemos hook testing', () => {
//   it('Should test fetchPaginatedCreditMemos hook', () => {
//     const result: any = fetchPaginatedCreditMemos(
//       [{ field: 'CREATED_DATE', direction: 'DESC' }],
//       {
//         creditMemoStatus: null,
//         creditMemoDate: null,
//         searchText: null,
//         scope: 'MARKETPLACE',
//         tenant: '-place-',
//         locale: 'en'
//       },
//       10,
//       null,
//       null,
//       null,
//       getAllCreditMemoGQL,
//       ''
//     );
//     expect(result).toStrictEqual({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//   });
// });
