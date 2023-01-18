import * as Utils from '../../utils/sessionUtil';

const defaultSessionData = {
  currentPage: 1,
  deletedCreditMemo: '',
  isRedirectedFromDetailsPage: false,
  orderBy: [{ direction: 'DESC', field: 'CREATED_DATE' }],
  pageInfo: {},
  tableFilters: {
    fromDate: null,
    name: '',
    showFilter: false,
    status: null,
    toDate: null
  },
  totalCreditMemoCount: 0
};
describe('Session Util function test', () => {
  it('should test saveCreditMemoSessionData function', () => {
    Utils.saveCreditMemoSessionData({});
    expect(sessionStorage.getItem('creditMemoData')).toEqual('{}');
  });
  it('should test getCreditMemoSessionData function with different object', () => {
    const sessionData = Utils.getCreditMemoSessionData();
    expect(sessionData).toEqual({});
    Utils.saveCreditMemoSessionData('');
    const sessionDataBlank = Utils.getCreditMemoSessionData();
    expect(sessionDataBlank).toEqual('');
    Utils.saveCreditMemoSessionData('value');
    const sessionDataValue = Utils.getCreditMemoSessionData();
    expect(sessionDataValue).toEqual('value');
    Utils.saveCreditMemoSessionData(null);
    const sessionDataNull = Utils.getCreditMemoSessionData();
    expect(sessionDataNull).toEqual(defaultSessionData);
  });
});
