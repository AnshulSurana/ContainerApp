// import React from 'react';
// import '@testing-library/jest-dom';
// import { fireEvent, screen } from '@testing-library/react';
//
// import WrappedRender from '../../../../__setup__/setupTests';
// import CreditMemoDetailsContainer from '../../../components/CreditMemoDetails/CreditMemoDetailsContainer';
// import listing from '../../../store/mocks/creditMemoListing';
// import fetchCreditMemoDetails from '../../../hook/fetchCreditMemoDetails';
//
// jest.mock('../../../components/Common/BreadCrumbs/InternalBreadCrumb', () =>
//   jest.fn(() => <div data-testid="Breadcrumb" />)
// );
//
// jest.mock('../../../hook/getAllCreditMemoDetailsQuery');
//
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: () => ({
//     id: '8564321'
//   })
// }));
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
// window.open = jest.fn();
// window.history.pushState(
//   {},
//   'CreditMemoDetails',
//   'https://testmarketplace.-place-.com/channel/marketplace/credit-memo/8564321'
// );
// describe('Credit memo details common component', () => {
//   it('Should test Credit memo container details Page', () => {
//     expect(global.window.location.pathname).toContain(
//       'channel/marketplace/credit-memo/8564321'
//     );
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, store);
//
//     expect(
//       screen.getByTestId('creditMemoDetailsContainer')
//     ).toBeInTheDocument();
//     expect(screen.getByTestId('creditMemoPageContainer')).toBeInTheDocument();
//   });
//   it('Should test Credit memo details Page loader', () => {
//     const storeLoader = {
//       memoList: {
//         creditMemos: nodes
//       },
//       memo: {
//         creditMemo,
//         loadingDetails: true
//       }
//     };
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, storeLoader);
//     expect(screen.getByTestId('creditMemoDetailsLoader')).toBeInTheDocument();
//   });
//   it('Should test Credit memo details Page Void operation', () => {
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, store);
//
//     expect(screen.getByTestId('voidOperation')).toBeInTheDocument();
//     fireEvent.keyPress(screen.getByTestId('button:default'), {});
//     fireEvent.keyPress(screen.getByTestId('voidOperation'), {});
//     fireEvent.click(screen.getByTestId('voidOperation'), {});
//     expect(screen.getByTestId('credit-memo-void-modal')).toBeInTheDocument();
//   });
//   it('Should test Credit memo details Page Download operation', () => {
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, store);
//
//     expect(screen.getByTestId('voidOperation')).toBeInTheDocument();
//     fireEvent.keyPress(screen.getByTestId('downloadOperation'), {});
//     fireEvent.click(screen.getByTestId('downloadOperation'), {});
//   });
//   it('Should test Credit memo details Page Button operation', () => {
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, store);
//
//     expect(screen.getByTestId('creditMemoDetailsButton')).toBeInTheDocument();
//     fireEvent.click(screen.getByTestId('creditMemoDetailsButton'), {});
//     expect(global.window.location.pathname).toContain('credit-memo/8564321');
//   });
//   it('Should test Credit memo details Open and Close modal', () => {
//     (fetchCreditMemoDetails as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     WrappedRender(<CreditMemoDetailsContainer />, store);
//
//     expect(screen.getByTestId('voidOperation')).toBeInTheDocument();
//     fireEvent.click(screen.getByTestId('voidOperation'), {});
//     expect(screen.getByTestId('credit-memo-void-modal')).toBeInTheDocument();
//     fireEvent.click(screen.getByTestId('void-modal-close-button'), {});
//     expect(
//       screen.queryByTestId('credit-memo-void-modal')
//     ).not.toBeInTheDocument();
//   });
// });
