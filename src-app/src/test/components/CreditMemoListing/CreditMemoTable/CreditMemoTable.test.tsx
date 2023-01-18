// import React from 'react';
// import '@testing-library/jest-dom';
// import { screen, fireEvent } from '@testing-library/react';
//
// import CreditMemoTable from '../../../../components/CreditMemoListing/CreditMemoTable/CreditMemoTable';
// import listing from '../../../../store/mocks/creditMemoListing';
// import WrappedRender from '../../../../../__setup__/setupTests';
// import fetchPaginatedCreditMemos from '../../../../hook/fetchPaginatedCreditMemos';
//
// jest.mock('../../../../hook/fetchPaginatedCreditMemos');
//
// const { data } = listing;
// const store = {
//   memoList: {
//     creditMemos: data.nodes
//   }
// };
// describe('Credit Memo Table common component', () => {
//   it('Should test rendering of Listing Component', () => {
//     (fetchPaginatedCreditMemos as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     const { container } = WrappedRender(<CreditMemoTable />, store);
//     const TheadElement = container.querySelector('thead');
//     const TBodyElement = container.querySelector('tbody');
//     const TableHeaderElements = container.querySelector('th');
//     const TableBodyElements = container.querySelector('td');
//     expect(screen.getByTestId('creditMemoTable')).toBeInTheDocument();
//     expect(screen.getByTestId('search-field:input')).toBeInTheDocument();
//     expect(screen.getByTestId('table-wrapper')).toBeInTheDocument();
//     expect(TheadElement).toBeInTheDocument();
//     expect(TableHeaderElements).toBeInTheDocument();
//     expect(TBodyElement).toBeInTheDocument();
//     expect(TableBodyElements).toBeInTheDocument();
//   });
//   it('Should test Listing on Name link click', () => {
//     (fetchPaginatedCreditMemos as jest.Mock).mockReturnValue({
//       isLoading: false,
//       isError: false,
//       data: store
//     });
//     // @ts-ignore
//     const { container } = WrappedRender(<CreditMemoTable />, store);
//     const NameElement = container.querySelector(
//       'tbody > tr > td:nth-child(1) > span'
//     );
//     expect(screen.getByTestId('creditMemoTable')).toBeInTheDocument();
//     expect(screen.getByTestId('search-field:input')).toBeInTheDocument();
//     expect(screen.getByTestId('table-wrapper')).toBeInTheDocument();
//     expect(NameElement).toBeInTheDocument();
//     // @ts-ignore
//     fireEvent.click(NameElement, {});
//   });
// });
