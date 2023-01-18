// import React from 'react';
// import '@testing-library/jest-dom';
// import { screen } from '@testing-library/react';
//
// import WrappedRender from '../../../../__setup__/setupTests';
// import Summary from '../../../components/CreditMemoDetails/Summary';
// import mockLocalizationString from '../../__mocks__/localization';
// import listing from '../../../store/mocks/creditMemoListing';
// import { CreditMemo } from '../../../store/Types/creditMemo.types';
//
// jest.mock('fe-tools', () => ({
//   t: () => mockLocalizationString()
// }));
// const { data } = listing;
// const { nodes } = data;
// const creditMemo = nodes.find(
//   (node) => String(node.creditMemoNumber) === '8564321'
// );
// const locale = 'en';
// const store = {
//   memo: {
//     creditMemo
//   }
// };
// const currencyFormats = {
//   USD: {
//     symbol: '$',
//     decimal: '.',
//     thousand: ',',
//     precision: 2,
//     format: '%s%v'
//   }
// };
//
// describe('Summary component on Credit memo details page', () => {
//   it('Should test Summary and main table of Credit memo Details Page', () => {
//     const { container } = WrappedRender(
//       <Summary
//         creditMemo={creditMemo as CreditMemo}
//         currencyFormats={currencyFormats}
//         localeLanguage={locale}
//       />,
//       store
//     );
//     const mainTableHeaders = container.querySelectorAll(
//       '#mainTable > div > table > thead > tr > th '
//     );
//     const mainTableDescription = container.querySelector(
//       '#mainTable > div > table > thead > tr > th:first-of-type '
//     );
//     const mainTablePrice = container.querySelector(
//       '#mainTable > div > table > thead > tr > th:nth-of-type(2) '
//     );
//     const mainTableQuantity = container.querySelector(
//       '#mainTable > div > table > thead > tr > th:nth-of-type(3) '
//     );
//     const mainTableTotal = container.querySelector(
//       '#mainTable > div > table > thead > tr > th:nth-of-type(4) '
//     );
//     expect(screen.getByTestId('main-table')).toBeInTheDocument();
//     expect(screen.getAllByTestId('product-table')).toHaveLength(2);
//     expect(screen.getAllByTestId('lines-table')).toHaveLength(2);
//     expect(mainTableHeaders).toHaveLength(4);
//     expect(mainTableDescription).toHaveClass('description');
//     expect(mainTablePrice).toHaveClass('price');
//     expect(mainTableQuantity).toHaveClass('quantity');
//     expect(mainTableTotal).toHaveClass('total');
//   });
//   it('Should test Summary and product table of Credit memo Details Page', () => {
//     const { container } = WrappedRender(
//       <Summary
//         creditMemo={creditMemo as CreditMemo}
//         currencyFormats={currencyFormats}
//         localeLanguage={locale}
//       />,
//       store
//     );
//     const ProductTableHeaders = container.querySelectorAll(
//       '#productTable:first-of-type > div > table > tbody > tr > td '
//     );
//     expect(screen.getAllByTestId('product-table')).toHaveLength(2);
//     expect(screen.getAllByTestId('lines-table')).toHaveLength(2);
//     expect(ProductTableHeaders).toHaveLength(4);
//     expect(screen.getAllByText('BOX')).toHaveLength(2);
//   });
// });
