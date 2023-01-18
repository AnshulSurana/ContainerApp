import React from 'react';
import { render, screen } from '@testing-library/react';
import * as Utils from '../../utils';
import { CREDITMEMO_STATUS } from '../../constants';

const mockDateComponent = jest.fn();
const mockPercentageComponent = jest.fn();
const mockBadgeComponent = jest.fn();
jest.mock(
  'ad-react-components/lib/i18n/Percent',
  () =>
    function (props) {
      mockPercentageComponent(props);
      return <div data-testid="PercentComponent" />;
    }
);
jest.mock(
  'ad-react-components/lib/i18n/Date',
  () =>
    function (props) {
      mockDateComponent(props);
      return <div data-testid="DateComponent" />;
    }
);
jest.mock(
  'ad-react-components/lib/Badge',
  () =>
    function (props) {
      console.log(props);
      mockBadgeComponent(props);
      return <div data-testid="BadgeComponent">{props.type}</div>;
    }
);
const -place-Context = {
  bootstrap: { CHANNEL_SETTINGS: { partner: '-place-' } }
};
jest.mock('fe-tools', () => {
  const originalModule = jest.requireActual('fe-tools');

  return {
    __esModule: true,
    ...originalModule,
    t: jest.fn((msg) => msg),
    use-place-Context: jest.fn(() => -place-Context)
  };
});
describe('Util function test', () => {
  it('should test date function with all possible values', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    render(Utils.formatDate(new Date(), 'en', {}));
    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(),
        locale: 'en',
        formats: {}
      })
    );
    expect(screen.getByTestId('DateComponent')).toBeInTheDocument();
  });
  it('should test percentage function with all possible values', () => {
    render(Utils.formatPercentage(12, 'en', {}));
    expect(mockPercentageComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        number: 12,
        locale: 'en',
        formats: {}
      })
    );
    expect(screen.getByTestId('PercentComponent')).toBeInTheDocument();
  });
  it('should test CheckApiError function with values', () => {
    const result = Utils.checkApiError({}, '');
    expect(result).toEqual([]);
    const resultError = Utils.checkApiError(
      { someError: 'someError' },
      'someError'
    );
    expect(resultError).toEqual(['someError']);
    const resultArray = Utils.checkApiError([], '');
    expect(resultArray).toEqual([]);

    const extensionDownstream = {
      code: 'DOWNSTREAM_SERVICE_ERROR',
      message: 'not found'
    };
    const knownErr: any = [];
    knownErr.push({ extensions: extensionDownstream });
    const resultDownstreamError = Utils.checkApiError(knownErr, '');
    expect(resultDownstreamError).toEqual([
      'SessionTimeoutError',
      'DOWNSTREAM_SERVICE_ERROR'
    ]);

    const extension = {
      code: 404,
      message: 'not found'
    };
    const err: any = [];
    err.push({ extensions: extension });
    const resultSingleError = Utils.checkApiError(err, '');
    expect(resultSingleError).toEqual([404]);

    const extensionInternalError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'internalServerError'
    };
    const knownInternalError: any = [];
    knownInternalError.push({ extensions: extensionInternalError });
    const resultInternalError = Utils.checkApiError(
      knownInternalError,
      'internalError'
    );
    expect(resultInternalError).toEqual(['internalError']);

    const extensionUnauthorizedError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unauthorized'
    };
    const knownUnauthorizedError: any = [];
    knownUnauthorizedError.push({ extensions: extensionUnauthorizedError });
    const resultUnauthorizedError = Utils.checkApiError(
      knownUnauthorizedError,
      'internalError'
    );
    expect(resultUnauthorizedError).toEqual(['SessionTimeoutError']);

    const extensionSessionError = {
      code: 'SESSION_TIMEOUT',
      message: 'token Unauthorized'
    };
    const knownSessionError: any = [];
    knownSessionError.push({ extensions: extensionSessionError });
    const resultSessionError = Utils.checkApiError(
      knownSessionError,
      'internalError'
    );
    expect(resultSessionError).toEqual(['SESSION_TIMEOUT']);

    const knownNetworkError: any = {
      networkError: {
        statusCode: 401
      }
    };
    const resultNetworkError = Utils.checkApiError(
      knownNetworkError,
      'internalError'
    );
    expect(resultNetworkError).toEqual(['SessionTimeoutError']);
  });
  it('should test getErrorTypesFromError function with all possible values', () => {
    const result = Utils.getErrorTypesFromError([]);
    expect(result).toEqual([]);
    const resultWithValue = Utils.getErrorTypesFromError([
      { typename: 'some' },
      { typename: 'other' }
    ]);
    expect(resultWithValue).toEqual(['some', 'other']);
  });
  it('should test getBadgeType function with all possible values', () => {
    const resultSuccess = Utils.getBadgeType(CREDITMEMO_STATUS.APPLIED);
    expect(resultSuccess).toEqual('success');
    const resultError = Utils.getBadgeType(CREDITMEMO_STATUS.UNAPPLIED);
    expect(resultError).toEqual('error');
    const resultPending = Utils.getBadgeType(
      CREDITMEMO_STATUS.PARTIALLY_APPLIED
    );
    expect(resultPending).toEqual('pending');
    const resultVoid = Utils.getBadgeType(CREDITMEMO_STATUS.VOID);
    expect(resultVoid).toEqual('');
    const resultDefault = Utils.getBadgeType('');
    expect(resultDefault).toEqual('');
  });
  it('should test getStatusBadge function with all possible values', () => {
    render(Utils.getStatusBadge(CREDITMEMO_STATUS.APPLIED));
    expect(screen.getByTestId('BadgeComponent')).toBeInTheDocument();
    expect(mockBadgeComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        outline: true,
        type: 'success'
      })
    );
    render(Utils.getStatusBadge(CREDITMEMO_STATUS.UNAPPLIED));
    expect(mockBadgeComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        outline: true,
        type: 'error'
      })
    );
    render(Utils.getStatusBadge(CREDITMEMO_STATUS.PARTIALLY_APPLIED));
    expect(mockBadgeComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        outline: true,
        type: 'pending'
      })
    );
    render(Utils.getStatusBadge(CREDITMEMO_STATUS.VOID));
    expect(mockBadgeComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        outline: true,
        type: ''
      })
    );
    render(Utils.getStatusBadge(''));
    expect(mockBadgeComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        outline: true,
        type: ''
      })
    );
  });
});
