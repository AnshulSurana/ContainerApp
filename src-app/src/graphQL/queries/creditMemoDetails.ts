import { gql } from 'graphql-request';

const getCreditMemoDetailsGQL = gql`
  query creditMemo($id: ID!, $locale: String) {
    creditMemo(id: $id) {
      id
      amountAvailable
      amountUsed
      creditMemoAppliedDate
      creditMemoCreationDate
      creditMemoLines
      creditMemoNumber
      currency
      initialStatus
      tenant
      status
      subTotal
      taxDetails
      total
      totalTax
      seller
      customer
    }
  }
`;

export default getCreditMemoDetailsGQL;
