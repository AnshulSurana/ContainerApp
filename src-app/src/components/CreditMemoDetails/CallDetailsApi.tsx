import { useDispatch } from 'react-redux';
import fetchCreditMemoDetails, {graphQLEndpoint} from "../../hook/fetchCreditMemoDetails";
import listing from "../../store/mocks/creditMemoListing";
import { FETCH_MEMO_DETAILS_SUCCESS , FETCH_MEMO_DETAILS_FAILURE } from '../../store/actions';

const callDetailsApi = (id: string, locale: string): any => {
  const dispatch = useDispatch();
  const { data, isError } = fetchCreditMemoDetails(id, locale);
  if (isError) {
    console.log('error = ', isError);
    const { data: mockData } = listing;
    const { nodes } = mockData.creditMemos;
    const creditMemo = nodes.find(
      (node) => String(node.creditMemoNumber) === '8564321'
    );
    dispatch({ type: FETCH_MEMO_DETAILS_FAILURE, payload: creditMemo });
  } else {
    dispatch({ type: FETCH_MEMO_DETAILS_SUCCESS, payload: data?.creditMemo });
  }
};

export default callDetailsApi;
