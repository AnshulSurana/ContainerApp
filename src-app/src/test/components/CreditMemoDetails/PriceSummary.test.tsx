// import React from 'react';
// import '@testing-library/jest-dom';
// import { screen } from '@testing-library/react';
//
// import WrappedRender from '../../../../__setup__/setupTests';
// import PriceSummary from '../../../components/CreditMemoDetails/PriceSummary';
// import mockLocalizationString from '../../__mocks__/localization';
// import listing from '../../../store/mocks/creditMemoListing';
// import { CreditMemo } from '../../../store/Types/creditMemo.types';
//
// jest.mock('fe-tools', () => ({
//   t: () => mockLocalizationString()
// }));
// const { data } = listing;
// const { nodes } = data;
// const creditMemo: CreditMemo =
//   nodes.find((node) => String(node.creditMemoNumber) === '8564321') ||
//   ({} as CreditMemo);
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
// describe('PriceSummary component on Credit memo details page', () => {
//   it('Should test PriceSummary Component with provided value', () => {
//     const { currency, subTotal, totalTax, total } = creditMemo;
//     WrappedRender(
//       <PriceSummary
//         subTotal={subTotal}
//         tax={totalTax}
//         total={total}
//         currencyFormats={currencyFormats}
//         currency={currency}
//         localeLanguage={locale}
//       />,
//       store
//     );
//     expect(screen.getByTestId('subtotal-value')).toBeInTheDocument();
//     expect(screen.getByTestId('tax-value')).toBeInTheDocument();
//     expect(screen.getByTestId('total-value')).toBeInTheDocument();
//     expect(screen.getByTestId('subtotal-value')).toHaveTextContent('$220');
//     expect(screen.getByTestId('tax-value')).toHaveTextContent('$30');
//     expect(screen.getByTestId('total-value')).toHaveTextContent('$250');
//   });
//   it('Should test PriceSummary Component with different value', () => {
//     const { subTotal, totalTax, total } = creditMemo;
//     WrappedRender(
//       <PriceSummary
//         subTotal={subTotal}
//         tax={totalTax}
//         total={total}
//         currencyFormats={currencyFormats}
//         currency="YEN"
//         localeLanguage={locale}
//       />,
//       store
//     );
//     expect(screen.getByTestId('subtotal-value')).toBeInTheDocument();
//     expect(screen.getByTestId('tax-value')).toBeInTheDocument();
//     expect(screen.getByTestId('total-value')).toBeInTheDocument();
//     expect(screen.getByTestId('subtotal-value')).toHaveTextContent('YEN 220');
//     expect(screen.getByTestId('tax-value')).toHaveTextContent('YEN 30');
//     expect(screen.getByTestId('total-value')).toHaveTextContent('YEN 250');
//   });
// });
