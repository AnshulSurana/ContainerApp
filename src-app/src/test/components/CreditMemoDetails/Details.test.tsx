// import React from 'react';
// import '@testing-library/jest-dom';
// import { screen } from '@testing-library/react';
//
// import WrappedRender from '../../../../__setup__/setupTests';
// import Details from '../../../components/CreditMemoDetails/Details';
// import mockLocalizationString from '../../__mocks__/localization';
// import listing from '../../../store/mocks/creditMemoListing';
// import { CreditMemo } from '../../../store/Types/creditMemo.types';
//
// jest.mock('fe-tools', () => ({
//   t: () => mockLocalizationString()
// }));
// jest.mock('../../../utils', () => ({
//   formatDate: () => '9/16/2022'
// }));
// const { data } = listing;
// const { nodes } = data;
// const creditMemo = nodes.find(
//   (node) => String(node.creditMemoNumber) === '8564321'
// );
// const locale = 'en_US';
// const store = {
//   memo: {
//     creditMemo
//   }
// };
//
// describe('Details component on Credit memo details page', () => {
//   it('Should test Labels and texts on details of Credit memo Details Page', () => {
//     WrappedRender(
//       <Details creditMemo={creditMemo as CreditMemo} localeLanguage={locale} />,
//       store
//     );
//
//     expect(
//       screen.getByTestId('details-customer-user-name').textContent
//     ).toEqual('Luna Lovegood');
//     expect(
//       screen.getByTestId('details-customer-company-name').textContent
//     ).toEqual('Bravo');
//     expect(screen.getByTestId('details-credit-memo-id').textContent).toEqual(
//       '2702874e-3aa5-11ed-a261-0242ac120002'
//     );
//     expect(screen.getByTestId('details-credit-memo-date').textContent).toEqual(
//       '9/16/2022'
//     );
//     expect(
//       screen.getByTestId('details-credit-memo-number').textContent
//     ).toEqual('8564321');
//   });
// });
